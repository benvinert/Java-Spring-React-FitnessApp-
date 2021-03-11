import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { useTransition, animated, config } from 'react-spring'
import '../styles.css';
import { useHistory } from 'react-router';
import {Button} from 'react-bootstrap';
import pic1 from '../pic1.jpg';
import pic from '../pic2.jpg'; 
import jeffrey from '../jeffrey.jpg';
import back from '../back.jpg';

const slides = [
  { id: 0, url: pic },
  { id: 1, url: jeffrey },
  { id: 3, url: back },
]

const Pictures = () => {
  const {push} = useHistory();
  const [index, set] = useState(0)
  const transitions = useTransition(slides[index], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })
  useEffect(() => void setInterval(() => set(state => (state + 1) % 3), 2000), [])
  return transitions.map(({ item, props, key }) => (
    
    <animated.div
      key={key}
      className="bg"
      style={{ ...props, backgroundImage: `url(${item.url})` }}
    ><Button id="but" onClick={() => push("/Getdiet")}  style={{
      borderColor : 'white',
      background : '#41B3A3',}}  
      size="lg" className="btnHome">READY TO GET FIT?</Button>
    
    </animated.div>
    
    
  ))
}

export default Pictures;