import React, { useEffect, useRef, useState } from 'react'
import Video from './Video'

const ReelPlayer = () => {
  const videoContainerRef = useRef();
  const [activeVideo, setActiveVideo] = useState(0);
  
  const handleScroll = (e) => {
    const videos = videoContainerRef.current.children;
    let newActiveIndex = activeVideo;
    for (let index = 0; index < videos.length; index++) {
      const rect = videos[index].getBoundingClientRect();
      if(rect.top >= 0 && rect.bottom <= window.innerHeight){
        newActiveIndex = index;
        break;
      }
    }
    if (newActiveIndex !== activeVideo) {
      setActiveVideo(newActiveIndex);
    }
  }

  useEffect(() => {
    const container = videoContainerRef.current;
    container.addEventListener("scroll",handleScroll);
    return () => container.removeEventListener('scroll',handleScroll);
  },[activeVideo]);

  const videos = [{
    url: "https://vz-e75f48af-b1c.b-cdn.net/aa0598aa-05f6-4885-b42d-af6e28147939/play_480p.mp4"
  },
{
  url:"https://vz-e75f48af-b1c.b-cdn.net/bcfa5df6-f819-4775-8549-abe56749a307/play_480p.mp4"
},
{
  url: "https://vz-e75f48af-b1c.b-cdn.net/aa0598aa-05f6-4885-b42d-af6e28147939/play_480p.mp4"
}];

  return (
    <div ref={videoContainerRef} className='shadow h-[560px] overflow-scroll snap-y snap-mandatory scroll-smooth bg-neutral-900' style={{ aspectRatio:"9/16"}}>
      {
        videos.map((video, ind) => <Video key={ind} video={video} active={activeVideo === ind} />)
      }
    </div>
  )
}

export default ReelPlayer