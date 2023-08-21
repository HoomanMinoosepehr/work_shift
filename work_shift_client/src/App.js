import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import { SignIn } from "./components/SignIn";
import { NavBar } from "./components/NavBar";
import { useEffect, useState } from "react";
import { req, get } from "./request";
import { Managers } from "./components/Managers";
import { Employees } from "./components/Employees";
import { NewManager } from "./components/NewManager";
import { NewEmployee } from "./components/NewEmployee";
import { Alert } from "./components/Alert";

function App() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null)
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
          setAlert({ color:'yellow', message: data.message })
          navigate('/')
          setUser(null)
        }
      })
  }

  return (
    <div>
      <NavBar user={user} logOut={logOut} />
      { alert ? 
        <Alert {...alert} setAlert={setAlert}/>
        :
        null
      }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="sign-in" element={<SignIn setAlert={setAlert} current={current}/>} />
        <Route path="managers" element={<Managers/>} />
        <Route path="managers/new" element={<NewManager/>} />
        <Route path="employees" element={<Employees/>} />
        <Route path="employees/new" element={<NewEmployee/>} />
      </Routes>
    </div>
  );
}

export default App;