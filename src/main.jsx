import React from 'react';
import ReactDOM from 'react-dom/client';

import Game from './components/game';

import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Game />
	</React.StrictMode>,
)
