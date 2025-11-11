import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Profile from "../Pages/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddEvent from "../Pages/AddEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
     {
        index: true,
        element: <Home />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "addEvent",
        element: (
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
