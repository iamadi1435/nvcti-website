import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './hoc/privateRoute'
import AdminRoute from './hoc/adminRoute'
import store from './store'
import Tabletop from 'tabletop'
import jwt_decode from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import {
  setOngoingEvents,
  setUpcomingEvents
} from './redux/actions/eventActions'
import { logoutUser, setCurrentUserId } from './redux/actions/authActions'
import { logoutAdmin, setCurrentAdminId } from './redux/actions/adminActions'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/common/Loading'
import Error from './pages/Error'
import ComingSoon from './pages/ComingSoon'

const Contact = lazy(() => import('./pages/Contact'))
const Homepage = lazy(() => import('./pages/Homepage'))
const Facilities = lazy(() => import('./pages/Facilities'))
const Register = lazy(() => import('./pages/Register'))
const About = lazy(() => import('./pages/About'))
const Events = lazy(() => import('./pages/Events'))
const UpcomingEvents = lazy(() => import('./pages/UpcomingEvents'))
const FlagshipEvents = lazy(() => import('./pages/FlagshipEvents'))
const FlagshipEventEditions = lazy(() =>
  import('./pages/FlagshipEventEditions')
)
const MicEvents = lazy(() => import('./pages/MicEvents'))
const OtherEvents = lazy(() => import('./pages/OtherEvents'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const IdeaDetails = lazy(() =>
  import('./components/Admin/adminDashboard/ideaDetails')
)
const Confirmation = lazy(() => import('./pages/Confirmation'))
const Gallery = lazy(() => import('./pages/Gallery'))

let jwtToken = localStorage.getItem('jwtToken')
let adminToken = localStorage.getItem('adminToken')

if (jwtToken) {
  if (typeof jwtToken === 'string') jwtToken = jwtToken.replace(/"/g, '')
  if (typeof adminToken === 'string') adminToken = adminToken.replace(/"/g, '')
  const decoded = jwt_decode(jwtToken)
  store.dispatch(setCurrentUserId(decoded.id))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    window.location.href = '/'
  }
  if (adminToken) {
    const decoded2 = jwt_decode(adminToken)
    store.dispatch(setCurrentAdminId(decoded2.id))
    if (decoded2.exp < currentTime) {
      // Logout user
      store.dispatch(logoutAdmin())
      // Redirect to login
      window.location.href = '/'
    }
  }
}

const App = ({ setUpcomingEvents, setOngoingEvents }) => {
  useEffect(() => {
    let mounted = true

    let offlineWarning = (e) => {
      toast.warn("You're offline!", {
        position: 'top-right',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      // window.addEventListener("online", onlineNotice);
    }

    let onlineNotice = (e) => {
      toast.success('Back online!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      // window.addEventListener("offline", offlineWarning);
    }

    window.addEventListener('offline', offlineWarning)
    window.addEventListener('online', onlineNotice)

    Tabletop.init({
      key: '1kdTomo8dRmojzAVpAxAWX1l7Cs2yejbI5SlIcvz0EfQ',
      simpleSheet: true
    })
      .then((data) => {
        if (mounted) setUpcomingEvents(data)
      })
      .catch((err) => console.warn(err))

    Tabletop.init({
      key: '1huKtLiszWNlZDsux2Vu2tqUOjZJZHHFOk7vSnRkL-Pc',
      simpleSheet: true
    })
      .then((data) => {
        if (mounted) setOngoingEvents(data)
      })
      .catch((err) => console.warn(err))
    return () => (mounted = false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: set ongoing events

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/facilities" component={Facilities} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/upcoming-events" component={UpcomingEvents} />
        <Route
          path="/flagship-events/:event"
          component={FlagshipEventEditions}
        />
        <Route exact path="/flagship-events" component={FlagshipEvents} />
        <Route exact path="/mic-events" component={MicEvents} />
        <Route exact path="/other-events" component={OtherEvents} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/confirm/:id" component={Confirmation} />
        <Route exact path="/admin_login" component={AdminLogin} />
        <Route exact path="/coming_soon" component={ComingSoon} />
        <AdminRoute exact path="/admin_dashboard" component={AdminDashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <AdminRoute
          exact
          path="/idea_details/:title/:id/:type/:appId"
          component={IdeaDetails}
        />
        <Route path="/gallery/:title/:date" component={Gallery} />
        <Route path="/" component={Error} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Suspense>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setUpcomingEvents: (data) => dispatch(setUpcomingEvents(data)),
  setOngoingEvents: (data) => dispatch(setOngoingEvents(data))
})

export default connect(null, mapDispatchToProps)(App)
