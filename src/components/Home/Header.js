import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icn from '../static_images/profile.png';
import qmark from '../static_images/qmark.png'
import HelpModal from './HelpModal';

const Header = () =>{

    const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
            <img 
                type="image/png"
                src={qmark}
                alt="Profile Icon"
                style={{ width: '40px', height: '40px', borderRadius: '50%', mixBlendMode: "darken", cursor: 'pointer'}}
                onClick={openModal}
                />
            <HelpModal isOpen={modalIsOpen} onClose={closeModal} />
        </div>
    );
};

export default Header;
