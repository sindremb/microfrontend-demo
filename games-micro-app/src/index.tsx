import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Providers } from './Providers';

const mountApp = (elementId: string, basePath: string) => ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App basePath={basePath} />
    </Providers>
  </React.StrictMode>,
  document.getElementById(elementId)
)

const unmountApp = (elementId: string) => {
  const container = document.getElementById(elementId);
  if (container) ReactDOM.unmountComponentAtNode(container);
};

// Add mount / unmount functions to window object for use from container app
declare const window: any;
window.mountGames = mountApp;
window.unmountGames = unmountApp;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (document.getElementById('games-selfhost-root')) {
  mountApp('games-selfhost-root', '/');
}
