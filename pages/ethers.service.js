import { ethers } from 'ethers';

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together

export const ethersProvider = async() => {
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  return Provider;
}
}
export const getAddress = async() => {
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0];
}
}

export const signText = (text) => {
  console.log(text)
  //return ethersProvider.signMessage(text);
}