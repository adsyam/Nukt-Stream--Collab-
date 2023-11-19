import "@stripe/stripe-js";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { DBProvider } from "./context/DBContext";

import {
  Navbar,
  Pricing,
  ProfileAbout,
  ProfileContents,
  ProfileDownloads,
  ProfileHome,
  ProfilePlaylist,
  ProtectedRoute,
  RedirectRoute,
} from "./components";

import {
  AllCategory,
  Dashboard,
  Feed,
  ForgotPassword,
  History,
  Home,
  Library,
  Report,
  SearchMedia,
  SignIn,
  SignUp,
  Subscriptions,
  Success,
  UserProfile,
  WatchMovie,
  WatchSeries,
  WatchVideo,
} from "./pages";

const AppLayout = () => (
  <>
    <AuthProvider>
      <DBProvider>
        <DataProvider>
          <Navbar />
          <Outlet />
        </DataProvider>
      </DBProvider>
    </AuthProvider>
  </>
);

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
                <SignIn />
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
            path: "popular/:page",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "trending/:page",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "toprated/:page",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "latest/:page",
            element: (
              <ProtectedRoute>
                <AllCategory />
              </ProtectedRoute>
            ),
          },
          {
            path: "cinema/:page",
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
            <Report />
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
                <WatchSeries />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id/:season/:episode",
            element: (
              <ProtectedRoute>
                <WatchSeries />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "/watch",
        element: (
          <ProtectedRoute>
            <WatchVideo />
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
                <UserProfile />
              </ProtectedRoute>
            ),
            children: [
              {
                path: "home",
                element: <ProfileHome />,
              },
              {
                path: "contents",
                element: <ProfileContents />,
              },
              {
                path: "playlist",
                element: <ProfilePlaylist />,
              },
              {
                path: "downloads",
                element: <ProfileDownloads />,
              },
              {
                path: "about",
                element: <ProfileAbout />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
