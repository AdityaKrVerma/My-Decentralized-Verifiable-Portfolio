import { useState } from "react";
import ABI from "./ABI.json"; 
import Web3 from "web3";
import './DigitalWallet.css';

const DigitalWallet = ({ saveState }) => {
    const [connected, setConnected] = useState(false);
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const initializeWalletConnection = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const contract = new web3.eth.Contract(
                ABI,
                "0xef2C5f1438c039a0CAC24A73F79d1580cC27a407"
            );
            setConnected(true);
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
