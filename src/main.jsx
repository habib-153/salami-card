import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import SalamiCard from './Component/SalamiCard.jsx';
import ErrorElement from './Component/ErrorElement.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <ErrorElement />
  },
  {
    path: '/salamiCard',
    element: <SalamiCard />,
    errorElement: <ErrorElement />
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router}/>
    </div>
    
  </React.StrictMode>,
)
