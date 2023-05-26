import css from './Spinner.css';

const Spinner = ({ small }) => {
    return <div className={`${css.base} ${small ? css.small : null}`}/>
};

export default Spinner;
