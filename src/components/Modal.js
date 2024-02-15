import React, { useContext, useState,useEffect } from 'react'
import '../css/components/Modal.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Modal = ({fetchField,field, fieldName , endTime, startTime, date, setModalState, reserveSort}) => {

  const {rightLogin,idData,token} = useContext(UserContext)
  const [title,setTitle] = useState("이 일정으로 예약할까요 ?")
  const [titleColor,setTitleColor] = useState("#EE8042")
  const [buttonState,setButtonState] = useState(true)
  const [display,setDisplay] = useState("block")
  const navigate = useNavigate()

  let allRental
    if(reserveSort === '전체 대여'){
      allRental = true
    }else{
      allRental = false
    }

  const oneTeamMatch = async()=>{
      try{
        const result = await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/matching/apply",{
            matchingId:field.matchingId,
            team: idData,
            stadium:field.stadiumId,
            field:field.id,
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
  
  const firstMatch = async()=>{
    try{
      const result = await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/matching/create",{
          team: idData,
          stadium:field.stadiumId,
          field:field.id,
          allRental:allRental,
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
  const matchingReserve = ()=>{
    if(rightLogin){
      if(!field.team){
        firstMatch()
      }else{
        oneTeamMatch()
      }
      setTitle("예약이 완료되었습니다 !")
      setTitleColor("#4287EE")
      setButtonState(false)
      

    }else{
      alert("예약은 로그인이 필요합니다");
      navigate('/login')}
    }
  const cancel =()=>{
    console.log('취소')
    setModalState(false)
    setDisplay("none")
    fetchField()
  }
  return (
    <div>
      <div className ='modal' style={{display:{display}}}>
        <div className ='modal_head' style={{backgroundColor:`${titleColor}`}}>
          <div className ='modal_title'>{title}</div>
          <span className ="material-symbols-outlined" onClick={cancel}>cancel</span>
        </div>
        <div className='modal_content'>
          <div style={{fontWeight:'700', marginBottom:'10px'}}>[ {reserveSort} ]</div>
          <div style={{marginBottom:'5px'}}>{fieldName}구장 {date}</div>
          <div style={{marginBottom:'20px'}}>{startTime} ~ {endTime}</div>
          {(buttonState)
          ?<><button style={{marginRight:'15px',backgroundColor:`${titleColor}`}} onClick={matchingReserve}>예약</button>
            <button onClick={cancel}>취소</button></>
          : <div>My Page에서 다시 확인할 수 있습니다.</div>
          }
          
        </div>
      </div>
    </div>
  )
}

export default Modal
