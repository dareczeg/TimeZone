//module.exports = {};

/**
 * Convert the time in miliseconds to to formatted value
 * @param {*} timeToConvert 
 * @returns formatted time
 */
//module.exports.timeToString = 
   function timeToString(time) {

   // Multiply by 1000 to get the seconds and by 3600 to get hours
   let hoursDifference = time / (60 * 60 * 1000);
   let hh = Math.floor(hoursDifference);

   // Multiply by 60 the difference between time and  no. of hours to get minutes
   let minutesDifference = (hoursDifference - hh) * 60;
   let mm = Math.floor(minutesDifference);

   // Multiply by 60 the difference between time and no. of minutes to get seconds
   let secondsDifference = (minutesDifference - mm) * 60;
   let ss = Math.floor(secondsDifference);

   // Display the time as a double digits 
   let hhFormatted = hh.toString().padStart(2, "0");
   let mmFormatted = mm.toString().padStart(2, "0");
   let ssFormatted = ss.toString().padStart(2, "0");
   return `${hhFormatted}:${mmFormatted}:${ssFormatted}`;
}


/**
 * Check if the current time is midnight
 * @param {Date} time 
 * @returns boolean
 */
//module.exports.isMidnight = 
   function isMidnight(time) {
   return time && time.getHours() < 1
      && time.getMinutes() < 1
      && time.getSeconds() < 5 ?
      true : false;
}

/**
* Check for the new week
* @param {*} time 
* @returns boolean
*/
//module.exports.isNewWeek = 
   function isNewWeek(time) {
   if (time) {
      return (time.getDay() == 1) ? true : false;
   } else return false;
}

/**
* Check if the new month 
* @param {*} time 
* @returns boolean
*/
//module.exports.isNewMonth = 
   function isNewMonth(time) {
   if (time) {
      let yesterday = new Date();
      yesterday.setDate(time.getDate() - 1);
      return (yesterday.getMonth() != time.getMonth()) ? true : false;
   } else return false;

}
