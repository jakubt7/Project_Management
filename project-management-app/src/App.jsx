import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from "./pages/Home/Home";
import LoginPage from './pages/LoginPage/LoginPage';
import Employees from './pages/Employees/Employees';
import EmployeeDetails from './components/EmployeeComponents/EmployeeDetails/EmployeeDetails';
import Projects from './pages/Projects/Projects';
import Tasks from './pages/Tasks/Tasks';
import Teams from './pages/Teams/Teams';
import TeamMembers from './components/TeamComponents/TeamMembers/TeamMembers';
import TaskDetails from './components/TaskComponents/TaskDetails/TaskDetails';
import ProjectDetails from './components/ProjectComponents/ProjectDetails/ProjectDetails';

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/employees" element={<Employees/>} />
            <Route path="/employees/:empId" element={<EmployeeDetails/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/projects/:projectId" element={<ProjectDetails/>} />
            <Route path="/tasks" element={<Tasks/>} />
            <Route path="/tasks/:taskId" element={<TaskDetails/>} />
            <Route path="/teams" element={<Teams/>} />
            <Route path="/teams/:teamId" element={<TeamMembers/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
