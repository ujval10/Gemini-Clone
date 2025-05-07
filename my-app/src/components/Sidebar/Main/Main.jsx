import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../../assets/assets'
import { Context } from '../../../context/Context';
const Main = () => {

  const {onSent,recentPrompt,loading,showResult,resultData,setInput,input} = useContext(Context)



  return (
    <div className='main'>
  <div className="nav">
    <p>Gemini</p>
    <img src={assets.user_icon} alt="User Icon" />
  </div>
  <div className="main-container">
    {!showResult
    ?<>
         <div className="greet">
      <p><span>Hello, Dev.</span></p>
      <p>How can i help you today?</p>
    </div>
    <div className="cards">
      <div className="card">
        <p>Suggest a Greatest Anime of All time?</p>
        <img src={assets.compass_icon} alt=""/>
      </div>
      <div className="card">
        <p>Which Shounen anime is good for u</p>
        <img src={assets.bulb_icon} alt=""/>
      </div>
      <div className="card">
        <p>What are the FIA rules in FOrmula 1</p>
        <img src={assets.message_icon} alt=""/>
      </div>
      <div className="card">
        <p>Is Lewis hamilton a 7 times World champion in formula one?</p>
        <img src={assets.code_icon} alt=""/>
      </div>
    </div>
     </>
     :<div className= 'result'>
        <div className="result-title">
          <img src={assets.user_icon} alt="" />
          <p>{recentPrompt}</p>
        </div>
        <div className="result-data">
          <img src={assets.gemini_icon} alt="" />
          <p dangerouslySetInnerHTML={{__html:resultData}}></p>
        </div>
     </div>
  }
   
    <div className="main-bottom">
      <div className="search-box">
        <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
        <div>
          <img src={assets.gallery_icon} alt="" />
          <img src={assets.mic_icon} alt="" />
          <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
        </div>
      </div>
      <p className="bottom-info">
        Gemini may display inaccurate infor, including about people, sp double, so double-check its  responses. Your privact and Gemini Apps
      </p>
    </div>
  </div>
</div>
  )
}

export default Main