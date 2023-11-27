import { useState } from "react";
import ABI from "./ABI.json"; 
import Web3 from "web3";
import './DigitalWallet.css';
// Component to manage the digital wallet connection
const DigitalWallet = ({ saveState }) => {
    const [connected, setConnected] = useState(false);
    // Check if the user is on a mobile device for MetaMask mobile link
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // Function to initialize wallet connection
    const initializeWalletConnection = async () => {
        try {
            // Connect to Ethereum blockchain using Web3
            const web3 = new Web3(window.ethereum);
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Create a contract instance with ABI and address
            const contract = new web3.eth.Contract(
                ABI,
                "0xef2C5f1438c039a0CAC24A73F79d1580cC27a407"
            );
            setConnected(true);
            // Save the state with web3 and contract instances
            saveState({ web3: web3, contract: contract });
        } catch (error) {
            alert("Please install MetaMask to interact with this application.");
        }
    }

    return (
        <div className="digitalWalletHeader">
            <button className="connectWalletButton" onClick={initializeWalletConnection} disabled={connected}>
                {connected ? "Connected" : "Connect MetaMask"}
            </button>
            {!connected && !isMobileDevice && (
                <div className="metamaskMessage">
                    Please connect to MetaMask to view the content.
                </div>
            )}

            {isMobileDevice && (
                <button className="connectWalletButton">
                    <a href="https://metamask.app.link/dapp/adyworks.netlify.app/">Connect on Mobile</a>
                </button>
            )}
        </div>
    );
}

export default DigitalWallet;
