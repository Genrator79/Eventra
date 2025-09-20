import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./Layouts/UserLayout"
import Home from "./pages/Home"
import EventDescription from "./pages/EventDescription"
import Events from "./pages/Events"
import CategoryEvents from "./pages/CategoryPage"
import ScrollToTop from "./common/ScrollToTop"
import Login from "./pages/Login"
import Register from "./pages/Register"
import About from "./pages/About"
import Profile from "./pages/Profile"
import UserDetails from "./pages/UserDetails"
import Admin from "./pages/Admin"
import { Toaster } from "sonner"
import AddEvent from "./pages/AddEvent"
import Registration from "./pages/Registration"
import { ThemeProvider } from "./contexts/ThemeContext"

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors />
        <ScrollToTop/>
        <Routes>
            <Route path='/' element={<UserLayout/>}> 
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route index element={<Home/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/userDetails" element={<UserDetails/>}/>
            <Route path="/events/:id" element={<EventDescription/>}/>
            <Route path="/events/category/:category" element={<CategoryEvents />} />
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/admin/addevent" element={<AddEvent/>}/>
            <Route path="/events/registration/:eventId" element={<Registration />} />

            </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

