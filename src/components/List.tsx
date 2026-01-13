import Card from "./Card"
import type { Media } from "./Types";
import * as React from 'react'

const List:React.FC<Media> = ({items}:Media[]) => { // !
    
    return (
        <div className="row mt-3">
            {items.map( (item:Media) => {
                return (
                    <div key={item.createdAt} className="col-4 mb-5">
                        <Card {...item} />
                    </div>
                );
            })}
        </div>
    )
}
export default List;