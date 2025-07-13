import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./Layouts/UserLayout"
import Home from "./pages/Home"
import EventDescription from "./pages/EventDescription"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<UserLayout/>}> 
          <Route index element={<Home/>}/>
          <Route path="/events/:id" element={<EventDescription/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

