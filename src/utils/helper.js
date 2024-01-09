export const modifyNumber = (val) =>{
    if(val / 1000000 > 1) return `${parseFloat(val/1000000).toFixed(2)}M`

    else if(val / 1000 > 1) return `${parseFloat(val/1000).toFixed(2)}K`

    else return val;
}

export const getRelativeTimeDifference = (inputDate) =>{
    const currentDate = new Date();
    const inputDateTime = new Date(inputDate);
    
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - inputDateTime;
  
    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    // Determine the appropriate time unit
    if (years >= 1) {
      return years + (years === 1 ? ' year ago' : ' years ago');
    } else if (months >= 1) {
      return months + (months === 1 ? ' month ago' : ' months ago');
    } else if (weeks >= 1) {
      return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
    } else if (days >= 1) {
      return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours >= 1) {
      return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 1) {
      return minutes +  ' minutes ago';
    } else {
        return 'just now'
    }
  }
  
//   const inputDate = '2024-01-03T14:00:11Z';
//   const relativeTime = getRelativeTimeDifference(inputDate);
//   console.log(relativeTime);
  