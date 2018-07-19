import React, { Component } from 'react';
import './battleShipGame.css';
import 'tachyons';
import Board from './board';
import PlayButton from './playButton';
import ComputerBoard from './computerBoard';

class BattleShipGame extends Component {
    constructor(){
        super()
        this.state = { 
            play:false,
        }
    }

    handlePlayClick = () => {
        this.setState({play:true})
    }
   
    turnChange = () => {
        this.setState({turn:'computer'})
    }

    render(){
        window.play = this.state;
        //console.log(window.play,'LOGGING PLAY STATE');
        return (
            <div id="body">

                <div id="AllComponents">
                <p id="Title" className="flex justify-center b f4"> BattleShip </p>
                    <Board playStatus={this.state.play} turn={this.state.turn} />
                    <ComputerBoard playStatus={this.state.play} activeTurn={this.turnChange}/>      
                    <PlayButton click={this.handlePlayClick} name="Play"/>
                    
                </div>
                
            </div>
        )       
    }
}

export default BattleShipGame;