
import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.getElementById('scrollableDiv').scrollTop;
    if (scrolled > 100){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
    var myDiv = document.getElementById('scrollableDiv');
    myDiv.scrollTop = 0;
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <div className="scroll-btn" style={{bottom: visible ? '120px' : '60px'}}>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: 'inline'}} />
    </div>
  );
}
  
export default ScrollButton;