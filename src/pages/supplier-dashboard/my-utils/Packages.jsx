import React from 'react'

const Packages = () => {
  const packages = ['Starter', 'Premium', 'Bronze', 'Silver']

  return (
    <div className='packages-container'>
      <div className='packages-wrapper'>
        {packages.map((item, index) => (
          <div className='package-slide' key={index}>
            <div className='package-content'>
              <span className='package-item'>{item}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='package-pagination'></div>
    </div>
  )
}

export default Packages
