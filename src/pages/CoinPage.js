import React ,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {CryptoState} from '../CryptoContext'
import {SingleCoin} from '../config/api'
import {LinearProgress, makeStyles,Typography} from '@material-ui/core'
import axios from "axios"
import CoinInfo from '../componenets/CoinInfo';
export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {
    const {id}=useParams()
    const {currency,symbol}=CryptoState();
    const [coin,setCoin]=useState()
    const fetchCoin=async()=>{
   const {data}=await axios.get(SingleCoin(id));
   setCoin(data);
    }
    console.log(coin)
    useEffect(()=>{
fetchCoin()
    },[])
    const useStyles=makeStyles((theme)=>({
container:{
    display:"flex",
    [theme.breakpoints.down("md")]:{
        flexDirection:"column",
        alignItems:"center"
    }
},
sidebar:{
    display:"flex",
    width:"30%",
    [theme.breakpoints.down("md")]:{
        width:"100%"
    },
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid grey",
},
heading:{
    fontFamily:"Montserrat",
    fontWeight:"bold",
    marginBotttom:20
},
description:{
    fontFamily:"Montserrat",
    textAlign:"justify",
    padding:25,
    paddingBottom:15,
    paddingTop:0,
    width:"100%"
},
market: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },

    }));
    const classes=useStyles()
    if(!coin)
        return <LinearProgress style={{backgroundColor:"gold"}}></LinearProgress>
  return (
    <div className={classes.container}>
        <div className={classes.sidebar}>
      <img src={coin?.image.large}
      alt="coin?.name"
      height="200"
      style={{marginBottom:20}}>
      </img>
      <Typography variant="h3" className={classes.heading}>
      {coin?.name}
      </Typography>
      <Typography variant="subtitle1" className={classes.description}>
      <div dangerouslySetInnerHTML={{ __html: coin?.description.en.split(". ")[0] }}></div>
      </Typography>
      <div className={classes.market}>
<span style={{display:"flex",marginBottom:15}}>
    <Typography variant="h5" className={classes.heading}>
         Rank:
    </Typography>
    &nbsp; &nbsp;
    <Typography variant="h5" style={{fontFamily:"Montserrat"}}>
{coin?.market_cap_rank}
    </Typography>
</span>
<span style={{display:"flex",marginBottom:15}}>
    <Typography variant="h5" className={classes.heading}>
         Current Price:
    </Typography>
    &nbsp; &nbsp;
    <Typography variant="h5" style={{fontFamily:"Montserrat"}}>
    {symbol} {" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
    </Typography>
</span>
<span style={{ display: "flex" ,marginBottom:15}}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>

      </div>
        </div>
        <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage