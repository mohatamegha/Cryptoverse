import React,{useState,useEffect} from 'react'
import {HistoricalChart} from '../config/api'
import {CryptoState} from '../CryptoContext'
import {makeStyles,createTheme,ThemeProvider,CircularProgress} from '@material-ui/core'
import {chartDays} from '../config/data'
import {Line} from 'react-chartjs-2'
import axios from "axios"
import SelectButton from './SelectButton';
const CoinInfo = ({coin}) => {
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });
    const [historicData,setHistoricData]=useState()
    const [days,setDays]=useState(1)
    const {currency}=CryptoState()
    const fetchHistoricalData=async()=>{
const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
setHistoricData(data.prices)
    }
    useEffect(()=>{
        fetchHistoricalData()
    },[currency,days])
    console.log(historicData)
        const useStyles = makeStyles((theme) => ({
            container: {
              width: "75%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 25,
              padding: 40,
              [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
              },
            },
          }));
        
    const classes=useStyles()
  return (
 <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>
   {
    !historicData ?(
       <CircularProgress style={{color:"gold"}} size={250} thickness={1}>
</CircularProgress>
    ):(<>
    <Line 
    data={{
        labels:historicData.map((coin)=>{
            let date=new Date(coin[0]);
            let time=date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()}PM`:`${date.getHours()}:${date.getMinutes()}AM`
       return days===1?time:date.toLocaleDateString()
        }),
        datasets:[
         { 
            data:historicData.map((coin)=>coin[1]),
            label:`Price (past ${days} days) in ${currency}`,
            borderColor:"#EEBC1D"
        }
        ]
    }}
    options={{
        elements:{
            point:{
                radius:1
            }
        }
    }}/>
     <div style={{display:"flex",justifyContent:"space-around",width:"100%",marginTop:20}}>
        {chartDays.map((day)=>(
            <SelectButton key={day.value} onClick={()=>setDays(day.value)} selected={days===day.value}>{day.label}</SelectButton>
        ))}
    </div>
    </>)
   }
    </div>
 </ThemeProvider>
  )
}

export default CoinInfo


