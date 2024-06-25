import React from 'react';
import { Link } from 'react-router-dom';
import icn from '../static_images/profile.png';

const Header = () =>{
    return (
        <div className='pc'>
            <h1>Chain Reaction</h1>
            <Link to ={process.env.PUBLIC_URL + "/Profile/"}>
            <img 
                type="image/png"
                src={icn}
                alt="Profile Icon"
                style={{ width: '50px', height: '50px', borderRadius: '50%', mixBlendMode: "darken"}}
                />
            </Link>
        </div>
    );
};

export default Header;
