import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import History from './pages/History'
import Footer from './components/Footer'
import Prescription from './pages/Prescription'
import Register from './pages/Register';
import  AppContextProvider  from './context/AppProvider';






const App = () => {

  
  return (
    <div className='mx-4 sm:mx-[10%]'>
    <AppContextProvider>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/myappointment' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/history' element={<History />} />
        <Route path='/prescription' element={<Prescription />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer/>
      </AppContextProvider>
    </div>
  )
}

export default App