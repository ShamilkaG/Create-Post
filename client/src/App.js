import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

function App() {
  // const [authState, setAuthState] = useState(false);
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    // if (localStorage.getItem("accessToken")) {
    //   setAuthState(true);
    // }
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          // setAuthState(false);
          setAuthState({ ...authState, status: false });
        } else {
          // setAuthState(true);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    // setAuthState({...authState,status:false});
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {/* <Link to="/">Home Page</Link>
            <Link to="/createpost">Create a Post</Link> */}
            {/* {!sessionStorage.getItem('accessToken') && ( */}
            {/* {!localStorage.getItem('accessToken') && ( */}
            {!authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ): (
              <>
              <Link to="/">Home Page</Link>
              <Link to="/createpost">Create a Post</Link>
              </>
            )}

            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/createpost" element={<CreatePost />} />
            <Route exact path="/post/:id" element={<Post />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
