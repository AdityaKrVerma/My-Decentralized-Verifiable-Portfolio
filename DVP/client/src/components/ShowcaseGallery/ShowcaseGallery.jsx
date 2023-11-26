// In ShowcaseGallery.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./ShowcaseGallery.css";

const ShowcaseGallery = ({ state }) => {
    const [showcases, setShowcases] = useState([]);

    useEffect(() => {
        const { contract } = state;
        const fetchShowcases = async () => {
            const fetchedShowcases = await contract.methods.viewAllShowcases().call();
            setShowcases(fetchedShowcases);
            AOS.refresh();
        };
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
