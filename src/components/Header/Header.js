import React from 'react'
import './Header.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { logout } from '../../features/auth/authSlice'
import Swal from 'sweetalert2'

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const handleLogout = () => {
    Swal.fire('logged out!', 'logout sucess!', 'success')
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className='header text-white'>
      <div className='container'>
        <div className='header-cnt'>
          <div className='header-cnt-top fs-13 py-2 flex align-center justify-between'>
            <div className='header-cnt-top-l'>
              <ul className='flex top-links align-center'>
                <li>
                  {/* dummy links */}
                  <Link to='/' style={{ fontWeight: 'bolder' }}>
                    Nicoles Beuty Shop
                  </Link>
                </li>
                <li className='vert-line'></li>
                <li>
                  {/* dummy links */}
                  <Link to='/download'>Download</Link>
                </li>
                <li className='vert-line'></li>
                <li className='flex align-center'>
                  <span className='fs-13'>Follow us on</span>
                  <ul className='social-links flex align-center'>
                    <a
                      href='https://www.facebook.com/nyaboke.peris.9/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='fs-15'
                    >
                      <li className='mx-2'>
                        <i className='fab fa-facebook'></i>
                      </li>
                    </a>

                    <li className='mx-2'>
                      <a href='www.instagram.com' className='fs-15'>
                        <i className='fab fa-instagram'></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className='header-cnt-top-r'>
              <ul className='top-links flex align-center'>
                <li>
                  <span className='top-link-itm-ico mx-2'>
                    <span className='top-link-itm-txt'>
                      {' '}
                      {userInfo ? userInfo.user.name : null}
                    </span>
                    <i className='fa-solid fa-circle-question'></i>
                  </span>
                  {userInfo ? (
                    <Link to='/supplier_dashboard' className='top-link-itm'>
                      {' '}
                      <span className='top-link-itm-txt'>Nicoles Beuty</span>
                    </Link>
                  ) : (
                    <span className='top-link-itm-txt'>support</span>
                  )}
                  {/* </Link> */}
                </li>
                <li className='vert-line'></li>
                {userInfo ? (
                  <>
                    <li>
                      <span className='top-link-itm-txt' onClick={handleLogout}>
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to='/register'>Register</Link>
                    </li>
                    <li className='vert-line'></li>
                    <li>
                      <Link to='/login'>
                        <span className='top-link-itm-txt'>Log in</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className='header-cnt-bottom'>
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
