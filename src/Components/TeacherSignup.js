import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const TeacherSignup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        Clgname: "",
        subject: "",
        password: "",
        confirmpassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, username, email, phone, password, confirmpassword, Clgname, subject } = user;

        try {
            const res = await axios.post("https://mybackendtask.onrender.com/register", {
                name, username, email, phone, password, confirmpassword, Clgname, subject
            },
                {
                    withCredentials: true // Including credentials in the request
                });
            const data = res.data;
            if (data.status === 422 || !data) {
                window.alert("invalid");
                console.log("invalid");
            } else {
                window.alert("success");
                console.log("success");
                navigate("/teachlogin");
            }
        } catch (error) {
            console.error(error);
            window.alert("An error occurred. Please try again.");
        }
    }

    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method='POST' className="form-group">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autoComplete="off"
                                        value={user.name} onChange={handleInputs}
                                        placeholder="name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="username" id="username" autoComplete="off"
                                        value={user.username} onChange={handleInputs}
                                        placeholder="username" />
                                </div>
    
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off"
                                        value={user.email} onChange={handleInputs}
                                        placeholder="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                    </label>
                                    <input type="number" name="phone" id="phone" autoComplete="off"
                                        value={user.phone} onChange={handleInputs}
                                        placeholder="phone" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Clgname">
                                        <i className="zmdi zmdi-email materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="Clgname" id="Clgname" autoComplete="off"
                                        value={user.Clgname} onChange={handleInputs}
                                        placeholder="Clgname" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">
                                        <i className="zmdi zmdi-slideshow materials-icons-name"></i>
                                    </label>
                                    <input type="text" name="subject" id="subject" autoComplete="off"
                                        value={user.subject} onChange={handleInputs}
                                        placeholder="subject" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock materials-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={user.password} onChange={handleInputs}
                                        placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmpassword">
                                        <i className="zmdi zmdi-lock materials-icons-name"></i>
                                    </label>
                                    <input type="password" name="confirmpassword" id="confirmpassword" autoComplete="off"
                                        value={user.confirmpassword} onChange={handleInputs}
                                        placeholder="confirmpassword" />
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signup"
                                        id="signup"
                                        className="form-submit"
                                        value="Register"
                                        onClick={PostData}
                                    />
                                </div>
                            </form>
                            <div className="signup-image">
                                <p>Already have an account?<NavLink to="/teachlogin">Login</NavLink></p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TeacherSignup;