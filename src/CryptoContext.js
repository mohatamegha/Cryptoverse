import React, { createContext,useContext } from 'react'
import { useEffect,useState } from 'react';
const Crypto=createContext();
const CryptoContext = ({children}) => {
  const [currency,setCurrency]=useState("INR");
  const [symbol,setSymbol]=useState("Rs.");
  useEffect(()=>{
    if(currency==="INR")
      setSymbol("Rs")
    else
    setSymbol("$")
  },[currency])
  return (
   <Crypto.Provider value={{currency,symbol,setCurrency}}>
    {children}
   </Crypto.Provider>
  )
}

export default CryptoContext;
export const CryptoState=()=>{
return useContext(Crypto)
}