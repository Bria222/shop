import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './SupplierForm.css'
import { useDispatch, useSelector } from 'react-redux'
import Error from '../../../loading state/Error'
import ThreeDots from '../../../loading state/ThreeDots'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SupplierProfile = () => {
  const [customError, setCustomError] = useState(null)
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()
  const submitForm = async (data) => {
    try {
      const formData = new FormData()
      formData.append('company_name', data.company_name)
      formData.append('id_number', data.id_number)
      formData.append('address', data.address)
      formData.append('street', data.street)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const response = await axios.post(
        'http://127.0.0.1:3002/api/v1/suppliers/add',
        formData,
        config
      )

      // Handle success response
      Swal.fire('Success!', 'registration was successfull', 'success')
      navigate('/supplier_dashboard')
    } catch (error) {
      // Handle error response
      Swal.fire('Error!', 'Oops! There was an error try again', 'error')
      console.error('Failed to submit form:', error)
    }
  }

  return (
    <>
      <div class='supplier-form-wrapper '>
        <h2 class='login-title'>Create your supplier profile</h2>
        <div>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
        </div>
        <form class='login-form' onSubmit={handleSubmit(submitForm)}>
          <div className='__aside'>
            <div>
              <label for='company_name'>Company Name </label>
              <input
                type='text'
                placeholder='company name ..'
                name='company_name'
                {...register('company_name')}
                required
              />
            </div>

            <div>
              <label for='id_number'>ID Number </label>
              <input
                type='text'
                placeholder='ID  i.e 361....'
                name='id_number'
                {...register('id_number')}
                required
              />
            </div>
          </div>
          {/* row 2 */}
          <div className='__aside'>
            <div>
              <label for='Address'>Address </label>
              <input
                type='text'
                placeholder='address '
                name='address'
                {...register('address')}
                required
              />
            </div>

            <div>
              <label for='street'>Street </label>
              <input
                type='text'
                placeholder='type street name in full'
                name='street'
                {...register('street')}
                required
              />
            </div>
          </div>

          <button
            type='submit'
            className='btn supplier-btn-form'
            disabled={loading}
          >
            {loading ? <ThreeDots /> : 'Register'}
          </button>
        </form>
      </div>
    </>
  )
}

export default SupplierProfile
