import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import backend from '../global';
import './Gamepage.css'
import b3 from '../static_images/B_3.png'
import b2 from '../static_images/B_2.png'
import b1 from '../static_images/B_1.png'
import g3 from '../static_images/G_3.png'
import g2 from '../static_images/G_2.png'
import g1 from '../static_images/G_1.png'
import b0 from '../static_images/0.png'


const Game_SP = () =>{
    const [win, setWin] = useState(0);
    const [move, setMove] = useState(0);
    const [sessionId, setSessonId] = useState('');
    const init_Position = Array.from({ length: 9 }, () => Array(6).fill(0));
    const [Position, setPosition] = useState(init_Position);

    useEffect(() => {fetchUserData();}, []);

    useEffect(() => {checkWin();}, [win]);

    const checkWin = () =>{
        if(win === 1){
            Swal.fire({title: 'Player 1 has won the match!!!', confirmButtonText: 'Play Again', showCancelButton: true, cancelButtonText: 'Go To Home', })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({title: "New Game Begins"});
                    window.location.reload();
                } else {
                    Swal.fire({title: "Taking to Home page"});
                    window.location.href = '/Home';
                }
            });
        }else if(win === 2){
            Swal.fire({title: 'Player 2 has won the match!!!', confirmButtonText: 'Play Again', showCancelButton: true, cancelButtonText: 'Go To Home', })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({title: "New Game Begins", timer: 2500});
                    window.location.reload();
                } else {
                    Swal.fire({title: "Taking to Home page", timer: 2500});
                    window.location.href = '/Home';
                }
            });
        }
    }
    const fetchUserData = async () => {
        try{
            const response = await fetch(backend + 'api/game_state/');
            const data = await response.json();
            setPosition(data.Position);
            setWin(data.win);
            setMove(data.move);
            setSessonId(data.session_id);
        } catch (error){
            console.error("Error fetching Data", error);
        }
    };

    const renderCell = (num) => {
        switch (num){
            case 3:
            return <img src={g3} alt="3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '50px', width:'50px'}}/>;
        case 2:
            return <img src={g2} alt="2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '50px', width:'50px'}}/>;
        case 1:
            return <img src={g1} alt="1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '50px', width:'50px'}}/>;
        case -3:
            return <img src={b3} alt="-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '50px', width:'50px'}}/>;
        case -2:
            return <img src={b2} alt="-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '50px', width:'50px'}}/>;
        case -1:
            return <img src={b1} alt="-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '50px', width:'50px'}}/>;
        default:
            return <img src={b0} alt="0" style={{ height: '50px', width:'50px', margin:'0px', padding:'0px'}}/>;
        }
    };


    const updatePosition = async (row, col, p, mv) =>{
        
        if (p > 0 && mv % 2 === 1) {
          Swal.fire({ title: 'Invalid Move!', text: 'This box is already filled with opponents atoms.', confirmButtonText: 'OK', timer: 2500 });
        } else if (p < 0 && mv % 2 === 0) {
          Swal.fire({ title: 'Invalid Move!', text: 'This box is already filled with opponents atoms.', confirmButtonText: 'OK', timer: 2500 });
        } else {
            try {
                // const csrftoken = document.cookies
                console.log(`${backend}api/update_position/${row}/${col}`)
                const response = await fetch(backend + 'api/update_position/' + row + '/'+ col + '/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                    'Content-Type': sessionId
                },
                });
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const data = await response.json();
                console.log(data);
                setPosition(data.Position);
                setWin(data.win);
                setMove(data.move);
              } catch (error) {
                console.error('Error updating position:', error);
              }
      
        };
    };


    return (
        <div className="game-page-container">
        <>
        <h1>Chain Reaction</h1>
        {/* <br /> */}
        <div>
            <table className={move % 2 === 1 ? 'tab1' : 'tab2'} align="center">
            {Position.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                    <td key={colIndex} className={move % 2 === 1 ? 'tab1' : 'tab2'}>
                    <button
                        className={`button button${move % 2 === 1 ? '2' : '1'}`}
                        type="button"
                        id={`button_${colIndex}_${rowIndex}`}
                        onClick={() => updatePosition(rowIndex, colIndex, col, move)}
                    >
                        <div>
                        {renderCell(col)}</div>
                    </button>
                    </td>
                ))}
                </tr>
            ))}
            </table>
        </div>
        </>
        </div>
    )
}

export default Game_SP;
