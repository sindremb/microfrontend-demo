import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Routes,
  // unstable_HistoryRouter as HistoryRouter,
  BrowserRouter
} from "react-router-dom";
import { Microfrontend, MicrofrontendDefinition } from './Microfrontend';

const microfrontends: MicrofrontendDefinition[] = [
  {
    name: 'Games',
    host: 'http://localhost:3001',
    basePath: '/games/'
  },
  {
    name: 'Pets',
    host: 'http://localhost:3002',
    basePath: '/pets/',
  }
];

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Container app</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {microfrontends.map((x) => (
              <li key={x.basePath}>
                <Link to={x.basePath}>{x.name}</Link>
              </li>
            ))}
          </ul>
        </header>
        <Routes>
          {microfrontends.map((x) => (
            <Route
              key={x.basePath}
              path={`${x.basePath}*`}
              element={<Microfrontend {...x} />}
            />
          ))}
          <Route path="*" element={<p>Welcome to the place of knowledge!</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
