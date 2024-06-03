// import RegistrationPage from './pages/registrationpage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/homepage'
import RegistrationPage from './pages/registrationpage'
import ContactPage from './pages/contactpage';
import AboutPage from './pages/aboutpage';
// import RegistrationPage from './pages/registrationpage';
import LoginPage from './pages/login';
import Userlistpage from './pages/userlistpage';
import Profile from './pages/profile';

function App() {  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path = '/registration' element={<RegistrationPage/>}/>
        <Route path = '/contact' element={<ContactPage/>}/>
        <Route path = '/about' element={<AboutPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/userlist' element={<Userlistpage/>}/>
        <Route path='/edit/:id' element={<RegistrationPage/>}/>
        <Route path='/profile' element={<Profile/>}/>
                
        <Route/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
