import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import './IntroBanner.css';
// IntroBanner component: Displays the introduction banner including the user's bio and profile image.
const IntroBanner = ({ state }) => {
    // State hooks for managing modals, bio, image CID, loading status, and connection status.
    const [bioModal, setBioModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [newBio, setNewBio] = useState("");
    const [imageCID, setImageCID] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    // useEffect hook: Fetches bio and image CID from the blockchain when the component mounts or state changes.
    useEffect(() => {
        const { contract } = state;
        if (contract) {
            setIsConnected(true);
            // Functions to fetch bio and image CID from blockchain
            const fetchBio = async () => {
                const bioText = await contract.methods.bio().call();
                setBio(bioText);
            };

            const fetchImageCID = async () => {
                const cid = await contract.methods.portfolioImage().call();
                setImageCID(cid);
            };

            fetchBio();
            fetchImageCID();
        }
    }, [state]);

    // Function to toggle the bio update modal.
    const toggleBioModal = () => setBioModal(!bioModal);
    // Function to toggle the contact info modal.
    const toggleContactModal = () => setContactModal(!contactModal);
    // Function to validate and submit new bio.
    const validateAndSubmitBio = async () => {
        if (newBio.length > 200) {
            alert("Bio must be 200 characters or less.");
            return;
        }

        if (!window.confirm("Updating your bio will incur a gas fee. Do you wish to proceed?")) {
            return;
        }

        await updateBio();
    };

    // Function to update the bio on the blockchain.
    const updateBio = async () => {
        try {
            const { contract, web3 } = state;
            if (contract && newBio) {
                const accounts = await web3.eth.getAccounts();
                if (accounts.length === 0) {
                    alert("No Ethereum account detected. Please ensure MetaMask is connected.");
                    return;
                }
    
                const account = accounts[0];
                setIsLoading(true);
    
                await contract.methods.updateBio(newBio).send({ from: account });
    
                setBio(newBio);
                setNewBio("");
                alert("Bio updated successfully on the blockchain!");
            }
        } catch (error) {
            console.error("Error updating bio: ", error);
            alert("Failed to update bio");
        } finally {
            setIsLoading(false);
            toggleBioModal();
            fetchBio();
        }
    };
    // Function to fetch the latest bio from the blockchain.
    const fetchBio = async () => {
        try {
            const bioText = await state.contract.methods.bio().call();
            setBio(bioText);
        } catch (error) {
            console.error("Error fetching bio: ", error);
        }
    };

    return (
        <section className="introBanner">
            <div className={isLoading ? 'blurred' : ''}>
                <div className="container">
                    {isConnected ? (
                        <>
                            <div className="bannerText" data-aos="fade-up">
                                <h1>Exploring the Web3 Horizon</h1>
                                <div className="bioSection">
                                    <h3 className="bioText">{bio}</h3> {/* Added className for bio text */}
                                    <button className="updateBioBtn" onClick={toggleBioModal}>Update Bio</button>
                                </div>
                                <button className="contactBtn" onClick={toggleContactModal}>Contact Me</button>
                            </div>
                            <div className="bannerImage" data-aos="fade-right">
                                <div className="imageContainer">
                                    <img src={`https://gateway.pinata.cloud/ipfs/${imageCID}`} alt="Banner" />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bannerText">
                            <h1>Please connect MetaMask to view details</h1>
                        </div>
                    )}

                    <Modal isOpen={contactModal} toggle={toggleContactModal}>
                        <ModalBody>
                            Contact Email - adityakrverma2@gmail.com
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={bioModal} toggle={toggleBioModal}>
                        <ModalHeader toggle={toggleBioModal}>Update Your Bio</ModalHeader>
                        <ModalBody>
                            <input 
                                type="text" 
                                value={newBio} 
                                onChange={(e) => setNewBio(e.target.value)} 
                                placeholder="Enter new bio"
                                className="form-control"
                                maxLength="200"
                            />
                            <small>{newBio.length}/200 characters</small>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={validateAndSubmitBio} disabled={!newBio.trim()}>Save Changes</Button>{' '}
                            <Button color="secondary" onClick={toggleBioModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
            {/* Loading spinner */}
            {isLoading && (
                <div className="spinnerContainer">
                    <div className="spinner"></div>
                </div>
            )}
        </section>
    );
}

export default IntroBanner;
