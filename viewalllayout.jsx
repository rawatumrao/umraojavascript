import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './viewalllayout.css'

const ViewAllLayout = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const navigate = useNavigate()
    const handleBackClick =()=>{
        navigate('/')
    }

  return (
    <div className='view-all-layout'>
        <span className='link-text' onClick={handleBackClick}>&lt; Back</span>
        <div className='layouts'>
            

            <div className=''>
              <h2 className='header'> Adaptive</h2>
              <div className='gridContainer'>
                {Array.from({length:1}).map((_, index) => (
                  <div key={index} className='box'>
                    <img src={`./images/viewall/Adaptive${index + 1}.PNG`} alt={`Image ${index + 1}`} className='image' />
                  </div>
                ))}
              </div>
            </div>
            <div className=''>
              <h2 className='header'> Speaker Focused</h2>
              <div className='gridContainer'>
                {Array.from({length:3}).map((_, index) => (
                  <div key={index} className='box'>
                    <img src={`./images/viewall/sf${index + 1}.PNG`} alt={`Image ${index + 1}`} className='image' />
                  </div>
                ))}
              </div>
            </div>

            <div className=''>
              <h2 className='header'> Equal Size</h2>
              <div className='gridContainer'>
                {Array.from({length:6}).map((_, index) => (
                  <div key={index} className='box'>
                    <img src={`./images/viewall/es${index + 1}.PNG`} alt={`Image ${index + 1}`} className='image' />
                  </div>
                ))}
              </div>
            </div>

            <div className=''>
              <h2 className='header'> Large Group</h2>
              <div className='gridContainer'>
                {Array.from({length:6}).map((_, index) => (
                  <div key={index} className='box'>
                    <img src={`./images/viewall/lg${index + 1}.PNG`} alt={`Image ${index + 1}`} className='image' />
                  </div>
                ))}
              </div>
            </div>



        </div>
    </div>
  )
}

export default ViewAllLayout
