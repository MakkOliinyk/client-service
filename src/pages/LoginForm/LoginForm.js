import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginForm.css';
import {loginUser, registerUser} from "../../api/user";
import {getToken} from "../../storage/token";

const LoginForm = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(getToken() !== 'undefined');
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) navigate('/files');
    }, [isLoggedIn]);

    const handleSubmit = async () => {
        if (isRegistration) await registerUser(email, password);
        else await loginUser(email, password);

        setIsLoggedIn(true);

    };

    return (
        <div className="centerContent">
            <div className="loginFormContainer">
                <h2 className="loginTitle">{isRegistration ? 'Registration' : 'Login'}</h2>
                <div className="loginForm">
                    <div className="inputsContainer">
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="button" onClick={handleSubmit}>Submit</button>
                </div>
                <div className="regisrationLink" onClick={() => setIsRegistration(!isRegistration)}>
                    {isRegistration ? 'I already have an account' : 'Don\'t have an account?'}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
