import css from './CenterContent.css';

const CenterContent = ({ fullScreen, className, children }) => {
    return (
        <div className={`${css.base} ${className} ${fullScreen ? css.fullScreen : ''}`}>
            {children}
        </div>
    )
};

export default CenterContent;
