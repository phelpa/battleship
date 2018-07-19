import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import BattleShipGame from './battleShipGame';

ReactDOM.render(<BattleShipGame />, document.getElementById('root'));
registerServiceWorker();

