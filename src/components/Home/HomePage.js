import React from 'react';
import Header from './Header';
import Buttons from './Buttons';
import Atoms from './Atoms';
import './homepage.css';

const URL = process.env.REACT_APP_SERVER + "/Home";

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
    return (
        <div className='home-page-container'>
            <div className='blur'>
            <Header />
            <br />
            <br />
            <br />
            <Buttons />
            </div>
            <div id="light"><Atoms /></div>
            
        </div>
    );
    }
}


// export default HomePage;