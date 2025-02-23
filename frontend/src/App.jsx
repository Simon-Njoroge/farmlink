
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/homepage';
import Aboutpage from './pages/aboutpage';
import Blogscontainer from './container/blogscontainer';
import Faqspage from './pages/faqspage';
import Contact_uscontainer from './container/contact_uscontainer';
import SignUp from './components/sign_up';
import Login from './components/login';
import UserLandingPage from './components/userlanding';
function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Homepage/>
  },
  {
    path:'/en-us/about-us',
    element:<Aboutpage/>
  },
  {
    path:'/en-us/blogs',
    element:<Blogscontainer/>
  },
  {
    path:'/en-us/faqs',
    element:<Faqspage/>
  },
  {
    path:'/en-us/contact_us',
    element:<Contact_uscontainer/>
  },
  {
    path:'/en-us/auth/farmlink/sign-up',
    element:<SignUp/>
  },
  {
    path:'/en-us/auth/farmlink/login',
    element:<Login/>
  },
  {
    path:'/en-us/auth/loggedin/dashboard',
    element:<UserLandingPage/>
  }
 ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
