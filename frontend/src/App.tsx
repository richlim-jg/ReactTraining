import { useState, useEffect } from "react";
import Dashboard from "./Components/Dashboard";
import Landing from "./Components/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./CSS/App.css";


function App() {
  const [userCreds, setUserCreds] = useState(() => {
    const localValue = localStorage.getItem("USERDATA")
    if(localValue == null) return null
    return JSON.parse(localValue);
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing setUserCreds={setUserCreds}/>
    },
    {
      path: "/dashboard",
      element: <Dashboard userCreds={userCreds}/>
    }
  ])
  
  useEffect(() => {
    localStorage.setItem("USERDATA", JSON.stringify(userCreds))
  }, [userCreds]);

  return (
    <>
      <div className="background">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
        </div>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
