import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './SupplierForm.css'
import './table.css'
import axios from 'axios'
import Swal from 'sweetalert2'
const token = localStorage.getItem('userToken')

const ActivateForm = () => {
  const [suppliers, setsuppliers] = useState([])

  const fetchsuppliers = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:3002/api/v1/suppliers/',
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setsuppliers(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchsuppliers()
  }, [])

  const handleActivateUser = async (supplierID) => {
    try {
      const supplier = suppliers.find(
        (supplier) => supplier.supplier_info.id === supplierID
      )
      if (!supplier || !supplier.supplier_info) {
        // Supplier or supplier_info is undefined
        Swal.fire('Error!', 'Invalid supplier', 'error')
        return
      }

      if (supplier.supplier_info.role === 'supplier') {
        Swal.fire('Error!', 'User is already activated', 'error')
      } else {
        await axios.patch(
          `http://127.0.0.1:3002/api/v1/users/update/${supplierID}`,
          {
            role: 'supplier',
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        // Refresh the list of users after activation
        fetchsuppliers()
        Swal.fire('Success!', 'Activated was created', 'success')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='supplier-form-wrapper'>
        <h2 className='login-title'>activate suppliers</h2>

        <div>
          <table>
            <thead>
              <tr>
                <th>user_id</th>
                <th>Name</th>
                <th>Email</th>
                <th>phone</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td data-column='id'>{supplier.supplier_info.id}</td>
                  <td data-column='Name'>{supplier.supplier_info.name}</td>
                  <td data-column='Email'>{supplier.supplier_info.email}</td>
                  <td data-column='phone'>
                    {supplier.supplier_info.phone_number}
                  </td>
                  <td data-column='Role'>{supplier.supplier_info.role}</td>
                  <td data-column='Role'>
                    <button
                      className='custom-btn btn-12'
                      onClick={() =>
                        handleActivateUser(supplier.supplier_info.id)
                      }
                    >
                      <span>
                        {supplier.supplier_info.role === 'supplier'
                          ? 'activated'
                          : 'inactive'}
                      </span>
                      <span>
                        {supplier.supplier_info.role === 'supplier'
                          ? 'activated'
                          : 'inactive'}
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ActivateForm
