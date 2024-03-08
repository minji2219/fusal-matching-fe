import { createContext, useState } from "react";

export const PastHistoryContext = createContext();

export default function PastHistoryProvider({ children }) {
  const [pastHistory, setPastHistory] = useState(false);
  const [matchingId, setMatchingId] = useState();
  const [oppositeTeamId, setOppositeTeamId] = useState();
  const [oppositeTeamEvalState, setOppositeTeamEvalState] = useState();
  const [stadiumEvalState, setStadiumEvalState] = useState();
  // const [stadium,setStadium] = useState()
  // const [BDtitle,setBDTitle] = useState()
  return (
    <>
      <PastHistoryContext.Provider
        value={{
          pastHistory,
          setPastHistory,
          matchingId,
          setMatchingId,
          oppositeTeamId,
          setOppositeTeamId,
          oppositeTeamEvalState,
          setOppositeTeamEvalState,
          stadiumEvalState,
          setStadiumEvalState,
          // stadium,setStadium,
          // BDtitle,setBDTitle,
        }}
      >
        {children}
      </PastHistoryContext.Provider>
    </>
  );
}
