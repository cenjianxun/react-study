
import './card-list.styles.css'
import Card from "../card/card.component";

//const { monsters } = props;
const CardList = ({ monsters }) => (
    <div className='card-list'>
        {monsters.map((monster)=>{
            return <Card monster={monster} />;
        })}
    </div>
);
 

// class 组件 -----------------------------------
// import { Component } from "react";
// class CardList extends Component {
//     // components render有两种情况，setstate calls 和props update时
//     render() {
//         const { monsters } = this.props
//         // 同一个组件只能返回一个<></> 不能有多个同级<></>
//         return(
//             <div className='card-list'>
//                 { monsters.map((monster) =>{
//                     return (
//                         <Card monster={monster}/>
//                     );
//                 })}
//             </div>
//         )
//     }
// }

export default CardList;