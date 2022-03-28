import React, { useState } from 'react'
import './App.css'
import random from './random.svg'
import playpause from './playpause.svg'
import addRow from './addRow.svg'
import removeRow from './removeRow.svg'
import addColumn from './addColumn.svg'
import removeColumn from './removeColumn.svg'

function Start (props){
  return (
    <div className='consoleItem'>
      <div>{props.running ? "Running" : "Stopped"}</div>
      <button 
        className='button startCircle'
        onClick={props.onClick}
        >
       <img src={playpause} className='svg' />
      </button>
    </div>
  )  
}

class Randomize extends React.Component {
  render() {
    const show=this.props.showSettings;
    return (
      <div className={`consoleItem ${show ? 'hide' : ''}`}>
        <div>
          Populate {this.props.chance}%
          <input className='slider' type="range" step="1" min="1" max="99" defaultValue={this.props.chance} 
          onChange={(com, val)=>this.props.onClick("chance",event.target.value)}/>
        </div>
        <button 
          className="button"
          onClick={(com, val)=>this.props.onClick("random", this.props.chance)}
        >
        <img src={random}  className='svg'/>
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
    const show=this.props.showSettings;
    return (
      <div className={`consoleItem ${show ? 'hide' : ''}`}>
        <button className='button' onClick={(com, val)=>this.props.onClick("row",1)}><img src={addRow} className='svg' /></button>
        <button className='button' onClick={(com, val)=>this.props.onClick("row",-1)}><img src={removeRow} className='svg' /></button>
        <button className='button' onClick={(com, val)=>this.props.onClick("column",1)}><img src={addColumn} className='svg' /></button>
        <button className='button' onClick={(com, val)=>this.props.onClick("column",-1)}><img src={removeColumn} className='svg' /></button>
      </div>
    )
  }
}
class Speed extends React.Component {

  render() {
    const show=this.props.showSettings;
    return (
      <div className={`consoleItem ${show ? 'hide' : ''}`}>
      Delay:
      <input className='input' type="number" step="1"min="1" max="10000" defaultValue={this.props.speed} 
            onChange={(com, val)=>this.props.onClick("speed",event.target.value)}/>
      </div>
    )
  }
}
class Console extends React.Component {

    render() {
      const show=this.props.showSettings
      return (
        <div className={`console ${show ? 'collapsed' : ''}`}>
          <button className='button accordion' onClick={()=>this.props.toggleMenu()}>☰</button>
          <Start running={this.props.running} onClick={()=>this.props.onClick("start")}/>
          <Clear onClick={()=>this.props.onClick("clear")}/>
          <div className='consoleItem'>
          
          Cycles: {this.props.cycles}
          </div>
          <Randomize 
            onClick={(com, val)=>this.props.onClick(com, val)}
            chance={this.props.chance}
            showSettings={show}
          />
          <Speed 
            speed={this.props.speed} 
            onClick={(com, val)=>this.props.onClick(com, val)} 
            showSettings={show}
          />
          <Size onClick={(com, val)=>this.props.onClick(com, val)} showSettings={show}/>
          
        </div>
        
      )
    }
  }
  



export default Console;