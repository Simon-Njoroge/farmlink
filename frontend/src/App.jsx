
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
import Rentdashboard from './container/rentdashboardcontainer/rentdashboardcontainer';
import Adddashboard from './container/rentdashboardcontainer/addequipmentdashboard';
import Dashboard from './components/rentdashboard/dashboard';
import EquipmentPage from './components/rentdashboard/equipment';
import BookingsPage from './components/rentdashboard/booking';
import PaymentPage from './components/rentdashboard/payment';
import AddEquipment from './components/rentdashboard/addequipment';
import SettingsPage from './components/rentdashboard/setting';
import PaymentForm from './components/paymentform';
import STKPushConfirm from './components/rentdashboard/paymentpush';
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
  },
  {
    path:'/en-us/authenticated/dashboard/dashboard',
    element:<Rentdashboard><Dashboard/></Rentdashboard>
  },
  {
    path:'/en-us/authenticated/dashboard/equipments',
    element:<Rentdashboard><EquipmentPage/></Rentdashboard>
  },
  {
    path:'/en-us/authenticated/dashboard/Bookings',
    element:<Rentdashboard><BookingsPage/></Rentdashboard>
  },
  {
    path:'/en-us/authenticated/dashboard/Payment',
    element:<Rentdashboard><PaymentPage/></Rentdashboard>
  },
  {
    path:'/en-us/authenticated/dashboard/add-equipment',
    element:<Adddashboard><AddEquipment/></Adddashboard>
  },
  {
    path:'/en-us/authenticated/dashboard/setting',
    element:<Rentdashboard><SettingsPage/></Rentdashboard>
  },
  {
    path:'/en-us/safaricom/makepayment',
    element:<PaymentForm/>
  },
  {
    path:'/en-us/safaricom/makepayment/stkpush',
    element:<STKPushConfirm/>
  }
 ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
