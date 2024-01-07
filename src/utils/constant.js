export const CREDENTIALS = process.env.REACT_APP_CREDENTIALS

export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=" + CREDENTIALS

// export const MORE_VIDEO_API = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50' //&pageToken=[NEXT_PAGE_TOKEN]&key=[YOUR_API_KEY]' 
export const MORE_VIDEO_API = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&key=' + CREDENTIALS
// export const KEY = '&key=' +CREDENTIALS

export const SEARCH_VIDEO_API = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&key=' + CREDENTIALS //&q=javascript

// export const YOUTUBE_SEARCH_SUGGESTION_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
export const YOUTUBE_SEARCH_SUGGESTION_API = "https://coder-food-server.vercel.app/api/youtube/get/search?q="

export const LIVE_CHAT_LIMIT = 100

export const corsproxy = "https://thingproxy.freeboard.io/fetch/"

export const LOGO_URL = 'https://images.thequint.com/thequint%2F2017-08%2Fd9076f8c-8471-4a3a-b7e4-32ae737e2a55%2Fe0181385-8d98-4475-9def-b4bdb207c2db.png?rect=0%2C0%2C795%2C447&auto=format%2Ccompress&fmt=webp&width=720&w=1200'