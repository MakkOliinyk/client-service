import css from './Title.css';

const Title = ({ className, text }) => {
    return (
        <div className={`${css.title} ${className}`}>{text}</div>
    );
};

export default Title;
