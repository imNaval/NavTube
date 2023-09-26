import React from 'react'

const WatchPage = () => {
    return (
        <div className='px-5'>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/Lz51wnb_cSU?si=7bVJ0B1AOmBXB6RN" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
            ></iframe>
        </div>
    )
}

export default WatchPage

//frameborder -> frameBorder
//allowfullscreen -> AllowFullScreen
//iframe->w->1200 h->600
//src="https://www.youtube.com/embed/Lz51wnb_cSU?si=7bVJ0B1AOmBXB6RN" 
//src={"https://www.youtube.com/embed/"+ video_id +"?si=7bVJ0B1AOmBXB6RN"}
