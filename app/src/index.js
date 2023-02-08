import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider }  from "react-router-dom";

//pages
import App from './App';
import Register from "./pages/register";
import Login from "./pages/login";
import Panel from "./pages/panel";


const router = createBrowserRouter([


  
  {
    path: '/',
    element: <App />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/panel',
    element: <Panel />
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

