import React, { useContext, useEffect, useState } from 'react'
import '../css/pages/LoginPage.css';
import ListPage from '../pages/ListPage.js';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const LoginPage = () => {

  const [id,setId] = useState()
  const [pw,setPw] = useState()
  const [hidden,setHidden] = useState("hidden")
  const navigate = useNavigate()
  const {rightLogin,setRightLogin,setAccessToken,setIdData,idData} = useContext(UserContext)

  const saveId = (e)=>{
    setId(e.target.value)
  }
  const savePw = (e)=>{
    setPw(e.target.value)
  }

  let token 
  const fetchLogin = async()=>{
    try{
      const result = await axios.post("https://6f2b-121-147-100-85.ngrok-free.app/teams/login",{
          id : id,
          password : pw,
      headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
      })
    token = result.data.accessToken
    setAccessToken(token)
    setIdData(result.data.id)

    checkLogin()
    }catch(err){
      console.log("err입니당~",err)
    }
  }

  
  const checkLogin = ()=>{
    if(token){
      setRightLogin(true)
    }else{
      setRightLogin(false)
      setHidden("visible")
    }}
  return (
    <div>
      {rightLogin
      ?navigate('/')
      :<>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <div className='loginbox'>
          <div className='login_ment'>예약은 로그인 필요해요!</div>
          <div className='login_input'>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:"30px"}}className="material-symbols-outlined">person</span>
              <input placeholder='팀 아이디' onChange={(e)=>{saveId(e)}}/>
            </div>
            <div style={{display:"flex",alignItems:"center"}}>
              <span style={{fontSize:"30px"}} className="material-symbols-outlined">lock</span>
              <input type='password' placeholder='팀 비밀번호' onChange={(e)=>{savePw(e)}}/>
            </div>
          </div>
          <div>
            <button className='btn_make'><Link to='/membership' style={{color:"blue"}}>회원가입</Link></button>
            <span>/</span>
            <button className='btn_find'><Link to='/pwfind' style={{color:"blue"}}>비밀번호 찾기</Link></button>
          </div>
          <div className='login_err' style={{visibility:`${hidden}`}}>아이디 또는 비밀번호를 잘못 입력했습니다.</div>
          <button className='btn_login' onClick={fetchLogin}>로그인</button>
        </div>
      </>
      }
    </div>
  )
}

export default LoginPage
