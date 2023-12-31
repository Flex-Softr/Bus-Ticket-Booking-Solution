import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Components/Layout/Main.jsx";
import Home from "./Components/Home/Home.jsx";
import FindTicket from "./Components/Find Ticket/FindTicket.jsx";
import { StyledEngineProvider } from "@mui/material";
import FixSeat from "./Components/FixSeat/FixSeat.jsx";
import Login from "./Components/Login/Login.jsx";
import AddCounter from "./Dashboard/AddCounter/AddCounter.jsx";
import DashboardLayout from "./Dashboard/DashboardLayout.jsx";
import AddBus from "./Dashboard/AddBus/AddBus.jsx";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Components/Providers/AuthProvider/AuthProvider.jsx";
import PrivateRoute from "./route/PrivateRoute.jsx";
import ErrorPage from "./ErrorPage.jsx";
import AllBus from "./Dashboard/AllBus/AllBus.jsx";
import AllCounters from "./Dashboard/AllCounters/AllCounters.jsx";
import AllSupervisor from "./Dashboard/AllSupervisor/AllSupervisor.jsx";
import SupervisorForm from "./Dashboard/SupervisorAccount/SupervisorAccount.jsx";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main></Main>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/fixSeat",
        element: <FixSeat></FixSeat>,
      },
      {
        path: "/find-ticket",
        element: <FindTicket></FindTicket>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "addbus",
        element: <AddBus />,
      },
      {
        path: "addSupervisor",
        element: <SupervisorForm />,
      },
      {
        path: "add-counter",
        element: <AddCounter></AddCounter>,
      },
      {
        path: "allbus",
        element: <AllBus />,
      },
      {
        path: "allcounters",
        element: <AllCounters />,
      },
      {
        path: "allsupervisor",
        element: <AllSupervisor />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  { path: "*", element: <ErrorPage></ErrorPage> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <StyledEngineProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
