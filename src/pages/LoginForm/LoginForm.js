import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {loginUser, registerUser} from "../../api/user";
import isLoggedIn from "../../utils/isLoggedIn";

import Title from '../../components/Title';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import CenterContent from '../../components/CenterContent';

import css from './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setIsRegistration] = useState(false);
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) navigate('/files');
    }, [loggedIn]);

    const handleSubmit = async () => {
        setIsLoading(true);
        if (isRegistration) await registerUser(email, password);
        else await loginUser(email, password);
        setIsLoading(false);

        setLoggedIn(true);
    };

    const getWordings = () => {
        if (isRegistration) return {
            title: 'Реєстрація',
            button: 'Зареєструватися',
            link: 'Маєте обліковий запис?',
        };

        return {
            title: 'Вхід',
            button: 'Увійти',
            link: 'Не маєте облікового запису?',
        };
    };

    const wordings = getWordings();

    return (
        <CenterContent fullScreen>
            <div className={css.loginFormContainer}>
                <Title className={css.title} text={wordings.title} />
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
                    <Button label={isLoading ? <Spinner small /> : wordings.button} onClick={handleSubmit} />
                </div>
                <div className={css.regisrationLink} onClick={() => setIsRegistration(!isRegistration)}>
                    {wordings.link}
                </div>
            </div>
        </CenterContent>
    );
};

export default LoginForm;
