import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Profile from "../Pages/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddEvent from "../Pages/AddEvent";
import UpcomingEvent from "../components/UpcomingEvent";
import UpcomingEventDetails from "../components/UpcomingEventDetails";
import MyJoinEvent from "../components/MyJoinEvent";

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
      {
        path: "/upcoming-events",
        element: <UpcomingEvent />,
        loader: () => fetch("http://localhost:3000/upcoming-events"),
      },
      {
        path: "/upcoming-events-details/:id",
        element: <UpcomingEventDetails />,
        loader: () => fetch("http://localhost:3000/upcoming-events-details"),
      },
         {
        path: "/myJoinEvent",
        element: <PrivateRoute>
          <MyJoinEvent></MyJoinEvent>
        </PrivateRoute>
      },
    ],
  },
]);
