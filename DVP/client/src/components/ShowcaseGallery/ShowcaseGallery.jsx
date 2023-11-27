// In ShowcaseGallery.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./ShowcaseGallery.css";
// ShowcaseGallery component: Displays a gallery of showcase projects.
const ShowcaseGallery = ({ state }) => {
    // State hook for storing the list of showcases.
    const [showcases, setShowcases] = useState([]);

    // useEffect hook: Fetches showcase data from the blockchain on component mount or state update.
    useEffect(() => {
        const { contract } = state;
        // Function to fetch showcase projects
        const fetchShowcases = async () => {
            // Call the contract method to get all showcase data
            const fetchedShowcases = await contract.methods.viewAllShowcases().call();
            // Update the showcases state with the fetched data
            setShowcases(fetchedShowcases);
            // Refresh AOS (Animate On Scroll) for dynamic UI changes
            AOS.refresh();
        };
        // Execute the fetch function if the contract is available
        contract && fetchShowcases();
    }, [state]);

    return (
        <section className="showcaseGallery">
            <h1 className="galleryTitle">Showcases</h1>
            <div className="showcaseWrapper">
                {showcases.length > 0 && showcases.map((showcase, index) => (
                    <a key={index} href={`https://github.com/AdityaKrVerma/${showcase.sourceCodeURL}`} className="showcaseCard" target='_blank' rel="noopener noreferrer" data-aos="zoom-in">
                        <div className="cardImage">
                            <img src={`https://gateway.pinata.cloud/ipfs/${showcase.visualRepresentation}`} alt={showcase.title} />
                        </div>
                        <div className="cardText">
                            <h3>{showcase.title}</h3>
                            <p>{showcase.overview}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ShowcaseGallery;
