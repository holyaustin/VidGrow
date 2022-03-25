import { React } from 'react';
//import Navbar from '../components/navbar';
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Head from 'next/head'

import {
  marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export default function ReadBook() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  const router = useRouter()

  async function like() {

    router.push('/')
  }

  async function follow() {
  
    router.push('https://delibrary-quiz.4everland.app/')
  }

  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchMyNFTs()

    const items = await Promise.all(data.map(async i => {
      const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenURI)
      //let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        tokenURI
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }

  if (loadingState === 'loaded' && !nfts.length) return (<><h1 className="py-10 px-20 text-3xl">No Video to watch</h1></>)
  {
   return (
    <>
     
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <br />
        <div className="md:items-center">
          <center>
         
            <h2 className="text-6xl font-bold leading-1 text-black-900 sm:text-5xl hover:opacity-25"> My Watching Tube</h2>

          </center>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4" >
  
          {
            nfts.map((nft, i) => (
              <div key={i} className="-bg-white border shadow rounded-xl overflow-hidden">
                <>
                <iframe className="object-fill h-400 w-full" 
                src={nft.image}
                  frameBorder="0"
                 scrolling="no"
                height="450px"
                width="100%"
                ></iframe> </>
                <div className="p-4">
                  <p style={{ height: '20px' }} className="text-2xl font-semibold">{nft.name}</p>
                </div>
            
                <div className="p-4 bg-black flex ">
                  <button className="w-1/2 bg-blue-500 text-white font-bold m-6 py-6 px-6 rounded" onClick={() => follow()}>Follow Developer</button>
                  <button className="w-1/2 bg-blue-500 text-white font-bold m-6 py-6 px-6 rounded" onClick={() => like()}>Like Video</button>
                </div>             
              </div>
            ))
          }
        </div>




      </div>
    </>
  )
  }
}
