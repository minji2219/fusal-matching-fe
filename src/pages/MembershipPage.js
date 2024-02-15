import React, { useEffect, useState } from 'react'
import '../css/pages/MembershipPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MembershipPage = () => {

  const [color,setColor] = useState("black")
  const [pw, setPw] = useState()
  const [checkpw, setCheckpw] = useState()
  const [id, setId] = useState()
  const [teamName, setTeamName] = useState()
  const [captinName, setCaptinName] = useState()
  const [tel,setTel] = useState()
  const [email, setEmail] = useState()


  const [hidden, setHidden] = useState("hidden")
  const [checkMent,setCheckMent] = useState("중복확인")

  let DuplicationCheck
  const navigate = useNavigate()

  const checkDuplication = async(e)=>{
      try{
        DuplicationCheck = await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/teams/check-id",{
          idORNick : id,
        headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
            },
        })

      }catch(err){
        console.log("err입니당~",err)
      }
    console.log(DuplicationCheck)
    if(DuplicationCheck.data){
      setColor("#1FBB25")
      setCheckMent('ID적합')
    }
    else{
      setColor("gray")
      setCheckMent('ID존재')
      e.target.style.backgroundColor = 'white'
      e.target.style.border = '1px solid #EE4242'
      e.target.style.color='#EE4242'
    }
  }
  useEffect(()=>{
    if(checkpw>0){
      if(pw == checkpw){
        setHidden("visible")
      }else{
        setHidden("hidden")
      }
    }
  },[checkpw])
  
  const fetchMembership = async()=>{
    try{
      await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/teams/new",{
          id : id,
          password : pw,
          teamName : teamName,
          captinName:captinName,
          tel:tel,
          email:email,
      headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
      })
    navigate('/login')
    }catch(err){
      console.log("err입니당~",err)
    }
  }
  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div className='membershipbox'>
        <div className='memebership_ment'>회원가입</div>
        <div className='membership_inputs'>
          <div className='membership_top'>광주에 있는 풋살장을 이용해보세요 !</div>
          
          <div style={{display:"flex",alignItems:"center", position:"relative"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">person</span>
            <input placeholder='팀 아이디' style={{color:`${color}`}} onChange={(e)=>{setId(e.target.value)}}/>
            <button className='check_btn'style={{position:"absolute", left:"470px"}} onClick={(e)=>{checkDuplication(e)}}>{checkMent}</button>
          </div>

          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">lock</span>
            <input placeholder='팀 비밀번호 입력' type='password' onChange={(e)=>{setPw(e.target.value)}}/>
          </div>

          <div style={{display:"flex",alignItems:"center", position:"relative"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">lock</span>
            <input placeholder='팀 비밀번호 확인' type='password' onChange={(e)=>{setCheckpw(e.target.value)}}/>
            <div style={{position:"absolute", left:"470px", color:"red",visibility:`${hidden}`}}>ok!</div>
          </div>

          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">sports_soccer</span>
            <input placeholder='팀명' onChange={(e)=>{setTeamName(e.target.value)}}/>
          </div>

          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">badge</span>
            <input placeholder='주장 이름' onChange={(e)=>{setCaptinName(e.target.value)}}/>
          </div>

          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">call</span>
            <input placeholder='주장 전화번호' onChange={(e)=>{setTel(e.target.value)}}/>
          </div>
          
          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">email</span>
            <input placeholder='주장 이메일'onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>

          <button className='btn_complete' onClick={fetchMembership}>완료</button>
        </div>
      </div>
    </div>
  )
}

export default MembershipPage
