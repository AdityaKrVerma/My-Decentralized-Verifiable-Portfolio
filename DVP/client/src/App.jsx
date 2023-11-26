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

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null
  });

  const saveState = (state) => {
    console.log(state);
    setState(state);
  };

  return (
    <>
      <DigitalWallet saveState={saveState} />
      <IntroBanner state={state} />
      <ShowcaseGallery state={state} />
      <Skillset />
      <CareerTimeline state={state} />
      <ResumeLink state={state} />
      <SocialConnects />
    </>
  );
}

export default App;
