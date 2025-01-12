import React from 'react'
import Carousel from './Carousel'
import { Container,makeStyles,Typography} from '@material-ui/core'
const useStyles=makeStyles(()=>({
    banner:{
        backgroundImage:"url(./banner2.jpg)"
    },
    bannerContent:{
        display:"flex",
        flexDirection:"column",
        height:350,
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagline:{
        display:"flex",
        flexDirection:"column",
        textAlign:"center",
        height:"40%",
        judtifyContent:"center"
    },
    carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    }
}))
const Banner = () => {
    const classes=useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
            <Typography variant="h3" style={{fontWeight:"bold",marginBottom:15,fontFamily:"Montserrat"}}>
                   Crypto Hunter
          </Typography>
          <Typography variant="subtitle2" style={{color:"darkGrey",fontFamily:"Montserrat",textTransform:"capitalize"}}>
               Get all the info regarding your favourite cryptocurrency
         </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner