import clsx from 'clsx';

export const MyButton = ({label, icon, level, clickHandler, className}) => {
    const btnClass = [
        'btn-primary', 
        'btn-secondary', 
        'btn-success', 
        'btn-warning', 
        'btn-danger'
    ][level ?? 0];

    return (
        <button className={clsx('btn', btnClass, className)} onClick={clickHandler}>
            {icon && <i className={clsx('fa', icon)}></i>}
            {label}
        </button>
    )
}