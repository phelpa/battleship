import React from 'react';

const borderStyle1 = 'ba b--dark-blue white h3 w3 pa0 mr3 mt3';
const shipClickedStyle1 = 'ba b--light-blue white h3 w3 pa0 mr3 mt3';

class Ship1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeStyle1: borderStyle1,
        }    
    }
    handleClick = () => {
        this.setState({
            activeStyle1:shipClickedStyle1,
        })
    }

    render(){
    return (
        <div className="flex justify-center">
            <div className={this.state.activeStyle1} onClick={() => {
                this.handleClick();
                this.props.activeShip();
                }}>
                
            </div>
        </div>
    )
  }
}
export default Ship1;
