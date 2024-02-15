import React, { useContext, useState } from 'react'
import { FutureBDContext } from '../context/FutureBreakDownContext'
import '../css/components/MypageBottom.css'
import axios from 'axios'

const MypageBottom = () => {
  const {futureBD,setFutureBD,BDtitle,matchingId,oppositeTeam,stadium,evalOpposite,evalStadium} = useContext(FutureBDContext)
  const [stadiumReview,setStadiumReview] = useState()
  const writeStadium = async()=>{
    try{
      const result = await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/review/write-stadium",{
            teamMatchingId:matchingId,
            stadiumId:stadium,
            gpa:1,
            review:stadiumReview,
      headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
      })
      console.log(result.data)

    }catch(err){
      console.log("err입니당~",err)
    }
  }
  const [manner,setManner] = useState()
  const [skill,setSkill] = useState()
  const writeTeam = async()=>{
    try{
      const result = await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/review/write-team",{
            teamMatchingId:matchingId,
            oppositeTeamId:oppositeTeam,
            manner:Number(manner),
            skill:Number(skill),
      headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
      })
      console.log(result.data)

    }catch(err){
      console.log("err입니당~",err)
    }
  }
  
  return (
    <div>
      {futureBD
      ?
      <div className='center'>
        <div className='mypage_bottom_toggle'>
          <div className='toggle_btn' onClick={()=>{setFutureBD(false)}}></div>

          <div style={{marginTop:'20px',display:'flex',alignItems:'center',justifyContent:'center', height:'300px'}}>

            <div className='stadium_review'>
              <span className='review_mark'>구장 리뷰</span>
              <span style={{fontWeight:'700'}}>{BDtitle}</span>
              <hr style={{width:'450px' ,margin:'5px 0 0 85px'}}/>
              <div style={{marginTop:'30px'}}>
                <input value={stadiumReview} placeholder='리뷰를 작성해 주세요.' style={{height:'50px',marginLeft:'30px'}} onChange={(e)=>{setStadiumReview(e.target.value)}}/>
                <button style={{marginLeft:'10px',backgroundColor:'#4287EE',color:'white'}} onClick={writeStadium}>등록</button>
              </div>
            </div>

            <div className='team_review'>
              
              <span className='review_mark'>팀 리뷰</span>
              <span style={{fontWeight:'700'}}>{BDtitle}</span>
              <hr style={{width:'500px' ,margin:'5px 0 0 70px'}}/>

              <div className='points'>
                <div>
                  <div className='point'>
                    <span className='title'>🏆 실력 </span>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'25px', height:'25px'}}type="radio" value="1" name="point_btn"/>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'20px', height:'20px'}}type="radio" value="2" name="point_btn"/>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'17px', height:'17px'}}type="radio" value="3" name="point_btn"/>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'15px', height:'15px'}}type="radio" value="4" name="point_btn"/>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'17px', height:'17px'}}type="radio" value="5" name="point_btn"/>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'20px', height:'20px'}}type="radio" value="6" name="point_btn"/>
                    <input className='radio_input' onClick={(e)=>{setSkill(e.target.value)}} style={{width:'25px', height:'25px'}}type="radio" value="7" name="point_btn"/>
                  </div>
                  <hr className='pointbar'/>
                  <div className='point_ment'>
                    <div>훈련이 필요해보여요 !</div>
                    <div>좋아요 !</div>
                    <div style={{marginLeft:'20px'}}>와우, 프로인가요?</div>
                  </div>
                
                  <div className='point'>
                    <span className='title'>⭐ 매너 </span>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'25px', height:'25px'}} type="radio" value="1" name="point_btn2"/>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'20px', height:'20px'}} type="radio" value="2" name="point_btn2"/>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'17px', height:'17px'}} type="radio" value="3" name="point_btn2"/>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'15px', height:'15px'}} type="radio" value="4" name="point_btn2"/>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'17px', height:'17px'}} type="radio" value="5" name="point_btn2"/>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'20px', height:'20px'}} type="radio" value="6" name="point_btn2"/>
                    <input className='radio_input' onClick={(e)=>{setManner(e.target.value)}} style={{width:'25px', height:'25px'}} type="radio" value="7" name="point_btn2"/>
                  </div>
                  <hr className='pointbar2'/>
                  <div className='point_ment2'>
                    <div>매너가 아주 꽝 !</div>
                    <div>좋아요 !</div>
                    <div>최고의 매너예요!</div>
                  </div>
                </div>
                <button className='reveiw_btn' onClick={writeTeam}>등록</button>
              </div>

            </div>

          </div>
        </div>
      </div>
      :<div className='mypage_bottom'>
        <ul className='bottom_ul'>
          <ul className='bottom_ul_ul' style={{marginBottom:'10px'}}>
            <li><span style={{fontWeight:'700'}}>상호명</span> (주) JNU산공이공<span style={{margin:'0 10px'}}>|</span></li>
            <li>기획자 : 이은경<span style={{margin:'0 10px'}}>|</span></li>
            <li>FE : 서민지<span style={{margin:'0 10px'}}>|</span></li>
            <li>BE : 신지훈</li>
          </ul>
        
        <li style={{marginBottom:'10px'}}><span style={{fontWeight:'700'}}>주소 :</span> 광주 북구 용봉로 77, 자동차공학관(공과대학 1호관)</li>
        <li style={{marginBottom:'80px'}}><span style={{fontWeight:'700'}}>고객지원 :</span> 이메일 (luk0992@naver.com )</li>
        <li style={{color:'#4287EE'}}>Copyright © JNU산공이공</li>
        </ul>
      </div>
      
      }
    </div>
  )
}

export default MypageBottom
