import React, { useState } from 'react'
import './App.css'


function Start (props){
  return (
    <div className='consoleItem'>
      <div>{props.running ? "Running" : "Stopped"}</div>
      <button 
        className='button startCircle'
        onClick={props.onClick}
        >
        &#9199;
      </button>
    </div>
  )  
}

class Randomize extends React.Component {
  render() {
    
    return (
      <div className='consoleItem'>
        <div>
          {this.props.chance}%
          <input className='slider' type="range" step="1" min="1" max="99" defaultValue={this.props.chance} 
          onChange={(com, val)=>this.props.onClick("chance",event.target.value)}/>
        </div>
        <button 
          className="button"
          onClick={(com, val)=>this.props.onClick("random", this.props.chance)}
        >
        Randomize
      </button>
      </div>
    )
  }
}

function Clear (props){
  return (
    <div className='consoleItem'>
      <button 
      className="button"
      onClick={props.onClick}>
      Clear
      </button>
    </div>
  )
}
class Size extends React.Component {
  render() {
    
    return (
      <div className='consoleItem'>
        <button className='button' onClick={(com, val)=>this.props.onClick("row",1)}>Add row</button>
        <button className='button' onClick={(com, val)=>this.props.onClick("row",-1)}>Remove row</button>
        <button className='button' onClick={(com, val)=>this.props.onClick("column",1)}>Add column</button>
        <button className='button' onClick={(com, val)=>this.props.onClick("column",-1)}>Remove column</button>
      </div>
    )
  }
}
class Speed extends React.Component {

  render() {
    return (
      <div className='consoleItem'>
      Speed:
      <input className='input' type="number" step="1"min="1" max="10000" defaultValue={this.props.speed} 
            onChange={(com, val)=>this.props.onClick("speed",event.target.value)}/>
      </div>
    )
  }
}
class Console extends React.Component {

    render() {
      return (
        <div className="console">
          <Start running={this.props.running}onClick={()=>this.props.onClick("start")}/>
          <Randomize 
            onClick={(com, val)=>this.props.onClick(com, val)}
            chance={this.props.chance}
          />
          <Clear onClick={()=>this.props.onClick("clear")}/>
          <Speed speed={this.props.speed} onClick={(com, val)=>this.props.onClick(com, val)}/>
          <Size onClick={(com, val)=>this.props.onClick(com, val)}/>
          <div className='consoleItem'>
          
          Cycles: {this.props.cycles}
          </div>
        </div>
        
      )
    }
  }
  



export default Console;