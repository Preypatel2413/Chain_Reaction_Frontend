import React, { useEffect, useState } from 'react';
import backend from '../global';
import CSRFToken from './crsftoken';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignUp = () => {

    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({username:'', email:'', password1:'', password2:'',csrfmiddlewaretoken: token,});

    // useEffect(() => {signUpForm();}, []);
    useEffect(() => {
        fetchCsrfToken(); // Fetch CSRF token when the component mounts
    }, []);

    const fetchCsrfToken = async () => {
        try {
            const response = await fetch(backend + 'api/csrf_token/');
            const data = await response.json();

            // Set CSRF token in state
            document.cookie = `csrftoken=${data.csrfToken}; path=/`;
            setToken(data.csrfToken);
            // console.log(data);
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            csrfmiddlewaretoken: token,
        });
    };

    const handleSignup = async(e) => {
        e.preventDefault();
        
        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-CSRFToken': token,
        });
        
        // console.log(headers)
       
        try {
            const response = await fetch(backend + 'api/sign_up/', {
                method: 'POST',
                headers: headers,
                credentials: 'include',
                body: JSON.stringify(formData),
              });
        
            const data = await response.json();
            console.log(data);
            console.log(data.errors);
            if (data.success) {
                // Signup successful, store the token
                setToken(data.token);
                // console.log(data.message);
                document.cookie = `authToken=${data.token}; path=/`;
                window.location.href = '/Home';
            } else {
                // Signup failed, handle errors
                let errorMessages = [];
                if (data.errors['email']) {
                    errorMessages.push(`${data.errors['email'].join('\n')}`);
                }
                if (data.errors['password2']) {
                    errorMessages.push(`${data.errors['password2'].join('\n')}`);
                }
                Swal.fire({title: "Error occured while creating account!", text: errorMessages.join('\n'), showCancelButton: true, })
                // console.log(data.errors);
            }
        } catch (error) {
        console.error('Signup error:', error);
        }
    };

    return (
        <>
            <div className='form-container'>
      {/* <h2>Sign Up</h2> */}
      <form onSubmit={handleSignup}>
      <CSRFToken />
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password1" value={formData.password1} onChange={handleChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="password2" value={formData.password2} onChange={handleChange} />
      </label>
      <div className='bd-sgn'>
      <button type="submit" className='submit'>Sign Up</button>
      </div>
      </form>
    </div>

        </>
    )
};

export default SignUp;