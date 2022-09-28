
import './card.styles.css';

const Card = ({monster}) => {
    const {id, name, email} = monster;
    return (
        <div className='card-container' key={id}>
            <img 
                alt={`moster ${name}`} 
                src={`https://robohash.org/${id}?set=set2&size=180x180`}
            />
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    )
}


// class 组件 -----------------------------------
// import { Component } from "react";
// class Card extends Component {
//     render() {
//         const {id, name, email} = this.props.monster;
//         return (
//             <div className='card-container' key={id}>
//                 <img 
//                     alt={`moster ${name}`} 
//                     src={`https://robohash.org/${id}?set=set2&size=180x180`}
//                 />
//                 <h2>{name}</h2>
//                 <p>{email}</p>
//             </div>
//         )
//     }
// }

export default Card;