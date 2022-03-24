import React from 'react'
import './App.css'
import Console from './Console.jsx'

class Square extends React.Component {
  
  
  render () {
    const grid=this.props.grid;
    const x=this.props.pos[0];
    const y=this.props.pos[1];
    const pos=this.props.pos;
    return (
      <td 
    className={`square ${grid[y][x] ? 'alive': ''}`}
    onClick={() =>this.props.onClick(pos)}
    >
    </td>
    )
  }
}

class Board extends React.Component {

  render() {
    const X=this.props.grid[0].length;
    const Y=this.props.grid.length;
    let rows=[];
    for (let i = 0; i < Y; i++) {
      const cells=[];
      for (let j=0;j < X; j++) {
        let pos=[j, i]
        cells.push(<Square 
          key={pos.toString()}
          grid={this.props.grid}
          pos={pos}
          onClick={() =>this.props.onClick(pos)}
        />);
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }
    return <table><tbody>{rows}</tbody></table>;
    
  }
}


class Conway extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      grid: Array(15).fill().map(()=> new Array(20).fill(false)),
      cycles: 0,
      running: false,
      speed: 500,
      chance: 50,
      showPopup: false
    }
  }

  onClick(pos) {
      if (this.state.running==true) {return}
      //console.log(pos)
      const grid=this.state.grid;
      const x=pos[0]
      const y=pos[1]
      grid[y][x]= !grid[y][x]
      this.setState({grid: grid})
  }

  handleCommands(com, val) { //dodaj przypadek dla suwaka
    if(com==="start") {
      const running= !this.state.running;
      let cycle=this.state.cycles
      if (running) {cycle=0}
      //console.log(running)
      this.setState({
      running: running,
      cycles: cycle
      },
      ()=>this.handleRunning()
      );
    }
    if(com==="random" && !this.state.running)  {
      const X=this.state.grid[0].length
      const Y=this.state.grid.length
      let temp= Array(Y).fill().map(()=> new Array(X).fill(false))
      for(let i=0; i<Y; i++) {
        for (let j=0; j<X; j++) {
          const rand=Math.floor(Math.random() * 100);
          if(rand<val) {temp[i][j]=true}
        }
      }
      this.setState({
        grid: temp
      })
    }
    if(com==="clear" && !this.state.running) { //set all squares to false (only if the game's not running)
      const X=this.state.grid[0].length
      const Y=this.state.grid.length
      let temp= Array(Y).fill().map(()=> new Array(X).fill(false))
      this.setState({
        grid: temp,
        cycles: 0
      })
    }
    if(com==="chance") { //propability
      this.setState({chance: val})
    }
    if(com==="speed") { //delay
      this.setState({speed: val})
    }
    if(com==="row") { //X
      let temp=this.state.grid
      if(val<0) {
        for(let i=0;i<this.state.grid.length;i++) {temp[i].pop();}
      }
      else {
        for(let i=0;i<this.state.grid.length;i++) { temp[i].push(false)}}
      this.setState({grid: temp})
    }
    if (com==="column") { //Y
      let temp=this.state.grid
      if (val<0) {
        temp.pop();
      }
      else {
        temp.push(new Array(this.state.grid[0].length).fill(false))
      }
      this.setState({grid: temp})
    }
  }

  handleRunning=() => {
      const loop=()=> {
          const cycles=this.state.cycles+1
          this.setState({cycles: cycles})
          const grid=this.state.grid;
          const X=grid[0].length;
          const Y=grid.length;
          const next=conwayCycle(grid)
          //console.log(next)
          this.setState({grid: next})
          const speed= this.state.speed
        if (this.state.running===true) {setTimeout(loop, speed);}
      }
      if(this.state.running) {loop();}
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <div className='game'>
        <div >
          <button className='button popupButton' onClick={()=>this.togglePopup()}>i</button>
          <Console 
            onClick={(com, val)=> this.handleCommands(com, val)}
            running={this.state.running}
            cycles={this.state.cycles}
            speed={this.state.speed}
            chance={this.state.chance}
          />
        </div>
        <div className="board">
          <Board 
            running={this.state.running}
            grid={this.state.grid}
            onClick={(pos)=> this.onClick(pos)}
          />
          {this.state.showPopup ? 
            <Popup
            closePopup={()=>this.togglePopup()} />
            : null
          }
        </div>
      </div>
    );
  }
}

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className='popup-inner'>
          <h1><a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Conway's Game of Life</a></h1>

          <p>         
          Main features:
          <ul>
            <li>- start and pause the simulation</li>
            <li>- change the state of a cell by manually clicking on the grid</li>
            <li>- automatically populate the board with given percentage,</li>
            <li>- clear button</li>
            <li>- changeable speed of the cycles (works during the simulation) [input in ms]</li>
            <li>- dynamic size of the cell grid</li>
            <li>- cycle counter.</li>
          </ul>
          Roadmap:
          <ul>
            <li>- mobile version,</li>
            <li>- scale the grid based on the size of the display</li>
            <li>- friendlier UI</li>
          </ul>
          App will be updated every Monday
          </p>
          <a href='https://github.com/Kotzmik/code-coffer'>Source Code</a>
          <button className='closeButton button' onClick={()=>this.props.closePopup()}>x</button>
        </div>
      </div>
    )
  }
}
export default Conway

function conwayCycle(grid) {
  const X=grid[0].length
  const Y=grid.length
  let temp= Array(Y).fill().map(()=> new Array(X).fill(false))
  for (let i=0; i<Y; i++) {
    let minY=i-1
    if(minY<0) {minY=0}
    let maxY=i+1
    if (maxY>Y) {maxY=Y}
    for (let j=0; j<X; j++) {
      let counter=0
      let minX=j-1
      if(minX<0) {minX=0}
      let maxX=j+1
      if (maxX>X) {maxX=X}
      let slice=grid.slice(minY, maxY+1).map(m=> m.slice(minX, maxX+1))
      for(let k=0; k<slice.length; k++) {
        for(let l=0; l<slice[0].length; l++) {
          if(slice[k][l]) {counter++}
        }
      }
      if (grid[i][j]) {counter--}
      if (counter==3) {temp[i][j]=true}
      else if(counter==2 && grid[i][j]) {temp[i][j]=true}
    }
  }
  return temp
}