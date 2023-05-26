import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {loginUser, registerUser} from "../../api/user";
import {getToken} from "../../storage/token";

import Title from '../../components/Title';
import Button from '../../components/Button';
import CenterContent from '../../components/CenterContent';

import css from './LoginForm.css';

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
        <CenterContent fullScreen>
            <div className={css.loginFormContainer}>
                <Title className={css.title} text={isRegistration ? 'Registration' : 'Login'} />
                <div className={css.loginForm}>
                    <div className={css.inputsContainer}>
                        <input
                            className={css.input}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className={css.input}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button label={isRegistration ? 'Register' : 'Login'} onClick={handleSubmit} />
                </div>
                <div className={css.regisrationLink} onClick={() => setIsRegistration(!isRegistration)}>
                    {isRegistration ? 'I already have an account' : 'Don\'t have an account?'}
                </div>
            </div>
        </CenterContent>
    );
};

export default LoginForm;
