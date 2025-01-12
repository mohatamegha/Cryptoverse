import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Header from './componenets/Header'
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
function App() {
  const useStyles=makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh"
    }
  }))
  const classes=useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
    <Header/>
    <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/coins/:id' element={<CoinPage/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
