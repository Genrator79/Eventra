import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserLayout from "./Layouts/UserLayout"
import Home from "./pages/Home"
import EventDescription from "./pages/EventDescription"
import Events from "./pages/Events"
import CategoryEvents from "./pages/CategoryPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<UserLayout/>}> 
          <Route index element={<Home/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/events/:id" element={<EventDescription/>}/>
          <Route path="/events/category/:category" element={<CategoryEvents />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

