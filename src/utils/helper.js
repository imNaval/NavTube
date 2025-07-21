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

export const isShortVideo = (video) => {
    if (!video) return false;
    
    // Method 1: Check if video has "#shorts" in title or tags
    const title = video.snippet?.title?.toLowerCase() || '';
    const tags = video.snippet?.tags || [];
    const description = video.snippet?.description?.toLowerCase() || '';
    
    const hasShortsTag = title.includes('#shorts') || 
                        title.includes('shorts') ||
                        tags.some(tag => tag.toLowerCase().includes('shorts')) ||
                        description.includes('#shorts') ||
                        description.includes('shorts');
    
    // Method 2: Check duration (YouTube Shorts are typically under 60 seconds)
    let isShortDuration = false;
    if (video.contentDetails?.duration) {
        const duration = video.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        if (match) {
            const hours = parseInt(match[1] || 0);
            const minutes = parseInt(match[2] || 0);
            const seconds = parseInt(match[3] || 0);
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            isShortDuration = totalSeconds <= 60; // YouTube Shorts are under 60 seconds
        }
    }
    
    // Method 3: Check if video ID matches shorts pattern (some shorts have specific patterns)
    const videoId = video.id || video.id?.videoId;
    const isShortsId = videoId && (
        videoId.length === 11 && // Standard YouTube video ID length
        (videoId.startsWith('shorts') || videoId.includes('shorts'))
    );
    
    // Return true if any of the methods indicate it's a short
    return hasShortsTag || isShortDuration || isShortsId;
}

export const formatDuration = (duration) => {
    if (!duration) return '';
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '';
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}
  