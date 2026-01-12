import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login"; // Keep Login normal (we want it fast)

// 🟢 1. Lazy Load the heavy components
// React won't download these files until the user actually goes to that URL
const Browse = lazy(() => import("./Browse.jsx"));

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      // 🟢 2. Wrap lazy components in Suspense
      // The 'fallback' is what shows while the chunk is downloading (e.g., a spinner or text)
      element: (
        <Suspense
          fallback={
            <div className="bg-black h-screen text-white">Loading...</div>
          }
        >
          <Browse />
        </Suspense>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
