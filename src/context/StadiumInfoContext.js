
import { createContext } from "react";

let stadiums =[]
export const StadiumInfoContext = createContext()



export default  function StadiumInfoProvider({children}){
  
  const value = stadiums
  console.log(stadiums)

  return(
    <>
      <StadiumInfoContext.Provider value={{value}}>
        {children}
      </StadiumInfoContext.Provider>
    </>
  )
}