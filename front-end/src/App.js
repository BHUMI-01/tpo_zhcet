import './App.css';
import { Route, Routes, UNSAFE_enhanceManualRouteObjects } from 'react-router-dom';
import Home from "./containers/Home";
// import for login
import LoginScr from "./containers/Login/LoginScr";
import StudentLoginScr from "./containers/Login/LoginStdSrc";
import RecruiterLoginScr from "./containers/Login/LoginCompSrc";
//import for register
import RegisterScr from './containers/Register/RegisterScr';
import StudentRegister from './containers/Register/RegisterStdSrc';
import RecruiterRegister from './containers/Register/RegisterCompSrc';
// imports for the student profile
import StudentDashboard from './containers/Page';
import StudentDash from './containers/Student/Student';
import StudentDash2 from './containers/Student/Student2';
import AddStdUpload from './containers/Student/AddUpload';
import EditStdUpload from './containers/Student/EditUpload';
import StudentProfile from './containers/Student/Profile';
import EditStudentProfile from './containers/Student/EditProfile';
import StudentAddress from './containers/Student/Address';
import EditPerStudentAddress from './containers/Student/EditPerAddress';
import StudentQualify from './containers/Student/Qualification';
import EditStudentQualify from './containers/Student/EditQualify';
import AddStudentQualify from './containers/Student/AddQualify';
import EditTempAddress from './containers/Student/EditTempAddress';
// imports for the onetime form for the student profile
import AddStudentProfile from './containers/Student/AddProfile';
import AddPerStudentAddress from './containers/Student/AddPerAddress';
import AddTempAddress from './containers/Student/AddTempAddress';
import AddStudentEducat from './containers/Student/AddEducat';
import Reviewform from './containers/Student/ReviewForm';
// imports for the admin profile
import Admin from './containers/Admin/Admn';
import ManageStd from './containers/Admin/MangStudent';
import AddAdmin from './containers/Admin/Addadmin';
import ManageRecruit from './containers/Admin/MangRecruiter';
import ManageAdmin from './containers/Admin/MangAdmin';
import Notify from './containers/Admin/Notification';
import AddJob from './containers/Admin/Addjob';
import AddEvent from './containers/Admin/AddEventPost';
// imports for the recruiter profile
import Recruiter from './containers/Recruiter/Recruiter';
import JOB from './containers/Recruiter/Job';
import EVENT from './containers/Recruiter/Event';
import DashRecr from './containers/Recruiter/Dashboard';
import SendMail from './containers/Recruiter/Email';

function App() {
  return (
    <div>
      {/* <Nabvar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterScr />} />
        <Route path="/stdregister" element={<StudentRegister />} />
        <Route path="/compregister" element={<RecruiterRegister />} />
        <Route path="/login" element={<LoginScr />} />
        <Route path="/stdlogin" element={<StudentLoginScr />} />
        <Route path="/complogin" element={<RecruiterLoginScr />} />

        <Route path="/student" element={<StudentDash />}>
          <Route path="stdprofile" element={<StudentProfile />} />
          <Route path="stdaddress" element={<StudentAddress />} />
          <Route path="stdqualify" element={<StudentQualify />} />
          <Route path="editstdupload" element={<EditStdUpload />} />
          <Route path="editstdprofile" element={<EditStudentProfile />} />
          <Route path="editstdperaddress" element={<EditPerStudentAddress />} />
          <Route path="editstdtempaddress" element={<EditTempAddress />} />
          <Route path="editstdqualify/:id" element={<EditStudentQualify />} />
          <Route path="addstdqualify" element={<AddStudentQualify />} />
        </Route>

        <Route path="/onetimeform" element={<StudentDash2 />}>
          <Route path="addstdprofile" element={<AddStudentProfile />} />
          <Route path="addstdperaddress" element={<AddPerStudentAddress />} />
          <Route path="addstdtempaddress" element={<AddTempAddress />} />
          <Route path="addstdeducat" element={<AddStudentEducat />} />
          <Route path="addstdupload" element={<AddStdUpload />} />
          <Route path="reviewform" element={<Reviewform />} />
        </Route>

        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="managestd" element={<ManageStd />} />
          <Route path="managecomp" element={<ManageRecruit />} />
          <Route path="notification" element={<Notify />} />
          <Route path="manageadmin" element={<ManageAdmin />} />
          <Route path="addadmin" element={<AddAdmin />} />
          <Route path="addJob" element={<AddJob />} />
          <Route path="addEvent" element={<AddEvent />} />
        </Route>
        <Route path="/recruiter" element={<Recruiter />}>
          <Route path="addJOB" element={<JOB />} />
          <Route path="addEVENT" element={<EVENT />} />
          <Route path="dashrecruiter" element={<DashRecr />} />
          <Route path="sendmail" element={<SendMail />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
