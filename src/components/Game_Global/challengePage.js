import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import backend from '../global';
import './challengepage.css';

const Challenge = () => {
    const [user, setUser] =useState();
    const [wait, setWait] = useState(false);
    const [friends, setFriends] = useState([]);
    const [sendState, setSend] = useState([]);
    const [rcvdChallenges, setRcvdChallenges] = useState([]);
    const [toggle, setToggle] = useState(false);
    const authToken = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken=')).split('=')[1];

    useEffect(() => {fetchData();}, []);

    var socket = new WebSocket('ws://127.0.0.1:8000/ws/random_challenge/');
    
    socket.onmessage = function (e) {
        var data = JSON.parse(e.data)
        var message = data.message;
        var player1_name = data.player1_name;
        var player2_name = data.player2_name;
        var room_code = data.room_code;
        console.log(data)
        console.log(player1_name, room_code)
        if (message === 'You have been paired with another player.' && (player1_name === user || player2_name === user)) {
            console.log("redirecting player 1")
            console.log(room_code)
            window.location.href = '/GlobalGame';
        }
    };

    socket.onopen = function (e) {
        socket.send('Waiting for random challenge...');
    };

    const fetchData = async() =>{
        try{
            const response = await fetch(backend + 'api/Challenge/', {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken,
                },
            } );

            const data = await response.json();
            
            setUser(data.username);
            setFriends(data.friends);
            setSend(Array(data.friends.length).fill(true));
            setRcvdChallenges(data.received_challenges);

        }catch(error){
            console.log(error);
        }
    };

    const randomChallenge = async() => {
        if(wait){
            try{
                console.log("challenge")
                const response = await fetch(backend + 'api/endWait/', {
                    method: 'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken,
                    },
                } );
    
            }catch(error){
                console.log(error);
            }
        }else{
            try{
                console.log("challenge")
                const response = await fetch(backend + 'api/randomChallenge/', {
                    method: 'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken,
                    },
                } );
    
            }catch(error){
                console.log(error);
            }
        }
        setWait(!(wait));
    }
    
    const sendChallenge = async(index) => {
        if(sendState[index]){
            try{
                console.log("sendChallenge")
                const response = await fetch(backend + 'api/createChallenge/' + friends[index].name + '/', {
                    method: 'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken,
                    },
                } );
    
            }catch(error){
                console.log(error);
            }
        }else{
            try{
                console.log("cancelChallenge")
                const response = await fetch(backend + 'api/cancelChallenge/' + friends[index].name + '/', {
                    method: 'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + authToken,
                    },
                } );
    
            }catch(error){
                console.log(error);
            }
        }

        const new_state = sendState;
        new_state[index] = !(new_state[index]);
        setSend(new_state);
        setToggle(prev => !prev);
    }

    const acceptChallenge = async(index) => {
        try{
            console.log("sendChallenge")
            const response = await fetch(backend + 'api/acceptChallenge/' + friends[index].name + '/', {
                method: 'GET',
                credentials:'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken,
                },
            } );

        }catch(error){
            console.log(error);
        }
    }


    return(
        <>
        <div className='challenge-page-container'>

        <div class="section">
        <Link to="/Home" style={{ textDecoration: 'none', display: 'flex' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Chain Reaction</h1>
      </Link></div>

            <div class="section pc">
                <button class="button button1" type="button" onClick={() => randomChallenge()}>
                        <div> {wait ? 'Cancel Search':'Challenge Random Player'}
                        </div>
                    </button>
            </div>

            <div class="pc">
                <table>
                    <td class="td_outer">
                        <div class="section">
                            <table>
                                <th><h2>Challenge Friend</h2></th>
                                {friends.map((row, index) => (
                                    <tr key = {index}> <td>{row.name}</td>
                                        <td class="td_inner">
                                        <button 
                                        class="challenge-button"
                                        type="button"
                                        id={`button_${index}`}
                                        onClick={() => sendChallenge(index)}
                                        > {sendState[index] ? 'send Challenge' : 'cancel Challenge'} </button></td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </td>

                    <td>
                        <div class="section">
                        <table>
                                <th><h2>Accept Challenge</h2></th>
                                {rcvdChallenges.map((row, index) => (
                                    <tr> <td>{row.name}</td>
                                        <td class="td_inner">
                                        <button 
                                        class="challenge-button"
                                        type="button"
                                        id={`button_${index}`}
                                        onClick={() => acceptChallenge(index)}
                                        > Challenge</button></td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </td>
                </table>
            </div>
        </div>
        </>
    )
}

export default Challenge;