export const changeText = (num)=>{

  num = Number(num)
  num = Math.round(num)
  switch (num){
    case 1:
      return "최하";
    case 2:
      return "하";
    case 3:
      return "중하";
    case 4:
      return "중";
    case 5:
      return "중상";
    case 6:
      return "상";
    case 7:
      return "최상";
    default:
      console.log(num,'switch문 error입니다.')
  }
}

