import React, { FC, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Cats } from './Cats';
import { Dogs } from './Dogs';

const App: FC<{ basePath: string | null }> = ({ basePath }) => {
  const makeLocalPath = useCallback((partialPath: string) => {
    return `${basePath}${partialPath}`;
  }, [basePath]);
  
  return (
    <div>
      <h2>Pets</h2>
      <ul>
        <li>
          <Link to={makeLocalPath('cats')}>Cats</Link>
        </li>
        <li>
          <Link to={makeLocalPath('dogs')}>Dogs</Link>
        </li>
      </ul>
      <Routes>
        <Route path={makeLocalPath('cats')} element={<Cats />} />
        <Route path={makeLocalPath('dogs')} element={<Dogs />} />
        <Route path={makeLocalPath('')} element={<p>Select a catogory above to start</p>} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
