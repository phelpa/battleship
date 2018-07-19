import React from 'react';

const PlayButton = ({click,name}) => {
 
    return (
        <div id="PlayButton" className="ph3 mt4">
            <a onClick={click} className="f6 link dim br1 ba ph3 pv2 mb2 dib black" href="#0">{name}</a>
        </div>
    )
  
}
export default PlayButton;