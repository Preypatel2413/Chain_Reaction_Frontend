import React, { useEffect, useState } from 'react';
import { Link, json } from 'react-router-dom';
import Swal from 'sweetalert2';
import backend from '../global';
import './profilepage.css';
import Atoms from '../Home/Atoms';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [friendList, setFriendList] = useState([]);
    const [wp, setWp] = useState(0);

    const [ref, setRef] = useState(true);
    const [inputData, setInputData] = useState('');

    useEffect(() =>{
    fetchUserData();}, [ref]
    );

    const handleChange = (e) => {
        setInputData(e.target.value);
    };

    const fetchUserData = async () => {
        try{

          // const authToken = document.cookie['authtoken'];
          const authToken = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken=')).split('=')[1];
          // console.log(authToken);
          const response = await fetch(backend + 'api/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authToken,
            },
        } );
          const data = await response.json();
          // console.log(data);

          // const userData = await userDataResponse.json();
          // const friendListData = await friendListResponse.json();

          setUser(data.user);
          setFriendList(data.friend_list);
          setWp(data.user.wp);
        } catch (error) {
          window.location.href = '/Verification';
          console.error("Error Fetching Data", error);
        }
    };
    

    const clearTrace = async() => {
      try{

        const authToken = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken=')).split('=')[1];
        const response = await fetch(backend + 'api/clearTrace/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + authToken,
              },
          } );
        
          const data = await response.json();

          if(data.success === 1){
            Swal.fire({icon: 'success', text: data.message ,  timer: 2500})
            setRef(!ref);
          }else{
            Swal.fire({icon: 'error', text: data.message ,  timer: 2500})
          }

      }catch(error){
        console.error("Error Tracing Data", error);
      }
    }


    const addFriend = async () => {
        try{
          // console.log(inputData);
          // const name = a;
          const authToken = document.cookie.split('; ').find(cookie => cookie.startsWith('authToken=')).split('=')[1];
          // console.log(authToken);
          // console.log(backend + 'api/addFriend/' + inputData + '/')
          const response = await fetch(backend + 'api/addFriend/' + inputData + '/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Token ' + authToken,
              },
          } );

          const data = await response.json();

          if(data.success === 1){
            Swal.fire({icon: 'success', text: data.message ,  timer: 2500})
            setRef(!ref);
          }else{
            Swal.fire({icon: 'error', text: data.message ,  timer: 2500})
          }
          
        }catch (error) {
            console.error("Error Fetching Data", error);
        }

    };

    return (
        <div className="profile-page-container">
          
      <>
      <Link to="/Home" style={{ textDecoration: 'none', display: 'flex' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Chain Reaction</h1>
      </Link>
      </> 
      <div id="light"><Atoms /></div>
            
      <div className="blur profile-block">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100%"}}><h2>{user.username}</h2>
        <button className='button' onClick={clearTrace}>Clear Trace</button>
        </div>
        <table>
          <tr>
            <th>
              <h3>Games Won</h3>
            </th>
            <th>
              <h3>Games Played</h3>
            </th>
            <th>
              <h3>Percentage</h3>
            </th>
          </tr>
          <tr>
            <td>{user.games_won}</td>
            <td>{user.games_played}</td>
            <td>{wp}%</td>
          </tr>
        </table>

        <table className="friend-list">
          <tr>
            <th>
              <h3>Friend's Name</h3>
            </th>
            <th>
              <h3>Games Won</h3>
            </th>
            <th>
              <h3>Games Lost</h3>
            </th>
            <th>
              <h3>Games Played</h3>
            </th>
          </tr>
          {friendList.map((friend) => (
            <tr key={friend.name}>
              <td>{friend.name}</td>
              <td>{friend.games_won}</td>
              <td>{friend.games_won_by_friend}</td>
              <td>{friend.games_played}</td>
            </tr>
          ))}
        </table>

        <br />
        <div className='tmp'>
          <input
            type="text"
            id="friendName"
            name = "name"
            value={inputData}
            onChange={handleChange}
            placeholder="Enter friend's name"
          />

          <button className="button" onClick={addFriend}>
          + Add Friend
          </button>
        </div>
      </div>
    </div>
    )
}


export default ProfilePage;