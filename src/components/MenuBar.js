import React, { useContext, useState} from 'react'
import '../css/components/MenuBar.css'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const MenuBar = () => {

  const {rightLogin,setRightLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [firstWeight,setFirstWeight] = useState('700')
  const [secondWeight,setSecondWeight] = useState('400')
  
  const firstClickMenu = ()=>{
    setFirstWeight('700')

    setSecondWeight('400')
  }
  const secondClickMenu = ()=>{
    setFirstWeight('400')
    setSecondWeight('700')
  }
  const loginClickMenu = ()=>{
    setFirstWeight('400')
    setSecondWeight('400')
  }
  
  return (
    <div>
      <div className='menu'>
        <ul>
          <li className='logo' onClick={firstClickMenu} ><Link to='/'>광주 풋살</Link></li>
          <li className='info'onClick={firstClickMenu}><Link to='/' style={{fontWeight:firstWeight}}>구장 정보</Link></li>
          <li className='reserve' onClick={secondClickMenu}><Link to='reserve' style={{fontWeight:secondWeight}}>예약하기</Link></li>

          {rightLogin 
          ?<div>
            <button className='mypage' onClick={loginClickMenu}><Link to='/mypage' style={{color:'blue'}}>myPage</Link></button>
            <li className='login' onClick={()=>{loginClickMenu(); navigate('/')}}><button onClick={()=>{setRightLogin(false)}}>로그아웃</button></li></div> 
          :<li className='login' onClick={loginClickMenu}><Link to='login'><button>로그인</button></Link></li>
          }
        </ul>
      </div>
    </div>
  )
}

export default MenuBar
