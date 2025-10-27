import style from './Card.module.css';


export const Card = ({title, children} ) => {

    return (
        <div className={style.card}>
            {!!children ? children : <h1>{title}</h1>}
        </div>
    )
}