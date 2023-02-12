// import moment from "moment";

var fromNow = require("from-now");
export const mongoDBDateStringToReadable = (dt) => {
  try {
    const d = new Date(dt);
    const fromNowText = fromNow(dt);
    if(fromNowText==="now"){
      return fromNowText;
    }
    return `${fromNowText} ago`;
  } catch (error) {
    console.log(error);
    return `minutes ago`;
  }
};

export const formatYYYYMMDD = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
