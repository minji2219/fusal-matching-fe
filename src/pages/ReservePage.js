import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "../css/pages/reservePage.css"
import Field from '../components/Field'
import Modal from '../components/Modal'

const ReservePage = () => {
  const location = useLocation()
  const id = location.state?.id
  const [stadiumValue,setStadiumValue] = useState((id)?id:1)

  const today = new Date()
  const dates =[]
  for(let i =0; i<=30; i++){
    const date = new Date(today.getFullYear(),today.getMonth(),today.getDate()+i)
    dates.push(date)
  }
  const [dateValue,setDateValue] =useState(`${dates[0].getFullYear()}-${dates[0].getMonth()+1}-${dates[0].getDate()}`)
  
  let hour = 0
  let minute = 0
  const times = ["00:00"]
  for(let i = 1; i <=48;i++){
    if(i%2==0){
      hour+=1
      minute =0
    }
    else{
      minute+=30
    }
    const time = `${(`${hour}`.length==1)?`0${hour}`:hour}:${(minute==0)?"00":minute}`
    times.push(time)
  }
  const [startTimeValue,setStartTimeValue] = useState(times[0])
  const [endTimeValue,setEndTimeValue] = useState(times[0])


  const [stadiums,setStadiums] = useState(null) 
  useEffect(()=>{
    const fetchStadiums = async()=>{
      try{
        const result = await axios.get("https://6f2b-121-147-100-85.ngrok-free.app/stadiums",{
        headers: {
              'Content-Type': `application/json`,
              'ngrok-skip-browser-warning': '69420',
            },
        })
        setStadiums(result.data)
      }catch(err){
        console.log("err입니당~",err)
      }
    }
    fetchStadiums()
  },[])

  const [field,setField] = useState(null) 
 
  const fetchField = async()=>{
    try{
      const result = await axios.get(`https://6f2b-121-147-100-85.ngrok-free.app/stadiums/fields?id=${stadiumValue}&date=${dateValue}&time=${startTimeValue}:00`,{
      headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
          },
      })
      setField(result.data)
    }catch(err){
      console.log("err입니당~",err)
    }
  }

  const changeStadiumValue = (e)=>{
    setStadiumValue(e.target.value)
  }
  const changeDateValue = (e)=>{
    setDateValue(e.target.options[e.target.selectedIndex].text)
  }
  const changeStartTimeValue = (e)=>{
    setStartTimeValue(e.target.options[e.target.selectedIndex].text)
  }
  const changeEndTimeValue = (e)=>{
    setEndTimeValue(e.target.options[e.target.selectedIndex].text)
  }



  return (
    <>
    <div className='center'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        
        <div className='reserve_head'>
          <div style={{fontWeight:"700", marginRight:"20px"}}>예약 일정</div>
          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px", marginRight:"10px"}}className="material-symbols-outlined">sports_soccer</span>
              <select style={{fontSize:'16px'}}value={id} onChange={changeStadiumValue}>
                {stadiums?.map(stadium=>(
                  <option value={stadium.id}>{stadium.stadiumName}</option>
                ))}
              </select>
          </div>

          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px", marginRight:"10px"}} className="material-symbols-outlined">calendar_month</span>
              <select style={{fontSize:'16px'}} onChange={changeDateValue}>
                {dates?.map(date=>(
                  <option>{date.getFullYear()}-{date.getMonth()+1}-{date.getDate()}</option>
                ))}
              </select>
          </div>
                  
          <div style={{display:"flex",alignItems:"center"}}>
            <span style={{fontSize:"30px", marginRight:"10px"}} className="material-symbols-outlined">history</span>
              <select onChange={changeStartTimeValue} style={{fontSize:'16px'}}>
                {times?.map(time=>(
                  <option>{time}</option>
                ))}
              </select>
              <div style={{margin:'10px', fontSize:'16px'}}>~</div>
              <select onChange={changeEndTimeValue} style={{fontSize:'16px'}}>
                {times?.map(time=>(
                  <option>{time}</option>
                ))}
              </select>
          </div>
          <button onClick={fetchField}>조회</button>
      </div>
      <hr/>
      
      {field?.map((field) =>{
        if(field){
          return(
          <Field fetchField={fetchField}field={field} date={dateValue} startTime={startTimeValue} endTime={endTimeValue}/>)
        }     
        })}
    </div>
    
    </>
  )
}
export default ReservePage
