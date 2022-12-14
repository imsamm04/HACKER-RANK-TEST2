import React, { Fragment, useState } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000)

  function nextImage() {
    setActiveIndex((pre) => pre < catalogs.length - 1 ? pre + 1 : 0);
  }

  function prevImage() {
    setActiveIndex((pre) => pre === 0 ? catalogs.length - 1 : pre - 1);
  }

  function startSlide() {
    setSlideTimer(setInterval(nextImage, slideDuration));
  }

  function stopSlide() {
    setSlideTimer((pre) => {
      clearInterval(pre);
      return undefined;
    })
  }

  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              onClick={prevImage}
              className="icon-only outlined"
              data-testid="prev-slide-btn"
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs
                onClick={setActiveIndex}
                items={ catalogs } 
                currentIndex={ activeIndex } 
              />
            <button
              onClick={nextImage}
              className="icon-only outlined"
              data-testid="next-slide-btn"
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            onChange={(e) => e.target.checked ? startSlide() : stopSlide()}
            type='checkbox'
            data-testid='toggle-slide-show-button'
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

