import React, { useEffect, useState } from 'react'
import './userAuth.css'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../features/auth/authActions'
import ThreeDots from '../../loading state/ThreeDots'
import Error from '../../loading state/Error'
const Register = () => {
  const [customError, setCustomError] = useState(null)
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) navigate('/user-profile')
    // redirect user to login page if registration was successful
    if (success) navigate('/login')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      setCustomError('Password mismatch')
      return
    }
    // transform email string to lowercase to avoid case sensitivity issues in login
    data.email = data.email.toLowerCase()

    dispatch(registerUser(data))
  }

  return (
    <>
      <div class='form-wrapper'>
        <h2 class='login-title'>Register now</h2>
        <div>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
        </div>
        <form class='login-form' onSubmit={handleSubmit(submitForm)}>
          <div>
            <label for='name'>Name </label>
            <input
              id='name'
              type='text'
              placeholder='full name ..'
              name='name'
              {...register('name')}
              required
            />
          </div>
          <div>
            <label for='phone_number'>Phone number </label>
            <input
              id='name'
              type='number'
              placeholder='254710889090'
              name='phone_number'
              {...register('phone_number')}
              required
            />
          </div>

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
          <div>
            <label for='password'>Confirm Password </label>
            <input
              id='password'
              type='password'
              placeholder='password'
              name='password'
              {...register('confirmPassword')}
              required
            />
          </div>

          {/* <button class='btn btn--form' type='submit' value='Log in'>
            Log in
          </button> */}
          <button type='submit' className='btn btn--form' disabled={loading}>
            {loading ? <ThreeDots /> : 'Register'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
