import { createContext, useState } from "react";

export const UserContext = createContext()

export default function UserProvider({children}){

  const [rightLogin,setRightLogin] = useState(false)
  const [accessToken,setAccessToken] = useState()
  const [idData,setIdData] = useState()
  return(
    <>
      <UserContext.Provider value={{rightLogin,setRightLogin,accessToken,setAccessToken,idData,setIdData}}>
        {children}
      </UserContext.Provider>
    </>
  )
}