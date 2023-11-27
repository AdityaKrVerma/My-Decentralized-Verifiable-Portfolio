import { useState } from "react";
import DigitalWallet from "./components/DigitalWallet/DigitalWallet";
import IntroBanner from "./components/IntroBanner/IntroBanner";
import SocialConnects from "./components/SocialConnects/SocialConnects";
import ShowcaseGallery from "./components/ShowcaseGallery/ShowcaseGallery";
import Skillset from "./components/Skillset/Skillset";
import CareerTimeline from "./components/CareerTimeline/CareerTimeline";
import ResumeLink from "./components/ResumeLink/ResumeLink";
import "./index.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
// Main application component
function App() {
  // State for web3 and contract instances
  const [state, setState] = useState({
    web3: null,
    contract: null
  });
  // Function to save the updated state
  const saveState = (state) => {
    console.log(state);
    setState(state);
  };

  return (
    <>
      {/* Digital Wallet connection and state management */}
      <DigitalWallet saveState={saveState} />
      {/* Introduction banner with bio and image */}
      <IntroBanner state={state} />
      {/* Gallery of showcase projects */}
      <ShowcaseGallery state={state} />
      {/* Display of skillset with icons */}
      <Skillset />
      {/* Career timeline visualization */}
      <CareerTimeline state={state} />
      {/* Link to resume or curriculum vitae */}
      <ResumeLink state={state} />
      {/* Social media connection links */}
      <SocialConnects />
    </>
  );
}

export default App;
