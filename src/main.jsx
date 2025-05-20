import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import LayOut from './layouts/LayOut.jsx';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import FindRoomMate from './components/FindRoomMate.jsx';
import AuthProvider from './context/AuthProvider.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    Component:LayOut,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"signin",
        Component:SignIn
      },
      {
        path:"signup",
        Component:SignUp
      },
      {
        path:"findroommate",
        Component:FindRoomMate
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />  
      </AuthProvider>  
  </StrictMode>,
)
