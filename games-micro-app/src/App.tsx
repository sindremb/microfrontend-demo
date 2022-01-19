import React, { FC, useCallback } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { BoardGames } from './BoardGames';
import { PcGames } from './PcGames';

const App: FC<{ basePath: string | null }> = ({ basePath }) => {
  const makeLocalPath = useCallback((partialPath: string) => {
    return `${basePath}${partialPath}`;
  }, [basePath]);
  
  return (
    <div>
      <h2>Games</h2>
      <ul>
        <li>
          <Link to={makeLocalPath('boardgames')}>Boardgames</Link>
        </li>
        <li>
          <Link to={makeLocalPath('pcgames')}>PC-games</Link>
        </li>
      </ul>
      <Routes>
        <Route path={makeLocalPath('boardgames')} element={<BoardGames />} />
        <Route path={makeLocalPath('pcgames')} element={<PcGames />} />
        <Route path={makeLocalPath('')} element={<p>Select a catogory above to start</p>} />
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
