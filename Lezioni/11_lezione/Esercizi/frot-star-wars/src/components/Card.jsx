


export const Card = ({film}) => {

    return (
        <div className="card">
            <h2>{film.title}</h2>
            <p>{film.opening_crawl}</p>
        </div>
    )
}