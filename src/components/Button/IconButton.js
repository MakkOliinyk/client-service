import React from "react";
import Icon from '@mdi/react';

import css from './Button.css';

const SIZE_OFFSET = 6;

const IconButton = ({ className, iconSize= 20, iconPath, onClick }) => {
    const size = iconSize + SIZE_OFFSET + 'px';

    return (
        <div style={{ width: size, height: size }} className={`${css.button} ${css.iconButton} ${className}`} onClick={onClick}>
            <Icon size={`${iconSize}px`} path={iconPath} />
        </div>
    );
};

export default IconButton;
