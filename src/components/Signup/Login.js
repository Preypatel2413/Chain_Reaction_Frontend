import React, { useEffect, useState } from 'react';
import backend from '../global';
import Swal from 'sweetalert2';

const Login = () => {

    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState({username:'', password:'', csrfmiddlewaretoken: token});

    useEffect(()=>{
        fetchCsrfToken();
    }, []);

    const fetchCsrfToken = async () => {
        try {
            const response = await fetch(backend + 'api/csrf_token/');
            const data = await response.json();

            // Set CSRF token in state
            document.cookie = `csrftoken=${data.csrfToken}; path=/`;
            setToken(data.csrfToken);
            // console.log(data)
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
            csrfmiddlewaretoken:token,
        });
    };

    const handleLogin = async(e) => {
        e.preventDefault();

        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-CSRFToken': token,
        });

        try{
            const response = await fetch(backend + 'api/login/', {
                method: 'POST',
                headers:headers,
                credentials:'include',
                body:JSON.stringify(formData),
            });

            const data = await response.json();

            if(data.success){
                setToken(data.token);
                document.cookie = `authToken=${data.token}; path=/`;
                // console.log(data.token)
                window.location.href = '/Home';
            }else{
                Swal.fire({title: data.errors, showCancelButton: true, })
                // console.log(data.errors);
            }
        }catch(error){
            console.error('Signup Error:', error);
        }
    };

    return (
        <>
        <div className='form-container'>
            <form onSubmit={handleLogin}>
            {/* <CSRFToken /> */}
            <label>
                Username:
                <input className="input" type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <div className='bd-lgn'>
            <button type="submit" className='submit'>Login</button>
            </div>
            </form>
        </div>
        </>
    )
}

export default Login;