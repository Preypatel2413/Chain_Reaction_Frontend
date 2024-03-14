import React from 'react';
import { Link } from 'react-router-dom';
const Buttons = () =>{
    return (
        <div>
        <table className='pc'>
            <tr>
                <td className='pc'>
                    <Link to ={process.env.PUBLIC_URL + "/Challenge/"}>
                    <button type='button' className='button button1'>
                        Multiplayer
                    </button>
                    </Link>
                </td>
            </tr>
            <tr>
                <td className='pc'>
                    <Link to ={process.env.PUBLIC_URL + "/Singleplayer/"}>
                    <button type='button' className='button button2' >
                        SinglePlayer
                    </button>
                    </Link>
                </td>
            </tr>
        </table>
        </div>
    );
};

export default Buttons;