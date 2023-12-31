import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'
import './Footer.scss'

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData

  const handleChangeInput = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name] : value})
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    // pushing data to sanity
    client.create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
  }

  return (
    <>
      <h2 className='head-text'>Reach Out and Say Hi!</h2>

      {/* cards */}
      {/* <div className='app__footer-cards'>
        
        <div className='app__footer-card'>
          <img src={images.email2} alt="email" />
          <a href="mailto:luisitocanlas@gmail.com" className='p-text'>luisitocanlas@gmail.com</a>
        </div>

        
        <div className='app__footer-card'>
          <img src={images.mobile2} alt="mobile" />
          <a href="tel: +1 (818) 747-6805" className='p-text'>+1 (818) 747-6805</a>
        </div>
      </div> */}

      {/* contact form */}
      {!isFormSubmitted ? 
        <div className='app__footer-form app__flex'>
          {/* name */}
          <div className='app__flex'>
            <input className='p-text' type='text' placeholder='Your Name' name='name'   value={name} onChange={handleChangeInput} />
          </div>

          {/* emai; */}
          <div className='app__flex'>
            <input className='p-text' type='email' placeholder='Your Email' name='email'  value={email} onChange={handleChangeInput} />
          </div>

          {/* text field */}
          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              value={message}
              name='message'
              onChange={handleChangeInput}
            />
          </div>

          {/* button */}
          <button type='button' className='p-text' onClick={handleSubmit}>{loading ?  'Just a moment, your message is on its way!' : 'Drop Me a Message!'}</button>
        </div>
        : 
        <div>
          <h3 className='head-text'>Thank you for Reaching Out!</h3>
        </div>
      }
    </>
  )
}

export default AppWrap (
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__secondarybg'
)