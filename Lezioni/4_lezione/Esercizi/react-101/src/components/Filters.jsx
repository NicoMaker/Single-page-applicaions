import clsx from 'clsx';
import style from '../App.module.css';

export const Filters = ({ filter, setFilter }) => {
    const filters = ['all', 'pending', 'completed'];
    const filterLabels = { all: 'Tutte', pending: 'Da fare', completed: 'Completate' };

    return (
        <div className={style.filtersBar}>
            {filters.map(f => (
                <button
                    key={f}
                    className={clsx(style.filterBtn, { [style.active]: filter === f })}
                    onClick={() => setFilter(f)}
                >{filterLabels[f]}</button>
            ))}
        </div>
    );
};