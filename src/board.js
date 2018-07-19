import React from 'react';
import './board.css';
import 'tachyons';
import Ship1 from './ship1';
import Ship2 from './ship2';
import Ship3 from './ship3';

const style1 = 'flex justify-center items-end mb2 ' 
const style2 = 'flex justify-end items-center mr3'
const borderStyle = 'ba b--light-silver white pa0 mr0';
const centeredDot = 'ba b--light-silver pa0 mr0 flex justify-center items-center light-silver';
const redBorder = 'f2 ba b--red pa0 mr0 flex justify-center items-center red'

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {

            A1:['empty','intact'],B1:['empty','intact'],C1:['empty','intact'],D1:['empty','intact'],
            A2:['empty','intact'],B2:['empty','intact'],C2:['empty','intact'],D2:['empty','intact'],
            A3:['empty','intact'],B3:['empty','intact'],C3:['empty','intact'],D3:['empty','intact'],
            A4:['empty','intact'],B4:['empty','intact'],C4:['empty','intact'],D4:['empty','intact']
            ,
            ship1:false,
            ship1isUsed:false,
            ship2:false,
            ship2isUsed:false,
            ship3:false,
            ship3isUsed:false,
        }
    }
    

    handleAddShipToBoard = (e) => {
        if(this.state.ship1 === true){
            
            //sending a new state with 'busy' when clicked
            const coord = e.target.id; 
            const current = this.state[coord]; 
            let newVal = current.slice(); 
            newVal[0] = 'busy';
            this.setState({...this.state, [coord]: newVal } );

            //deactivate ship1 so you can't add it again
            this.setState({ship1:false})
            this.setState({ship1isUsed:true})

        } 

        else if(this.state.ship2 === true){

            //sending a new state with 'busy' when clicked
            const coord = e.target.id; 
            const current = this.state[coord]; 
            let newVal = current.slice(); 
            newVal[0] = 'busy';
            this.setState({...this.state, [coord]: newVal } );

            //deactivate ship2 so you can't add it again
            this.setState({ship2:false})
            this.setState({ship2isUsed:true})

        } 

        else if(this.state.ship3 === true){
            //sending a new state with 'busy' when clicked
            const coord = e.target.id; 
            const current = this.state[coord]; 
            let newVal = current.slice(); 
            newVal[0] = 'busy';
            this.setState({...this.state, [coord]: newVal } );

            //deactivate ship3 so you can't add it again
            this.setState({ship3:false})
            this.setState({ship3isUsed:true})
        } 

    }

    handleClickShip1 = () => {
        //make ship1 appendable to the board
        if(this.state.ship1isUsed===false){
            this.setState({ship1:true})
            this.setState({ship2:false})
            this.setState({ship3:false})
        }
    }

    handleClickShip2 = () => {
        //make ship2 appendable to the board
        if(this.state.ship2isUsed===false){
            this.setState({ship2:true})
            this.setState({ship1:false})
            this.setState({ship3:false})
        }
    }
    
    handleClickShip3 = () => {
        //make ship3 appendable to the board
        if(this.state.ship3isUsed===false){
            this.setState({ship3:true})
            this.setState({ship1:false})
            this.setState({ship2:false})
        }
    }

    computerAttack = (e) => {

        console.log('COMPUTER ATTACKED');

        //random number 1 to 4
        const randomNumber = Math.floor(Math.random() * 4) + 1; 

        //random character A to D
        const randomAtoD = () => {
            switch(Math.floor(Math.random() * 4) + 1) {
            case 1:
                return 'A';
            case 2:
                return 'B';
            case 3:
                return 'C';
            case 4: 
                return 'D';
            default:    
            }
        }
        
        const randomCoord = (randomAtoD() + randomNumber).toString();
        const current = this.state[randomCoord];
        const element = document.querySelector('#'+randomCoord);
        console.log(element,'logging selected element')

        if(element.getAttribute('status').includes('hit') === false) {
        
            let newVal = current.slice(); 
            newVal[1] = 'hit';
            this.setState({...this.state, [randomCoord]: newVal } );

            //change style and add dot when attacking the random coord
            
            if (element.getAttribute('status') === "empty,intact" ){
                element.className = centeredDot;
                element.textContent = "⬤";
            }

            if (element.getAttribute('status') === "busy,intact" ){
                element.className = redBorder;
                element.textContent = "X";
            }

        } else {
            this.computerAttack(); //using recursion so it always gets a intact coord
        }
        
    }

    
    handleMouseEnter = (e) => {

        const style = e.target.style;

        if(this.state.ship1===true && style.borderColor !== 'red'
         && style.borderColor !== 'green'){
            style.borderColor='blue';

        } else if (this.state.ship2===true && style.borderColor !== 'red'
        && style.borderColor !== 'blue'){
            style.borderColor='green';

        } else if (this.state.ship3===true && style.borderColor !== 'green'
        && style.borderColor !== 'blue'){
            style.borderColor='red';
        }
    }
    handleMouseLeave = (e) => {

        const style = e.target.style;

        if(this.state.ship1===true && style.borderColor !== 'red'
         && style.borderColor !== 'green'){
            style.borderColor='#AAAAAA';

        } else if (this.state.ship2===true && style.borderColor !== 'red'
        && style.borderColor !== 'blue'){
            style.borderColor='#AAAAAA'

        } else if (this.state.ship3===true && style.borderColor !== 'green'
        && style.borderColor !== 'blue'){
            style.borderColor='#AAAAAA'
        }
    }
    

    render() {
        
        //passing the computerAttack method to the computerBoard component
        //should've used Redux
        window.state = this.state;
        window.state.computerAttack = this.computerAttack;
       
        return (

        <div id="PlayerBoardAndShips">

        <div id="PlayerBoardGrid" className="container w4 center ">
            
            <div className={style1}></div>
            <div className={style1}>A</div>
            <div className={style1}>B</div>
            <div className={style1}>C</div>
            <div className={style1}>D</div>
            

            {/*------FIRST LINE-----------*/}
            <div className={style2}>1</div>

            <div id="A1" 
            status={this.state.A1}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}
            >A1</div>
       
            <div id="B1" status={this.state.B1}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>B1</div>

            <div id="C1" status={this.state.C1}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>C1</div>

            <div id="D1" status={this.state.D1}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>D1</div>


            {/*------SECOND LINE-----------*/}
            <div className={style2}>2</div>

            <div id="A2" status={this.state.A2}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>A2</div>

            <div id="B2" status={this.state.B2}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>B2</div>

            <div id="C2" status={this.state.C2}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>C2</div>

            <div id="D2" status={this.state.D2}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>D2</div>

            {/*------THIRD LINE-----------*/}
            <div className={style2}>3</div>

            <div id="A3" status={this.state.A3}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>A3</div>

            <div id="B3" status={this.state.B3}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>B3</div>

            <div id="C3" status={this.state.C3}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>C3</div>

            <div id="D3" status={this.state.D3}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>D3</div>

            {/*------FOURTH LINE-----------*/}
            <div className={style2}>4</div>
            
            <div id="A4" status={this.state.A4}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>A4</div>

            <div id="B4" status={this.state.B4}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>B4</div>

            <div id="C4" status={this.state.C4}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>C4</div>

            <div id="D4" status={this.state.D4}
            className={borderStyle} 
            onMouseEnter={this.handleMouseEnter} 
            onMouseLeave={this.handleMouseLeave}
            onClick={(e) => { this.handleAddShipToBoard(e); }}>D4</div>
                
            </div>                
            <p className="text"> Your grid </p>
            <div id="Ships" className='flex justify-end'> 
                <Ship1 activeShip={this.handleClickShip1}/>
                <Ship2 activeShip={this.handleClickShip2}/>
                <Ship3 activeShip={this.handleClickShip3}/>
            </div>
            <p className="text"> Click and place your ships </p>
        
        </div>
        )
    }
}


export default Board;