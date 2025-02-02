import React ,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core'
import axios from "axios";
import {CryptoState} from '../../CryptoContext'
import {TrendingCoins} from '../../config/api'
import AliceCarousel from 'react-alice-carousel';
const useStyles=makeStyles(({
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        textTransform:"uppercase",
        cursor:"pointer",
        color:"white"
    }
}))
export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const classes=useStyles();
    const {currency,symbol}=CryptoState();
    console.log(currency)
    const [trending,setTrending]=useState([]);
    const fetchingTrendingCoins=async()=>{
    const {data}=await axios.get(TrendingCoins(currency));
    setTrending(data);
    };
    useEffect(()=>{
    fetchingTrendingCoins();
    },[currency])
    console.log(trending);
    const items=trending.map((coin)=>{
        let profit=coin?.price_change_percentage_24h>=0;
    return(
        <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
            <img src={coin?.image}
             alt={coin.name}
             height="80"
             style={{marginBottom:10}}
            ></img>
            <span>
                {coin?.symbol}
                &nbsp;
                <span style={{color:profit>0?"rgb(14,203,129":"red",fontWeight:500}}>
                    {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
            </span>
            <span>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>
    )
    });
    const responsive={
  0:{
    items:2
  },
  512:{
    items:4
  }
    }
  return (
    <div className={classes.carousel}>
       <AliceCarousel
       mouseTracking
       infinite
       autoPlayInterval={1000}
       animationDuration={1500}
       disableDotsControls
       disableButtonsControls
       responsive={responsive}
       autoPlay
       items={items}
       />
    </div>
  )
}

export default Carousel
