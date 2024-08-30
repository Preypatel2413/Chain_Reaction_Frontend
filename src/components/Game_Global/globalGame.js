import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import backend from '../global';
import b3 from '../static_images/B_3.png';
import b2 from '../static_images/B_2.png';
import b1 from '../static_images/B_1.png';
import g3 from '../static_images/G_3.png';
import g2 from '../static_images/G_2.png';
import g1 from '../static_images/G_1.png';
import b0 from '../static_images/0.png';


const Game_GP = () => {
    const [roomName, setRoomName] = useState("");
    const [user, setUser] = useState([]);
    const [opp, setOpp] = useState([]);
    const [PlayingAs, setPlayingAs] = useState(0);

    const authToken = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken=')).split('=')[1];

    const [win, setWin] = useState(0);
    const [move, setMove] = useState(0);
    const init_Position = Array.from({ length: 9 }, () => Array(6).fill(0));
    const [Position, setPosition] = useState(init_Position);
    const [lastmove, setLastMove] = useState([null, null]);

    const [chat, setChat] = useState([]);
    // var socket = new WebSocket('');

    useEffect(()=> {fetchUserData();}, []);
    useEffect(()=> {checkWin();}, [win]);
    useEffect(()=> {connectWS();}, [roomName]);

    const fetchUserData = async () => {
        try{
            // const response = await fetch(backend + 'api/game_state_GP/');
            const response = await fetch(backend + 'api/game_state_GP/', {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken,
                },
            } );
            const data = await response.json();
            
            // console.log(data);
            setRoomName(data.room_code);
            setUser(data.user_data);
            setPlayingAs(data.p);
            setOpp(data.opp_data);
            setPosition(data.position);
            setMove(data.move);
            setWin(data.win);
        } catch (error){
            console.log("Error fetching Data", error);
        }
    };

    const connectWS = () => {
        // console.log("roomname : " + roomName)
        // console.log('wss://chain-reaction.preypatel.com/ws/Game/' + roomName)
        var socket = new WebSocket('wss://chain-reaction.preypatel.com/ws/Game/' + roomName);
        socket.onmessage = function (e) {
            var data = JSON.parse(e.data);
            var message = data.message;
            // console.log(message);
            
            setPosition(data.position);
            setMove(data.move);
            setWin(data.win);
            setLastMove(data.lastmove);
            // console.log(data.lastmove);
            setChat(data.conv);

            // if(message === 'position_update'){
            //     console.log("update");
            //     setPosition(data.position);
            //     setMove(data.move);
            //     setWin(data.win);
            //     setLastMove(data.lastmove);
            // }
            // else{
            //     console.log("no update");
            //     setChat(data.conv);
            // }
        };

        socket.onopen = function (e) {
            socket.send('Waiting for random challenge...');
        };
    }

    const updatePosition = async (row, col, v, mv) =>{
        // console.log(v,mv,PlayingAs);

        if(PlayingAs === 0 && mv%2===1){
            Swal.fire({title: 'Invalid Move!', text: 'It is opponents move.',confirmButtonText: 'OK', timer: 2500})
        }else if(PlayingAs === 1 && mv%2 === 0){
            Swal.fire({title: 'Invalid Move!', text: 'It is opponents move.',confirmButtonText: 'OK', timer: 2500})
        }else if(PlayingAs === 0 && v<0){
            Swal.fire({title: 'Invalid Move!', text: 'This box is already filled with opponents atoms.',confirmButtonText: 'OK', timer: 2500})
        }else if(PlayingAs === 1 && v>0){
            Swal.fire({title: 'Invalid Move!', text: 'This box is already filled with opponents atoms.',confirmButtonText: 'OK', timer: 2500})
        }else{

            try {
                const response = await fetch(backend + 'api/update_position_GP/' + roomName+ '/' + row + '/'+ col + '/', {
                    method: 'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken,
                    },
                } ); 

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // const data = await response.json();
                // console.log(data);
                // setPosition(data.Position);
                // setWin(data.win);
                // setMove(data.move);
              } catch (error) {
                console.error('Error updating position:', error);
              }
        };
    };

    const checkWin = () =>{

        if(win===1 || win===2){
            if(win-PlayingAs === 1){
                Swal.fire({icon: 'success', title: 'Congrats!!',text: 'You have won the match!', confirmButtonText: 'Go To Home', showCancelButton: false,})
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({title: "Taking to Home page"});
                        clear_Game(win,PlayingAs);
                    } 
                });
            }else{
            Swal.fire({icon: 'error', title: 'Sorry!!', text: 'Your opponent has won the match.', confirmButtonText: 'Go To Home', showCancelButton: false,})
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({title: "Taking to Home page"});
                        clear_Game(win,PlayingAs);
                    } 
                });
            }
        }

        function clear_Game(win,p) {
            fetch(backend + 'api/clearGame/' + win + '/' + p + '/', {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken,
                },
            } );
            window.location.href = "/Home";
        }
    }

    const SendMessage = async ()=>{

        // console.log("sending Message");
        var message = document.getElementById("message").value;
        
        fetch(backend + 'api/sendMessage/'  + PlayingAs + "/" + message , {
            method: 'GET',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authToken,
            },
        } );

    }


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

    const renderChat = (message) => {

        if(message[0] === PlayingAs){
            return (
            <tr>
                <td class="player-message">
                    <span class="player-initial"> {message[1]} </span><br />
                    <span class="message-text"> {message[2]} </span>
                </td>
            </tr>
            )
        }else{
            return (
            <tr>
                <td class="opponent-message">
                    <span class="player-initial">{message[1]}</span><br />
                    <span class="message-text">{message[2]}</span>
                </td>
            </tr>
            )
        }
    };

    return (
        <>
        <div className="game-page-container">
        <h1>Chain Reaction</h1>
        {/* <br /> */}
        <div class = "game-container">
        <div className='game-board'>
            <table className={move % 2 === 1 ? 'tab1' : 'tab2'} align="center">
            {Position.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {row.map((col, colIndex) => {
                    const isLastMove = (rowIndex === lastmove[0] && colIndex === lastmove[1]);
                    return (
                    <td key={colIndex} className= {`tab${move % 2 === 1 ? '1' : '2'}`}>
                    <button
                        className={`${isLastMove ? 'button' : `button button${move % 2 === 1 ? '2' : '1'}`}`}
                        type="button"
                        id={`button_${colIndex}_${rowIndex}`}
                        onClick={() => updatePosition(rowIndex, colIndex, col, move)}
                    >
                        <div align="center" className={`${isLastMove ? 'last-move' : ''}`}>
                        {renderCell(col)}</div>
                    </button>
                    </td>
                )})}
                </tr>
            ))}
            </table>
        </div>


        <div class="chat-panel">
            <div class="user-details"><table>
                <tr>
                    <th><h3>{user[0]}</h3></th>
                    <th><h3>{user[1]}</h3></th>
                    <th><h3>{user[2]}</h3></th>
                </tr>
            </table></div>
            <div class="chat-messages">
                <table class="chat-table">
                    {chat.map((message, Index) => (
                        <div>{renderChat(message)}</div>
                    ))}

                </table>
            </div>

            <div class="chat-input">
            <input type="text" id="message" placeholder="send a message"/>
            <button class="sendbutton" onClick={()=>SendMessage()}> Send </button>
            </div>

            <div class="opponent-details"><table>
                <tr><th><h3>{opp[0]}</h3></th>
                    <th><h3>{opp[1]}</h3></th>
                    <th><h3>{opp[2]}</h3></th>
                </tr>
            </table></div>
        </div>
        </div>
        </div>
    </>

    )
}

export default Game_GP;