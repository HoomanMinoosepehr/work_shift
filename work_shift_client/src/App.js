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
import { NotFound } from "./components/NotFound";
import { SetShifts } from "./components/SetShifts";
import { Schedule } from "./components/Schedule";
import { Account } from "./components/Account";
import { AdminLogin } from "./components/AdminLogin";

function App() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null)
  const [user, setUser] = useState([]);

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
          setUser([])
        }
      })
  }

  const logOut = () => {
    req("sessions", null, 'DELETE')
      .then( data => {
        if (data.status === 200) {
          setAlert({ color:'yellow', message: data.message })
          navigate('/')
          setUser([])
        }
      })
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <NavBar user={user} logOut={logOut} />
      { alert ? 
        <Alert {...alert} setAlert={setAlert}/>
        :
        null
      }
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="sign-in" element={<SignIn setAlert={setAlert} current={current}/>} />
        <Route path="managers" element={<Managers setAlert={setAlert}/>} />
        <Route path="managers/new" element={<NewManager setAlert={setAlert} />} />
        <Route path="employees" element={<Employees setAlert={setAlert}/>} />
        <Route path="employees/new" element={<NewEmployee setAlert={setAlert}/>} />
        <Route path="shifts" element={<SetShifts setAlert={setAlert}/>} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="account/:id" element={<Account user={user} logOut={logOut} setUser={setUser} setAlert={setAlert} />} />
        <Route path="adminLogin" element={<AdminLogin setAlert={setAlert} />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;