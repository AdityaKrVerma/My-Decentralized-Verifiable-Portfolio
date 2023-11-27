import { useState, useEffect } from "react";
import './ResumeLink.css'; // Ensure this has unique styling
// ResumeLink component: Displays a link to the user's curriculum vitae.
const ResumeLink = ({ state }) => {
    // State hook for storing the link to the curriculum vitae.
    const [curriculumVitae, setCurriculumVitae] = useState("");

    // useEffect hook: Fetches the CV link from the blockchain when the component mounts or state changes.
    useEffect(() => {
        const { contract } = state;
        // Function to fetch the CV link
        const fetchCVLink = async () => {
            // Call the contract method to get the CV link
            const cvLink = await contract.methods.curriculumVitaeLink().call();
            // Update state with the full URL of the CV hosted on IPFS
            setCurriculumVitae("https://gateway.pinata.cloud/ipfs/" + cvLink);
        };
        // Execute the fetch function if the contract is available
        contract && fetchCVLink();
    }, [state]);

    return (
        <section className="resumeLinkSection">
            <h1 className="sectionTitle">
                Explore My Professional Journey
            </h1>
            <a href={curriculumVitae} target='_blank' rel="noopener noreferrer">
                <button className="viewResumeButton">
                    View Curriculum Vitae
                </button>
            </a>
        </section>
    );
};

export default ResumeLink;
