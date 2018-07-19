import React from 'react';
import './computerBoard.css';

const style1 = 'flex justify-center items-end mb2 ' 
const style2 = 'flex justify-end items-center mr3'

const borderStyle = 'hovering ba b--light-silver white pa0 mr0';
const centeredDot = 'ba b--light-silver pa0 mr0 flex justify-center items-center light-silver';
const redBorder = 'f2 ba b--red pa0 mr0 flex justify-center items-center red'

class ComputerBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            A1c:['empty','intact'],B1c:['empty','intact'],C1c:['empty','intact'],D1c:['empty','intact'],
            A2c:['empty','intact'],B2c:['empty','intact'],C2c:['empty','intact'],D2c:['empty','intact'],
            A3c:['empty','intact'],B3c:['empty','intact'],C3c:['empty','intact'],D3c:['empty','intact'],
            A4c:['empty','intact'],B4c:['empty','intact'],C4c:['empty','intact'],D4c:['empty','intact']
            
        }
    }

    componentDidMount(){

        const onlyCoords =
        ['A1c','B1c','C1c','D1c',
        'A2c','B2c','C2c','D2c',
        'A3c','B3c','C3c','D3c',
        'A4c','B4c','C4c','D4c']; 

        //get three random elements from a list
        function getRandom(arr, n) {
            var result = new Array(n),
                len = arr.length,
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;
        }
       
        const randomCoords = getRandom(onlyCoords,3);
        const busy = ['busy','intact'];
        
        //makes the setState sync so it update state automatically
        //setting three random coords to 'busy'
        this.setState((prevState, props) => ({
            ...prevState, [randomCoords[0]]: busy
        }));

        this.setState((prevState, props) => ({
            ...prevState, [randomCoords[1]]: busy
        }));

        this.setState((prevState, props) => ({
            ...prevState, [randomCoords[2]]: busy
        }));
 
    }

    handleClick = (e) => {
       
        if(this.props.playStatus === true){
            
            //sending a new state with 'hit' when clicked
            const coord = e.target.id; 
            console.log(coord, 'logging ID');
            const current = this.state[coord];
            console.log(current, 'logging current'); 
            let newVal = current.slice(); 
            newVal[1] = 'hit';
            this.setState({...this.state, [coord]: newVal } );

            //change style and add dot when attacking the coord
            const elementClicked = e.target;
            if (elementClicked.getAttribute('status') === "empty,intact" ){
                elementClicked.className = centeredDot;
                elementClicked.textContent = "⬤";
            }

            if (elementClicked.getAttribute('status') === "busy,intact" ){
                elementClicked.className = redBorder;
                elementClicked.textContent = "X";
            }
            
            //pass turn to the computer
            this.props.activeTurn();

            //make a attack to a random coord at the playerBoard
            window.state.computerAttack();
            

        }
    }
 
    render() {
        
        const coordNumber = this.state;
        window.compState = this.state;
        console.log(window.compState,'LOGGING COMP STATE');
       
        return (
        <div>    
        <div id="ComputerBoard" className="containerComp w4 center">

            <div></div>
            <div className={style1}>A</div>
            <div className={style1}>B</div>
            <div className={style1}>C</div>
            <div className={style1}>D</div>
            
            {/*------FIRST LINE-----------*/}
            <div className={style2}>1</div>

            <div id="A1c" 
            status={coordNumber.A1c} 
            onClick={this.handleClick} 
            className={borderStyle}>A1</div>

            <div id="B1c" 
            status={coordNumber.B1c} 
            onClick={this.handleClick} 
            className={borderStyle}>B1</div>

            <div id="C1c" 
            status={coordNumber.C1c} 
            onClick={this.handleClick} 
            className={borderStyle}>C1</div>
            
            <div id="D1c" 
            status={coordNumber.D1c} 
            onClick={this.handleClick} 
            className={borderStyle}>D1</div>

            {/*------SECOND LINE-----------*/}
            <div className={style2}>2</div>

            <div id="A2c" 
            status={coordNumber.A2c} 
            onClick={this.handleClick} 
            className={borderStyle}>A2</div>

            <div id="B2c" 
            status={coordNumber.B2c} 
            onClick={this.handleClick} 
            className={borderStyle}>B2</div>

            <div id="C2c" 
            status={coordNumber.C2c} 
            onClick={this.handleClick} 
            className={borderStyle}>C2</div>

            <div id="D2c" 
            status={coordNumber.D2c} 
            onClick={this.handleClick} 
            className={borderStyle}>D2</div>

            {/*------THIRD LINE-----------*/}
            <div className={style2}>3</div>

            <div id="A3c" 
            status={coordNumber.A3c} 
            onClick={this.handleClick} 
            className={borderStyle}>A3</div>

            <div id="B3c" 
            status={coordNumber.B3c} 
            onClick={this.handleClick}
            xunda={'pereira'}
            className={borderStyle}>B3</div>

            <div id="C3c" 
            status={coordNumber.C3c} 
            onClick={this.handleClick} 
            className={borderStyle}>C3</div>

            <div id="D3c" 
            status={coordNumber.D3c} 
            onClick={this.handleClick} 
            className={borderStyle}>D3</div>

            {/*------FOURTH LINE-----------*/}
            <div className={style2}>4</div>
            
            <div id="A4c" 
            status={coordNumber.A4c} 
            onClick={this.handleClick} 
            className={borderStyle}>A4</div>

            <div id="B4c" 
            status={coordNumber.B4c} 
            onClick={this.handleClick} 
            className={borderStyle}>B4</div>

            <div id="C4c" 
            status={coordNumber.C4c} 
            onClick={this.handleClick} 
            className={borderStyle}>C4</div>

            <div id="D4c" 
            status={coordNumber.D4c} 
            onClick={this.handleClick} 
            className={borderStyle}>D4</div>

            
        </div>
        <p className="text"> Computer's grid </p>
        </div>
        )
    }
}


export default ComputerBoard;