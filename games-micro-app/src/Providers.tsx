import React, { FC } from 'react';
import { BrowserRouter } from "react-router-dom";

export const Providers: FC = ({ children }) => {
  return (
    <BrowserRouter>{children}</BrowserRouter>
  );
};
