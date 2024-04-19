import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { ClgContext } from '../App';

const TeacherLogin = () => {
    const {clgstate,clgdispatch} = useContext(ClgContext);
    
    const navigate = useNavigate();
    const [username, setUsername] = useState('geetha60');
    const [password, setPassword] = useState('123456');

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://mybackendtask.onrender.com/login', {
                username,
                password
            }, {
                withCredentials: true // Including credentials in the request
            });
            
            const data = res.data;
            if (res.status === 400 || !data) {
                window.alert("Invalid credentials");
            } else {
                clgdispatch({type:"CLG",payload:true})
                window.alert("Login success");
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // Include token in headers
                navigate("/clghome");
            }
        } catch (error) {
            console.error(error);
            window.alert("An error occurred. Please try again.");
        }
    }
    return (
        <>
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method='POST' className="form-group">
                                <div className="form-group">
                                    <label htmlFor="username">
                                        <i className="zmdi zmdi-username materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="username" id="username" autoComplete="off"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="username" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock materials-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password" />
                                </div>

                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        value="Login"
                                        onClick={loginUser}
                                    />
                                </div>
                            </form>

                            <div className="signin-image">
                                <p>Don't have an account?<NavLink to="/teachsignup">Signup</NavLink></p>
                                {/* <figure>
                                    <img src="https://static.vecteezy.com/system/resources/previews/004/578/780/original/girl-putting-up-sign-for-plan-schedule-free-vector.jpg" alt="signin" />
                                </figure> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TeacherLogin;
