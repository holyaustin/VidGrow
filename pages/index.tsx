import type { NextPage } from "next";
import React, { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import styles from "../styles/log.module.css";
import { getAddress, signText } from './ethers.service';
import { generateChallenge } from './generate-challenge'
import { authenticate } from './authenticate'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [account, setAccount] = useState("");
  const [connection, setConnection] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter()

  async function getWeb3Modal() {
    let Torus = (await import("@toruslabs/torus-embed")).default;
    const web3modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: false,
      providerOptions: {
        torus: {
          package: Torus,
        },
      },
    });
    return web3modal;
  }

  async function connect() {
    const web3modal = await getWeb3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const accounts = await provider.listAccounts();
    setConnection(connection);
    setAccount(accounts[0]);
  }

  const [provider, setProvider] = useState({});
  
  async function Login() {
   /** const authData = await fetch(`/api/authenticate?address=${account}`);
    console.log(authData);
    const user = await authData.json();
    const provider = new ethers.providers.Web3Provider(connection as any);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(user.nonce.toString());
    const response = await fetch(
      `/api/verify?address=${account}&signature=${signature}`
    );
    const data = await response.json();
    setLoggedIn(data.authenticated); */ 

  // we grab the address of the connected wallet

  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
  const address = await getAddress();
  console.log(address)
  
  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);
  console.log(challengeResponse)
  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text)
  console.log(signature)
  router.push('/explore')
  
  //const accessTokens = await authenticate(address, signature);
  //console.log(accessTokens);
}
  // you now have the accessToken and the refreshToken
  // {
  //  data: {
  //   authenticate: {
  //    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
  //    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
  //   }
  // }

  }

  return (
    <div className={styles.container}>
      {!connection && (
        <button className="w-full text-3xl font-bold mt-10 bg-pink-400 text-white rounded p-4 shadow-lg" onClick={connect}>
          Connect Wallet
        </button>
      )}
      {connection && !loggedIn && (
        <>
          <button className= "w-full text-3xl font-bold mt-10 bg-pink-600 text-white rounded p-4 shadow-lg" onClick={Login}>
            Login
          </button>
        </>
      )}
      {loggedIn && <h2>Lets get started, {account}</h2>}
    </div>
  );
};

export default Home;