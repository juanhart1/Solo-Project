//this is my App component that I'm hooking into the index.html file at whatever element has an id of 'root'
//this is us importing the React.Component from the React module
import React, { Component } from 'react';
//this is us importing the render method from the react-dom module
//this is what adds react component to the DOM
import { render } from 'react-dom';
//created a class named App that extends the React.Component
class App extends Component {
    //constructor is where we call the constructor for the component before it is actually mounted
    //if you don't initialize state or bind methods, no need for invoking the constructor
    constructor(props){
        //super is the constructor function of the parent component
        //this should be invoked with props as well
        //this is what makes this.props available in the constructor scope
        super(props);
        //this is where I create state to have a property of city and is initially an empty string
        this.state = {city: ''}
    }
    //this is where I render the React component inside of a div
    //React component has to have a parent element it sits insider before being attached to the DOM
    render() {
        return (
            <div>
                <div>Hello World!!!</div>
                <input name="city" type="text" placeholder="city"></input>
            </div>
        )
    }
}
//this is where I hook this App component into the index.html file at whatever element has an id of 'root'
render(<App />, document.getElementById('root'));