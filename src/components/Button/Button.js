import React from "react";

import css from './Button.css';

const Button = ({ className, label, onClick }) => {
    return (
        <button className={`${css.button} ${className}`} onClick={onClick}>{label}</button>
    );
};

export default Button;
