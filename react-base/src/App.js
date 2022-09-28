
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

// function 方式.
// 每次更新状态:当前值（的地址）和setState里的初始arg不同，都要重render整个函数
import { useState, useEffect } from 'react';

const App = () => {
  const [searchField, setSearchFiel] = useState(''); // 它存俩值 [value, setValue()]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  // useEffect两个参数：回调函数，依赖数组。如果依赖数组里的任意一个值改变，就rerend回调函数。（如果只希望回调函数rende一次就给它空list）
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, [])

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchFiel(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
    </div>
  )
}

// class 组件 ---------------------------------------------
// import { Component } from 'react';

// class App extends Component {
// // 运行顺序：构造函数永远第一，构造函数：初始化对象
// // 2. render 组件初始UI
// // 3. 需要api时，就call 在mount lifecycle的组件
// // 2. 一旦setState 被call，就rerender2
//   constructor(){
//     super();
//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   // lifecycle methods 一旦拿到数据就尽快渲染
//   componentDidMount() { // 异步
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => 
//         this.setState(
//           () => { return { monsters: users}; }
//         )
//       );
//   }

//   onSearchChange = (event) => { // 本来是匿名函数
//     console.log(event.target.value);
//     //const searchString = event.target.value.toLocaleLowerCase();
//     const searchField = event.target.value.toLocaleLowerCase();
//     // filter like map, is a list,每个元素从左到右开始回调。返回一个新list
//     // const filteredMonsters = this.state.monsters.filter((monster) => {
//     //   return monster.name.toLocaleLowerCase().includes(searchString);
//     // });
//     this.setState(() => {
//       // return { monsters:filteredMonsters};
//       return {searchField};
//     })
//   }

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         {/* <input 
//           className='ssearch-box' 
//           type='search' 
//           placeholder='search monsters' 
//           onChange={onSearchChange}/> */}
//           {/* {filteredMonsters.map((qiqi) => {
//           //{this.state.monsters.map((qiqi) => { //一个数组循环 .map 返回
//             return ( // key的作用是，rerender的时候，精准地找到该值局部重渲染
//               <div key={qiqi.id}> 
//                 <h1>{qiqi.name}</h1>
//               </div>
//               ); // 这里传入的key必须是unique
//             })
//           } */}
//             <SearchBox
//                 className='monsters-search-box'
//                 onChangeHandler={onSearchChange} 
//                 placeholder='search monster'
//             />
//             <CardList monsters={filteredMonsters}/> 
//       </div>
//     );
//   }
// }

export default App;

/////////////////////////////////////////////////////////////////
// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       name: {fname:'Nima', lname:'xi'},
//       company: 'ztm',
//     };
//   }
//   render() {
//     return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hi {this.state.name.fname} {this.state.name.lname}, I work at {this.state.company}</p>
//         <button
//           // 这样传递的值是异步的，所以当button被click之后，log里的值有可能还未被更新
//           // onClick={()=>{
//           //   this.setState({name: {fname:'cuicui',lname:'si'}})  // shallow merge 浅合并
//           //   console.log(this.state) // 在浏览器的console里打一个log
//           //}
//           onClick={() => {
//             this.setState(
//               () => {
//                 return {name: {fname:'cuicui',lname:'si'}};
//               },
//               () => { // 回调函数[可选]，只有当前一个值更新了才会调用这里
//                 console.log(this.state);
//               }
//             );
//           }
//           }
//         >
//           change name</button>
//       </header>
//     </div>
//     );
//   }
// }
// export default App;
