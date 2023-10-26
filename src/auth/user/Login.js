import React, { useEffect, useState } from 'react'
import './userAuth.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { userLogin } from '../../features/auth/authActions'
import ThreeDots from '../../loading state/ThreeDots'
import Error from '../../loading state/Error'
const Login = () => {
  const [customError, setCustomError] = useState(null)
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  if (error) {
    Swal.fire(`<Error>${error}</Error>`)
  }
  if (userInfo) {
    Swal.fire('welcome!', 'login sucess!', 'success')
  }

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }
  return (
    <>
      <div class='form-wrapper'>
        <div>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
        </div>
        <h2 class='login-title'>Log in</h2>

        <form class='login-form' onSubmit={handleSubmit(submitForm)}>
          <div>
            <label for='email'>Email </label>
            <input
              id='email'
              type='email'
              placeholder='me@example.com'
              name='email'
              {...register('email')}
              required
            />
          </div>

          <div>
            <label for='password'>Password </label>
            <input
              id='password'
              type='password'
              placeholder='password'
              name='password'
              {...register('password')}
              required
            />
          </div>

          {/* <button class='btn btn--form' type='submit' value='Log in'>
            Log in
          </button> */}
          <button type='submit' className='btn btn--form' disabled={loading}>
            {loading ? <ThreeDots /> : 'Login'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
