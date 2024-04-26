import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect } from 'react';
import { initialState,reducer } from './reducer/UseReducer';
import { myState,clgreducer } from './reducer/ClgReducer'
    
import Home from './Components/Home';
import StdLogin from './Components/StdLogin';
import StdSignup from './Components/StdSignup';
import TeacherLogin from './Components/TeacherLogin';
import TeacherSignup from './Components/TeacherSignup';
import Navbar from './Components/Navbar';
import About from './Components/About';
import StdHome from './Components/StdHome';
import StdViewAssg from './Components/StdViewAssg';
import SubmitAssg from './Components/SubmitAssg';
import StdLogout from './Components/StdLogout';
import ClgHome from './Components/ClgHome';
import PostAss from './Components/PostAss';
import ClgViewAssg from './Components/ClgViewAssg';
import UpdateAss from './Components/UpdateAss';
import TeachLogout from './Components/TeachLogout';
import TeacherNav from './Components/TeacherNav';
import StdNav from './Components/StdNav';
import FillAssg from './Components/FillAssg';
import ViewSubmStds from './Components/ViewSubmStds';
import StdsSubmitted from './Components/StdsSubmitted';
import AssignMarks from './Components/AssignMarks';
import DeleteAssg from './Components/DeleteAssg';
import StdResultTeach from './Components/StdResultTeach';
import ViewSResult from './Components/ViewSResult';
import FetchMyMarks from './Components/FetchMyMarks';
import Notification from './Components/Notification';
export const UserContext = createContext();
export const ClgContext = createContext();

const App =()=> {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [clgstate, clgdispatch] = useReducer(clgreducer, myState);
  useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
          axios.post('https://mybackendtask.onrender.com/verify', { token })
              .then(response => {
                  dispatch({ type: "USER", payload: response.data.authenticated });
              })
              .catch(error => {
                  console.error(error);
                  // Handle error (e.g., redirect to login page)
              });
      }
  }, []);

  // Store user authentication status in cookies whenever it changes
  useEffect(() => {
      Cookies.set('userAuth', state.toString());
  }, [state]);
  // Return JSX for your application
  useEffect(() => {
      const token = Cookies.get('clgToken'); // Assuming you use 'clgToken' for college authentication
      if (token) {
          axios.post('https://mybackendtask.onrender.com/clgverify', { token }) // Adjust the endpoint URL accordingly
              .then(response => {
                  clgdispatch({ type: "CLG", payload: response.data.authenticated });
              })
              .catch(error => {
                  console.error(error);
                  // Handle error (e.g., redirect to college login page)
              });
      }
  }, []);
  
  // Store college authentication status in cookies whenever it changes
  useEffect(() => {
      Cookies.set('clgAuth', clgstate.toString()); // Assuming you store college authentication status as a boolean
  }, [clgstate]);
  return (
    // <>
    //   <Navbar/>
    //   <Routes>
     
    //     <Route exact path="/" element={<Home />} />
    //     <Route path="/about" element={<About />} />
    //     <Route path="/stdslogin" element={<StdLogin />} />
    //     <Route path="/stddsignup" element={<StdSignup />} />
    //     <Route path="/teachlogin" element={<TeacherLogin />} />
    //     <Route path="/teachsignup" element={<TeacherSignup />} />
    //   </Routes>
    // </>
    <div className="app">
        
    <UserContext.Provider value={{ state, dispatch }}>
        <ClgContext.Provider value={{ clgstate, clgdispatch }}>
          
                {/* Define routes using React Router's Routes component */}
                <Routes>
                    {/* Define routes for public pages */}
                    <Route path="/" element={<><Navbar/><Home/></>} />
                    <Route path="about" element={<><Navbar/><About /></>} />
                    {/* <Route path="faqs" element={<><Navbar/><Faqs /></>} /> */}
                    <Route path="stdslogin" element={<><Navbar/><StdLogin /></>} />
                    <Route path="teachlogin" element={<><Navbar/><TeacherLogin /></>} />
                    <Route path="stddsignup" element={<><Navbar/><StdSignup /></>} />
                    <Route path="teachsignup" element={<><Navbar/><TeacherSignup /></>} />
                    {/* <Route path="vacancies" element={<><Navbar/><Vacancies /></>} /> */}


                    {/* Define routes for user-specific pages if user is logged in */}
                    { state? (
                        <>
   

                            <Route path="stdhome" element={<><StdNav/><StdHome /></>} />
                            <Route path="stdviewassg/:clgname" element={<><StdNav/><StdViewAssg /></>} />
                            <Route path="fillassg/:id" element={<><StdNav/><FillAssg /></>} />
                            <Route path="viewmyres/:rlno" element={<><StdNav/><ViewSResult /></>} />
                            <Route path="notif/:clgname" element={<><StdNav/><Notification /></>} />

                            <Route path="submitassg" element={<><StdNav/><SubmitAssg /></>} />
                            <Route path="stdlogout" element={<><StdNav/><StdLogout /></>} />
                        </>
                    ) : (
                        <Route path="*" element={<><Navbar/><Home/></>} />
                    )}

                    {/* Define routes for college-specific pages if college is logged in */}
                    { clgstate? (
                        <>
                            <Route path="clghome" element={<><TeacherNav/><ClgHome /></>} />
                            <Route path="postassg" element={<><TeacherNav/><PostAss /></>} />
                            <Route path="clgviewassg/:name" element={<><TeacherNav/><ClgViewAssg /></>} />
                            <Route path="udateassg/:id" element={<><TeacherNav/><UpdateAss /></>} />
                            <Route path="viewsubstd/:name" element={<><TeacherNav/><ViewSubmStds /></>} />
                            <Route path="stdsubmited/:assignmentId" element={<><TeacherNav/><StdsSubmitted /></>} />
                            <Route path="deleteassg/:id" element={<><TeacherNav/><DeleteAssg /></>} />
                            <Route path="stdresbyteach/:assignmentId" element={<><TeacherNav/><StdResultTeach /></>} />

                            <Route path="assignmarks/:rlno/:assignmentId" element={<><TeacherNav/><AssignMarks /></>} />
                            
                            <Route path="teachlogout" element={<><TeacherNav/><TeachLogout /></>} />
                           


                        </>
                    ) : (
                        <Route path="*" element={<><Navbar/><Home/></>} />
                    )}
                </Routes>
          
        </ClgContext.Provider>
    </UserContext.Provider>
    <br/>
    <br/>
    
    </div>
  );
}

export default App;
