import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      articles:[]
    }
    this.handleButtonclick = this.handleButtonclick.bind(this);
    this.saveButtonclick = this.saveButtonclick.bind(this);
  }
  //"inside of axios call PROBLEM"
  handleButtonclick(){
    console.log("clicked")
    let self = this
    axios.get("/scrape").then(function(thingsFrombackend){
      console.log("things from backend", thingsFrombackend)
      console.log("this is our first state", self.state)
      self.setState({articles: thingsFrombackend.data})
    })
  }
  saveButtonclick(title, link){
    console.log("this is the title/link", title, link)
    axios.post("/save",{title: title, link: link}).then(function(thingsFrombackend){
      console.log("things from backend", thingsFrombackend)
    })
  }
  render() {
    console.log("this is our state", this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.handleButtonclick}> CLICK ME </button>
        {this.state.articles.map((article)=>{
          return (
            <div>
              <h1>{article.title}</h1>
              <a href={article.link}>click here</a>
              <button onClick={()=>{this.saveButtonclick(article.title, article.link)}}>SAVE!!!!!</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
