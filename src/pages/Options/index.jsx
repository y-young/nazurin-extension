import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Options from './Options';

render(<Options />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
