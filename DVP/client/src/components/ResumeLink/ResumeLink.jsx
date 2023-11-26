import { useState, useEffect } from "react";
import './ResumeLink.css'; // Ensure this has unique styling

const ResumeLink = ({ state }) => {
    const [curriculumVitae, setCurriculumVitae] = useState("");

    useEffect(() => {
        const { contract } = state;
        const fetchCVLink = async () => {
            const cvLink = await contract.methods.curriculumVitaeLink().call();
            setCurriculumVitae("https://gateway.pinata.cloud/ipfs/" + cvLink);
        };
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
