

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useFireBase } from "./context/FireContext";

function App()
{
  const {currentUser}=useFireBase()

  const RedirectToLogin = () =>
  {
    return currentUser ? <Navigate to='/'/> : <Login/>
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          } />
           <Route path="Login" element={<RedirectToLogin/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
