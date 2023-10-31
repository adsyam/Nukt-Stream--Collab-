import "@stripe/stripe-js"; //stripe library for user authentication
import { createBrowserRouter, Outlet } from "react-router-dom";

import {
  Dashboard,
  Feed,
  ForgotPassword,
  History,
  Login,
  Navbar,
  Pricing,
  Profile_About,
  Profile_Contents,
  Profile_Downloads,
  Profile_Home,
  Profile_Playlist,
  ProtectedRoute,
  RedirectRoute,
  SignUp,
  Subscriptions,
  Success,
  User,
  ReportPage,
  Library,
} from "./components/index.js";

import {
  AllCategory,
  Home,
  SearchMedia,
  WatchMovie,
  WatchPage,
  WatchTVSeries,
} from "./pages";

import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
//======== CONTEXT PROVIDER ========

//USER-CHANNEL PAGE

//create an app layout that will be the parent router of our pages
//this is for the context hooks and so that the navigation bar will be present in all pages
//context use here are AuthProvider for the user authentication and DataProvider for the global data
const AppLayout = () => (
  <>
    <AuthProvider>
      <DataProvider>
        <Navbar />
        <main className="min-h-screen w-full">
          <Outlet />
        </main>
      </DataProvider>
    </AuthProvider>
  </>
);

//create a browser router with the pages as the children of the app layout
export const AppRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <RedirectRoute>
            <Dashboard />
          </RedirectRoute>
        ),
      },
      {
        path: "/login",
        children: [
          {
            path: "/login",
            element: (
              <RedirectRoute>
                <Login />
              </RedirectRoute>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <RedirectRoute>
                <ForgotPassword />
              </RedirectRoute>
            ),
          },
        ],
      },
      {
        path: "/signup",
        children: [
          {
            path: "/signup",
            element: (
              <RedirectRoute>
                <SignUp />
              </RedirectRoute>
            ),
          },
          {
            path: "pricing",
            element: <Pricing />,
          },
          {
            path: "success",
            element: <Success />,
          },
        ],
      },
      {
        path: "/home",
        children: [
          {
            path: "/home",
            element: (
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            ),
          },
          {
            path: "popular",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "trending",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "toprated",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "airingtoday",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "intheatre",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/feed",
        children: [
          {
            path: "/feed",
            element: (
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            ),
          },
          {
            path: "history",
            element: (
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            ),
          },
          {
            path: "subscriptions",
            element: (
              <ProtectedRoute>
                <Subscriptions />
              </ProtectedRoute>
            ),
          },
          {
            path: "library",
            element: (
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/report",
        element: (
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        children: [
          {
            path: "/search",
            element: (
              <ProtectedRoute>
                <SearchMedia />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/movie",
        children: [
          {
            path: "/movie",
            element: (
              <ProtectedRoute>
                <WatchMovie />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <WatchMovie />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/TVSeries",
        children: [
          {
            path: "/TVSeries",
            element: (
              <ProtectedRoute>
                <WatchTVSeries />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/:season/:episode",
            element: (
              <ProtectedRoute>
                <WatchTVSeries />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/watch",
        element: (
          <ProtectedRoute>
            <WatchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/:id",
        children: [
          {
            path: "/profile/:id",
            element: (
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "home",
                element: <Profile_Home />,
              },
              {
                path: "contents",
                element: <Profile_Contents />,
              },
              {
                path: "playlist",
                element: <Profile_Playlist />,
              },
              {
                path: "downloads",
                element: <Profile_Downloads />,
              },
              {
                path: "about",
                element: <Profile_About />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
