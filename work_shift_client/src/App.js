import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { SignIn } from "./components/SignIn";
import { NavBar } from "./components/NavBar";
import { useEffect, useState } from "react";
import { req, get } from "./request";

function App() {
  // const navigate = useNavigate()
  const [user, setUser] = useState(null);

  useEffect(() => {
    current()
  }, [])

  const current = () => {
    get('sessions')
      .then(data => {
        if (data.id) {
          setUser({
            id: data.id,
            name: data.name,
            type: data.type
          })
        } else {
          setUser(null)
        }
      })
  }

  const logOut = () => {
    req("sessions", null, 'DELETE')
      .then( data => {
        if (data.status === 200) {
          // navigate('/')
          setUser(null)
        }
      })
  }

  return (
    <div>
      <Router>
      <NavBar user={user} logOut={logOut}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/sign-in" element={<SignIn current={current}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;