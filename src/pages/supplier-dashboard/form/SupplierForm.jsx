import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import './SupplierForm.css'
import Error from '../../../loading state/Error'
import ThreeDots from '../../../loading state/ThreeDots'
import Swal from 'sweetalert2'

const SupplierForm = () => {
  const [customError, setCustomError] = useState(null)
  const [categories, setCategories] = useState([])

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:3002/api/v1/categories'
        )
        setCategories(
          response.data.map((categoryData) => categoryData.category)
        )
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const { register, handleSubmit } = useForm()
  const submitForm = async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('product_type', data.product_type)
      formData.append('discount', data.discount)
      formData.append('units', data.units)
      formData.append('category_id', data.category_id[0])

      const productImages = Array.from(data.product_images) // Convert to array

      productImages.forEach((file) => {
        formData.append('product_images[]', file)
      })

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const response = await axios.post(
        'http://127.0.0.1:3002/api/v1/products/add',
        formData,
        config
      )

      // Handle success response
      Swal.fire('Success!', 'Product was created', 'success')
    } catch (error) {
      // Handle error response
      Swal.fire(
        'Error!',
        'Oops! There was an error creating the product',
        'error'
      )
      console.error('Failed to submit form:', error)
    }
  }

  return (
    <>
      <div className='supplier-form-wrapper'>
        <h2 className='login-title'>Create your product now</h2>
        <div>
          {error && <Error>{error}</Error>}
          {customError && <Error>{customError}</Error>}
        </div>

        <form className='login-form' onSubmit={handleSubmit(submitForm)}>
          <div className='__aside'>
            <div>
              <label htmlFor='name'>Name </label>
              <input
                id='name'
                type='text'
                placeholder='Product name...'
                name='name'
                required
                {...register('name')}
              />
            </div>

            <div>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                placeholder='Description'
                name='description'
                required
                {...register('description')}
              />
            </div>
          </div>
          {/* row 2 */}
          <div className='__aside'>
            <div>
              <label htmlFor='price'>Price </label>
              <input
                type='number'
                placeholder='Price...'
                name='price'
                required
                {...register('price')}
              />
            </div>

            <div>
              <label htmlFor='product_type'>Product Type </label>
              <input
                type='text'
                placeholder='Product type'
                name='product_type'
                required
                {...register('product_type')}
              />
            </div>
          </div>

          {/* row 3 */}
          <div className='__aside'>
            <div>
              <label htmlFor='discount'>Discount </label>
              <input
                type='text'
                placeholder='Discount...'
                name='discount'
                required
                {...register('discount')}
              />
            </div>

            <div>
              <label htmlFor='units'>Units </label>
              <input
                type='text'
                placeholder='Units (e.g., kgs, cms, g, etc.)'
                name='units'
                required
                {...register('units')}
              />
            </div>
          </div>
          {/* row 4 */}

          <div className='__aside'>
            <div>
              <label htmlFor='category'>Category </label>
              <select
                defaultValue=''
                name='category_id'
                {...register('category_id')}
              >
                <option value=''>Select an option</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor='product_images'>Product Images</label>
              <input
                type='file'
                accept='image/*'
                placeholder='Product Images'
                name='product_images'
                required
                multiple
                {...register('product_images')}
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

export default SupplierForm
