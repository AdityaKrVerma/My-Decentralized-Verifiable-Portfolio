import { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './CareerTimeline.css';
import { BsCalendar } from "react-icons/bs";

// Component to display academic and professional career timeline
const CareerTimeline = ({ state }) => {
    // State for academic records and career histories
    const [academicRecords, setAcademicRecords] = useState([]);
    const [careerHistories, setCareerHistories] = useState([]);

    useEffect(() => {
        AOS.init(); // Initialize animations on scroll

        const { contract } = state;
        // Fetch academic records from the blockchain
        const fetchAcademicRecords = async () => {
            const records = await contract.methods.viewAllAcademicRecords().call();
            setAcademicRecords(records);
            AOS.refresh(); // Refresh AOS after updating state
        };
        // Fetch career histories from the blockchain
        const fetchCareerHistories = async () => {
            const histories = await contract.methods.viewAllCareerHistories().call();
            setCareerHistories(histories);
            AOS.refresh(); // Refresh AOS after updating state
        };
        // Fetch data if contract is available
        contract && fetchAcademicRecords() && fetchCareerHistories();
    }, [state]);

    return (
        <section className="careerTimelineSection">
            <h1 className="timelineTitle" data-aos="fade-up">Academic & Professional Timeline</h1>

            <div className="timelineContainer">
                <div className="academicSection" data-aos="fade-right">
                    <h2 className="sectionTitle">Academic Records</h2>
                    {academicRecords.length > 0 && academicRecords.map((record, index) => (
                        <div key={index} className="timelineCard" data-aos="fade-up">
                            <BsCalendar className='icon' /> 
                            <span className="date">{record.period}</span>
                            <h3>{record.qualification}</h3>
                            <p>{record.skillsGained}</p>
                            <p className="institution">{record.institution}</p>
                        </div>
                    ))}
                </div>

                <div className="professionalSection" data-aos="fade-left">
                    <h2 className="sectionTitle">Professional Experience</h2>
                    {careerHistories.length > 0 && careerHistories.map((history, index) => (
                        <div key={index} className="timelineCard" data-aos="fade-up">
                            <BsCalendar className='icon' /> 
                            <span className="date">{history.timeframe}</span>
                            <h3>{history.role}</h3>
                            <p>{history.competenciesGained}</p>
                            <p className="organization">{history.organization}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerTimeline;
