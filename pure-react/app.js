const Person = props => {
    return React.createElement('div', {key:0}, [
        React.createElement('h1', {key:1}, props.name),
        React.createElement('p', {key:2}, props.occupation),
    ])
}
const App = () => {
    return React.createElement('div', {}, [
        React.createElement('h1', {className: 'title', key:3}, 'React IS rendered'),
        React.createElement(Person, {name: 'yihua', occupation: 'doctor', key:4}, null),
        React.createElement(Person, {name: 'Joey', occupation: 'actor', key:5}, null),
        React.createElement(Person, {name: 'Ross', occupation: 'teacher', key:6}, null),
    ]);
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App))