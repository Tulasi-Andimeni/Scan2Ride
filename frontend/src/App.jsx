import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Pages
import SignIn from './pages/SignIn';
import SignUp from './pages/signup';
import Logout from './pages/Logout';

// Forgot Password Flow
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';

// Main App Components
import Layout from './components/layout';
import Homedata from './components/homedata';
import LiveAttendance from './LiveAttendance';
import Drivers from './Drivers';
import StudentsDetail from './studentdetails';
import ScanPage from './pages/scanner';
import BusList from './BusList';
import Base from './pages/base';
import BusPage from './BusPage';
import Businfo from './Businfo';

function App() {
const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user || null;  
};

  const user = getUser();
  const role = user?.role;

  const isLoggedIn = !!user;

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Base />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Layout /> : <Navigate to="/signin" />}
        >
          <Route index element={<Homedata />} />

          {/* Admin Routes */}
          {role === 'admin' && (
            <>
              <Route path="LiveAttendance" element={<LiveAttendance />} />
              <Route path="studentdetails" element={<StudentsDetail />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="buspage" element={<BusPage />} />
              <Route path="buslist" element={<BusList />} />
              <Route path="bus/:busNumber" element={<Businfo />} />
            </>
          )}

          {/* Driver Routes */}
          {role === 'driver' && (
            <>
              <Route path="LiveAttendance" element={<LiveAttendance />} />
              <Route path="buslist" element={<BusList />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="buspage" element={<BusPage />} />
              <Route path="bus/:busNumber" element={<Businfo />} />
              <Route path="studentdetails" element={<StudentsDetail />} />
            </>
          )}
        </Route>

        {/* Scan page (accessible for both roles) */}
        <Route path="/scanpage" element={<ScanPage />} />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/signin"} />} />
      </Routes>

      {/* Global Toast Notification */}
      <ToastContainer position="top-center" autoClose={1500} />
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Auth Pages (REMOVED: SignIn, SignUp)
// // import SignIn from './pages/SignIn';
// // import SignUp from './pages/signup';
// import Logout from './pages/Logout';

// // Forgot Password Flow (You can remove these if not needed)
// import ForgotPassword from './pages/ForgotPassword';
// import VerifyOTP from './pages/VerifyOTP';
// import ResetPassword from './pages/ResetPassword';

// // Main App Components
// import Layout from './components/layout';
// import Homedata from './components/homedata';
// import LiveAttendance from './LiveAttendance';
// import Drivers from './Drivers';
// import StudentsDetail from './studentdetails';
// import ScanPage from './pages/scanner';
// import BusList from './BusList';
// import Base from './pages/base';
// import BusPage from './BusPage';
// import Businfo from './Businfo';

// function App() {
//   const getUser = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user?.user || null;
//   };

//   const user = getUser();
//   const role = user?.role;

//   return (
//     <Router>
//       <Routes>
//         {/* Root Route goes to Layout + Homedata */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Homedata />} />
//         </Route>

//         {/* Forgot Password Flow */}
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/verify-otp" element={<VerifyOTP />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/logout" element={<Logout />} />

//         {/* Main App Routes under /home */}
//         <Route path="/home" element={<Layout />}>
//           <Route index element={<Homedata />} />

//           {/* Admin Routes */}
//           {role === 'admin' && (
//             <>
//               <Route path="LiveAttendance" element={<LiveAttendance />} />
//               <Route path="studentdetails" element={<StudentsDetail />} />
//               <Route path="drivers" element={<Drivers />} />
//               <Route path="buspage" element={<BusPage />} />
//               <Route path="buslist" element={<BusList />} />
//               <Route path="bus/:busNumber" element={<Businfo />} />
//             </>
//           )}

//           {/* Driver Routes */}
//           {role === 'driver' && (
//             <>
//               <Route path="LiveAttendance" element={<LiveAttendance />} />
//               <Route path="buslist" element={<BusList />} />
//               <Route path="drivers" element={<Drivers />} />
//               <Route path="buspage" element={<BusPage />} />
//               <Route path="bus/:busNumber" element={<Businfo />} />
//               <Route path="studentdetails" element={<StudentsDetail />} />
//             </>
//           )}
//         </Route>

//         {/* Scan Page (accessible for both roles) */}
//         <Route path="/scanpage" element={<ScanPage />} />

//         {/* Catch-all Route */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {/* Toast Notifications */}
//       <ToastContainer position="top-center" autoClose={1500} />
//     </Router>
//   );
// }

// export default App;
