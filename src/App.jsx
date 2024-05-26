import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from "./components/signin.jsx";
import Signup from "./components/signup.jsx";
import Appbar from "./components/AppBar.jsx";
import AddCourse from "./components/postCourse.jsx";
import Courses from "./components/AllCourses.jsx";
import Course from "./components/Course";
import { useEffect, useState } from 'react';
import axios from "axios";


function App() {

    return (
        <div style={{width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"}}
        >
                <Router>
                    <Appbar />
                    <Routes>
                        <Route path={"/addcourse"} element={<AddCourse />} />
                        <Route path={"/course/:courseId"} element={<Course />} />
                        <Route path={"/courses"} element={<Courses />} />
                        <Route path={"/signin"} element={<Signin />} />
                        <Route path={"/signup"} element={<Signup />} />
                    </Routes>
                </Router>

        </div>
    );
}

export default App;