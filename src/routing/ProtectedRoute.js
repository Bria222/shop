import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Login from '../auth/user/Login'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const StoreUserToken = localStorage.getItem('userToken')

  // show unauthorized screen if no user is found in redux store
  const userAccess = userInfo ? userInfo : StoreUserToken
  if (!userAccess) {
    return <Login />
  } else {
    return <Outlet />
  }
}

export default ProtectedRoute
