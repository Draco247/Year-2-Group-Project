import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Link, Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import React, {useState} from 'react';
import RegistrationForm from './Pages/Register/RegistrationForm';
import Login from './Pages/Login/Login';
import Logout from './Pages/Logout/Logout';
import Home from './Pages/Home/Home';
import Posts from './Components/Posts/Posts'
import ExpandPost from './Pages/ExpandPost/ExpandPost'
import NewPost from './Pages/NewPost/NewPost'
import Profile from './Pages/Profile/Profile'
import Topbar from './Components/Topbar/TopBar'
import PrivateMessage from './Pages/PrivateMessage/PrivateMessage'
// import MessageBoard from './Pages/MessageBoard/App'

function App() {
    const [loggedInUser, setLoggedinUser] = useState("");


    return (
    <Router>
    <React.Fragment>
        <Topbar loggedInUser={loggedInUser}/>
        <main>
            <section>
            <Routes>
                <Route exact path='/' element={<Home loggedInUser={loggedInUser}/>}/>
                <Route path='/Register' element={<RegistrationForm/>}/>
                <Route path='/Login' element={<Login setLoggedinUser={setLoggedinUser}/>}/>
                <Route path='/Posts' element={<Posts loggedInUser={loggedInUser} setLoggedinUser={setLoggedinUser}/>}/>
                <Route path='/Logout' element={<Logout setLoggedinUser={setLoggedinUser}/>}/>
                <Route path='/Post/:id' element={<ExpandPost loggedInUser={loggedInUser} setLoggedinUser={setLoggedinUser}/>}/>
                <Route path='/newPost' element={<NewPost loggedInUser={loggedInUser}/>}/>
                <Route path='/Help'/>
                <Route path='/Profile' element={<Profile loggedInUser={loggedInUser}/>} setLoggedinUser={setLoggedinUser}/>
                <Route path='/PrivateMessages' element={<PrivateMessage loggedInUser={loggedInUser}/>}/>
                {/* <Route path='/MessageBoard' element={<MessageBoard loggedInUser={loggedInUser}/>}/> */}
            </Routes>
            </section>
        </main>
    </React.Fragment>
    </Router>
    );
}

export default App;
