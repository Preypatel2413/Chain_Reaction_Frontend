import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{
    return (
        <div className='pc'>
            <h1>Chain Reaction</h1>
            <Link to ={process.env.PUBLIC_URL + "/Profile/"}>
            <img 
                type="image/png"
                src="https://user-images.githubusercontent.com/76490445/252639953-aab47d71-e29a-4f7e-8998-af6cd161be52.jpg"
                alt="Profile Icon"
                style={{ width: '50px', height: '50px', borderRadius: '50%', mixBlendMode: "darken"}}
                />
            </Link>
        </div>
    );
};

export default Header;
