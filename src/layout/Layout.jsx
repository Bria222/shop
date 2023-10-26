import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'

const BarLayout = () => (
  <>
    <div className='App'>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  </>
)

export default BarLayout
