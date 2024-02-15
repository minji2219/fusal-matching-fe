import axios from 'axios'
import React from 'react'


const NowBreakdown = ({myteam,oppositeTeam,teamFetch,teamId,matchingId,date,stadium,fieldNum,allRental,startTime,endTime}) => {

const cancelFetch = async()=>{

  if(window.confirm('취소 하시겠습니까?')){
    try{
      const result = await axios.post(`https://6f2b-121-147-100-85.ngrok-free.app/matching/cancel`,{
      teamId:teamId,
      matchingId:matchingId,          
      headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
      })
      console.log(result.data)
    }catch(err){
      console.log("err입니당~",err)
    }
    teamFetch()
  }
  }

  return (
    <li>
      <span style={{margin:'8px'}}>{date}
      {stadium} - {fieldNum}구장 
      {allRental
      ?`[ 전체 대여 ]`
      :<>
      [ vs {oppositeTeam?oppositeTeam.teamName:<span style={{fontWeight:'700',color:'red'}}> ? </span>}] </>
      }
      {startTime.slice(0,5)} ~ {endTime.slice(0,5)}
      <button style={{color:'orange',border:'1px solid orange',backgroundColor:'white', margin:'0 5px 0 5px'}}>대기 중</button>
      <button style={{color:'white',border:'1px solid orange',backgroundColor:'orange'}} onClick={cancelFetch}>취소</button>
        </span> 
      <hr style={{color:'blue'}}/>
    </li>
      

  )
}

export default NowBreakdown
