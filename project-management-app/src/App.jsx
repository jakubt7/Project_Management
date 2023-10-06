import { Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from "./pages/Home/Home";
import LoginPage from './pages/LoginPage/LoginPage';
import CreateEmployee from './components/EmployeeComponents/CreateEmployee/CreateEmployee';
import Employees from './pages/Employees/Employees';
import EmployeeDetails from './components/EmployeeComponents/EmployeeDetails/EmployeeDetails';
import Projects from './pages/Projects/Projects';
import CreateProject from './components/ProjectComponents/CreateProject/CreateProject';
import Tasks from './pages/Tasks/Tasks';
import CreateTask from './pages/CreateTask/CreateTask';
import Teams from './pages/Teams/Teams';
import CreateTeam from './pages/CreateTeam/CreateTeam';
import TeamMembers from './components/TeamComponents/TeamMembers/TeamMembers';



function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/employees" element={<Employees/>} />
            <Route path="/employees/create" element={<CreateEmployee/>} />
            <Route path="/employees/:empId" element={<EmployeeDetails/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/tasks/create" element={<CreateTask/>} />
            <Route path="/teams" element={<Teams/>} />
            <Route path="/teams/create" element={<CreateTeam/>} />
            <Route path="/teams/:teamId" element={<TeamMembers/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
