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
import BrowseListing from './components/BrowseListing.jsx';
import RoomDetails from './components/RoomDetails.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import MyListings from './components/Mylisting.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    Component:LayOut,
    children:[
      {
        index:true,
        loader:()=>fetch("http://localhost:3000/roommates"),
        Component:Home
      },
      {
        path:"browselisting",
        loader:()=>fetch('http://localhost:3000/roommates'),
        Component:BrowseListing
      },
      {
        path:"roommates/:id",
        loader:({params})=>fetch(`http://localhost:3000/roommates/${params.id}`),
        Component:RoomDetails
      },
      {
        path:"mylisting",
        loader:({params})=>fetch(`http://localhost:3000/roommates`),
        Component:MyListings
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
   {
        path:"/*" ,
        Component:ErrorPage

   }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />  
      </AuthProvider>  
  </StrictMode>,
)
