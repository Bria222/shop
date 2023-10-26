import React, { useState } from 'react'
import './supplier.css'
import { useSelector } from 'react-redux'
import SupplierForm from './form/SupplierForm'
import Packages from './my-utils/Packages'
import SupplierSlider from './my-utils/SupplierSlider'
import SupplierProfile from './form/SupplierProfile'
import ActivateForm from './form/ActivateForm'

const SupplierDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [showFormSlider, setShowFormSlider] = useState(false)

  const toggleFormSlider = () => {
    setShowFormSlider(!showFormSlider)
  }
  console.log(userInfo)
  return (
    <>
      <div className='supplier-container'>
        <div className='child child-4'>
          <h2>Hi! ,{userInfo?.user.name.toUpperCase()}</h2>
          <p>
            You are currently{' '}
            {userInfo?.user?.role?.toUpperCase() || 'inactive'}
          </p>

          <p>Get matched with buyers for your product.</p>
          <button className='custom-btn btn-12' onClick={toggleFormSlider}>
            <span>apply now</span>
            <span>register</span>
          </button>
        </div>
        <div className='child child-3'>
          {userInfo?.user.role === 'admin' ? (
            <div className='admin'>
              <h3>admin</h3>
              <h3>more actions</h3>
              <p>create categories</p>
              <p>view all user details</p>
            </div>
          ) : (
            <div className='change'>
              <h3>our packages</h3>
              <Packages />
            </div>
          )}
        </div>

        <div className='child child-1'>
          {showFormSlider ? (
            <>
              {userInfo?.user.role === 'supplier' ? (
                <SupplierForm />
              ) : userInfo?.user.role === 'admin' ? (
                <ActivateForm />
              ) : (
                <SupplierProfile />
              )}
            </>
          ) : (
            <>
              <SupplierSlider />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SupplierDashboard
