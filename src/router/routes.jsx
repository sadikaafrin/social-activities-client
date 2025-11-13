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
import MyCreatedEvent from "../components/MyCreatedEvent";
import UpdateEvent from "../components/UpdateEvent";

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
        loader: () => fetch("https://social-activities-server.vercel.app/upcoming-events"),
      },
      {
        path: "/upcoming-events-details/:id",
        element: <UpcomingEventDetails />,
        loader: () => fetch("https://social-activities-server.vercel.app/upcoming-events-details"),
      },
      {
        path: "/myJoinEvent",
        element: (
          <PrivateRoute>
            <MyJoinEvent></MyJoinEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/myCreatedEvent",
        element: (
          <PrivateRoute>
            <MyCreatedEvent></MyCreatedEvent>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateEvent/:id",
        element: (
          <PrivateRoute>
            <UpdateEvent></UpdateEvent>
          </PrivateRoute>
        ),
        loader: ({params}) => fetch(`https://social-activities-server.vercel.app/events/${params.id}`),
      },
    ],
  },
]);
