import React from 'react';
import './Skillset.css'; // Ensure this has unique styling

// Import your skill icons
import solidity from "../../assets/skillset/solidity.svg";
import web3 from "../../assets/skillset/web3.png";
import ethereum from "../../assets/skillset/ethereum.png";
import smartContract from "../../assets/skillset/smart-contract.png";
import blockchain from "../../assets/skillset/blockchain.png";
import reactIcon from "../../assets/skillset/react.png";
import nodeJs from "../../assets/skillset/node-js.svg";

const Skillset = () => {
  const skills = [
    { src: solidity, alt: 'Solidity' },
    { src: web3, alt: 'Web3' },
    { src: ethereum, alt: 'Ethereum' },
    { src: smartContract, alt: 'Smart Contract' },
    { src: blockchain, alt: 'Blockchain' },
    { src: reactIcon, alt: 'React' },
    { src: nodeJs, alt: 'Node.js' }
  ];

  return (
    <section className="skillsetSection">
      {skills.map((skill, index) => (
        <div key={index} className="skillIcon">
          <img src={skill.src} alt={skill.alt} />
          <p>{skill.alt}</p> {/* Optional: Add skill name under the icon */}
        </div>
      ))}
    </section>
  );
}

export default Skillset;
