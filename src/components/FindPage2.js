import React from 'react'

const FindPage2 = () => {
  return (
    <div>
        <div className='find_input'>
          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px"}}className="material-symbols-outlined">person</span>
            <input placeholder='팀 아이디'/>
          </div>
          <div style={{display:"flex",alignItems:"center",position:'relative'}}>
            <span style={{fontSize:"30px"}} className="material-symbols-outlined">email</span>
            <input placeholder='주장 이메일' />
            <button className='btn_find_ok'>보내기</button>
          </div>
          <div style={{display:"flex",alignItems:"center",position:'relative'}}>
            <span style={{fontSize:"30px"}} className="material-symbols-outlined">lock</span>
            <input placeholder='인증번호 입력' />
            <button className='btn_find_ok'>확인</button>           
          </div>

          <button className='btn_find_next'>다음</button>
          {/* disabled고치기 */}
          </div>
    </div>
  )
}

export default FindPage2
