import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Hello from './hello.jsx';
import SalamiCard from './Component/SalamiCard.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    // children:[
    //   {
    //     path: 'salamiCard',
    //     element: <SalamiCard />
    //   },
    //   {
    //     path:'hello',
    //     element: <Hello></Hello>
    //   }
    // ]
  },
  {
    path: '/salamiCard',
    element: <SalamiCard />
  },
  {
    path:'/hello',
    element: <Hello />
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <RouterProvider router={router}/>
    </div>
    
  </React.StrictMode>,
)
