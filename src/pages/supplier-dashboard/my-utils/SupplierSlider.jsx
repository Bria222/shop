import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './supplier-slider.css'

const SupplierSlider = () => {
  const slides = [
    {
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_1280.jpg',
      title: 'Fly in comfort, arrive in style',
      description:
        'Offering the Best Airport Transfer Services in Kenya. Experience It Now !',
    },
    {
      imageUrl: '../../images/digital-marketing.jpg',
      title: 'Travel.Explore.Experience',
      description:
        'Offering the Best Executive airport transfers  in Kenya. Experience It Now !',
    },
    // Add more slides as needed
  ]

  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      showStatus={false}
      showThumbs={false}
    >
      {slides.map((slide, index) => (
        <div key={index} className='slide-container'>
          <div
            className='slide-image'
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />
          <div className='slide-title'>
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <Button className='button'>
              <LinkContainer to={'/contact'}>
                <div>
                  <span className='transition' />
                  <span className='label'>Discover More</span>
                </div>
              </LinkContainer>
            </Button>
          </div>
        </div>
      ))}
    </Carousel>
  )
}

export default SupplierSlider
