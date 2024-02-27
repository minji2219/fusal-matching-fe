export const changeText = (num = 1) => {
  num = Number(num);
  num = Math.round(num);
  let level;
  switch (num) {
    case 1:
      level = "최하";
      break;
    case 2:
      level = "하";
      break;
    case 3:
      level = "중하";
      break;
    case 4:
      level = "중";
      break;
    case 5:
      level = "중상";
      break;
    case 6:
      level = "상";
      break;
    case 7:
      level = "최하";
      break;
    default:
      console.log(num, "switch문 error입니다.");
  }
  return level;
};
