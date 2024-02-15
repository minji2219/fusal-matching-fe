import { useContext, useEffect, useState } from "react"
import '../css/components/FutureBreakdown.css'
import { FutureBDContext } from "../context/FutureBreakDownContext"

const FutureBreakdown = ({myteam,oppositeTeam,date,stadiumName, stadiumId,fieldNum,allRental,startTime,endTime}) => {

  const [fieldReveiwBtnBack, setFieldReiviewBtnBack] = useState('')
  const [teamReveiwBtnBack, setTeamReiviewBtnBack] = useState('')
  const [fieldReviewBtnText, setFieldReviewBtnText] = useState('')
  const [teamReviewBtnText, setTeamReviewBtnText] = useState('')

  const {setBDTitle,setFutureBD,setMatchingId,setOppositeTeam,setStadium,setEvalOpposite,setEvalStadium} = useContext(FutureBDContext)

  useEffect(()=>{
    if(myteam?.evalStadium){
      // 필드 리뷰가 있을때
      setFieldReiviewBtnBack('white')
      setFieldReviewBtnText('#4287EE')
    }else{
      setFieldReiviewBtnBack('#4287EE')
      setFieldReviewBtnText('white')
    }

    if(myteam?.evalOpposite){
      // 팀 리뷰가 있을때
      setTeamReiviewBtnBack('white')
      setTeamReviewBtnText('#4287EE')
    }else{
      setTeamReiviewBtnBack('#4287EE')
      setTeamReviewBtnText('white')
    }
  },[])

  const futureClick = ()=>{
    setFutureBD(true)
    setBDTitle(
      `${allRental
        ?`[ 전체 대여 ]`
        :`${date} ${stadiumName} - ${fieldNum}구장 [ vs ${oppositeTeam?.teamName}] ${startTime.slice(0,5)} ~ ${endTime.slice(0,5)}`
        }`
    )
    setMatchingId(myteam?.teamMatchingId)
    setStadium(stadiumId)
    setOppositeTeam(myteam?.id)
    setEvalOpposite(myteam?.evalOpposite)
    setEvalStadium(myteam?.evalStadium)
  }

  return (
    <li>
      <span style={{margin:'8px'}}>{date}</span> 
      {stadiumName} - {fieldNum}구장 
      {allRental
      ?`[ 전체 대여 ]`
      :<>[ vs {oppositeTeam?oppositeTeam.teamName:<span style={{fontWeight:'700',color:'red'}}> ? </span>}] </>
      }
      {startTime.slice(0,5)} ~ {endTime.slice(0,5)}
      {(allRental ===true)
      ?<button className='future_btn' onClick={futureClick} style={{backgroundColor:`${fieldReveiwBtnBack}`,color:`${fieldReviewBtnText}`}} >구장 리뷰</button>
      :<><button className='future_btn' onClick={futureClick} style={{backgroundColor:`${fieldReveiwBtnBack}`,color:`${fieldReviewBtnText}`}}>구장 리뷰</button> 
       <button className='future_btn' onClick={futureClick} style={{backgroundColor:`${teamReveiwBtnBack}`,color:`${teamReviewBtnText}`}}>팀 리뷰</button></>
      }
      <hr style={{color:'blue'}}/>
    </li>
  )
}

export default FutureBreakdown
