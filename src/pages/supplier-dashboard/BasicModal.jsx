import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Link } from 'react-router-dom'

const style = {
  position: 'relative',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: '#f94e30',
  border: '1px solid #ffff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
}

export default function BasicModal() {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{ fontSize: '25px', textAlign: 'center', color: 'white' }}
          >
            Register as
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <ul class='list-group' style={{ display: 'flex', gap: 50 }}>
              <button className='btn btn--form'>
                <Link to='/register'>USER</Link>
              </button>

              <button className='btn btn--form'>
                <Link to='/register'>SUPPLIER</Link>
              </button>
            </ul>
          </Typography>
          <button
            onClick={() => setOpen(false)}
            style={{
              borderRadius: '15px',
              backgroundColor: '#f94e30',
              color: 'white',
              fontFamily: 'fantasy',
              marginLeft: '200px',
              marginTop: '4px',
            }}
          >
            close
          </button>
        </Box>
      </Modal>
    </div>
  )
}
