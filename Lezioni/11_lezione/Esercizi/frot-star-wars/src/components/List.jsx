import { Card } from "./Card"


export const List = ({films}) => {
    return (
        <div className="list">
            {films.map(f => <Card key={f.episode_id} film={f} />)}
        </div>
    )
}