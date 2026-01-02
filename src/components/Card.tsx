import * as React from 'react'

interface CardProps {
    path: string, 
    title: string
}

const Card:React.FC<CardProps> = ({path, title}: CardProps) => {
    return (
        <div className="col mb-5">
            <div className="card" style={{width: "18rem"}}>
                <img src={path} className="card-img-top" alt={title}></img>
                <h5 className="text-center mt-1">{title}</h5>
            </div>
        </div>
    )
}

export default Card;