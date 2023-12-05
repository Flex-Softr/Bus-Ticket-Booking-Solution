import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Layout/Main.jsx';
import Home from './Components/Home/Home.jsx';
import FindTicket from './Components/Find Ticket/FindTicket.jsx';
import { StyledEngineProvider } from '@mui/material';
import FixSeat from './Components/FixSeat/FixSeat.jsx';
import Login from './Components/Login/Login.jsx';
import AddCounter from './Dashboard/AddCounter/AddCounter.jsx';
import DashboardLayout from './Dashboard/DashboardLayout.jsx';
import AddBus from './Dashboard/AddBus/AddBus.jsx';
import SupervisorAccount from './Components/Supervisor_Account/SupervisorAccount.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/fixSeat",
        element: <FixSeat></FixSeat>
      },
      {
        path: "/find-ticket",
        element: <FindTicket></FindTicket>
      },
      {
        path:"/login",
        element:<Login></Login>
      }
    ]
  },
  {
    path : "/",
    element: <Main></Main>,
    children:[
      {
        path: "/supervisor",
        element: <SupervisorAccount></SupervisorAccount>
      },
      {
        path:'/add-counter',
        element:<AddCounter></AddCounter>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: "addbus",
        // element: <Autocomplete />
        element: <AddBus />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<StyledEngineProvider>
<RouterProvider router={router} />
</StyledEngineProvider>
  </React.StrictMode>,
)
