import React, { useEffect, useRef, useState } from 'react'
import Video from './Video'
//import { videosList } from '../data/videosData';
import { getVideoList } from '../services/api/video/controllers/listVideos';
import { findResolutions, maxResolution, videoUrlCreator } from '../utilities/resolutionExtractor';

const ReelPlayer = ({ userid }) => {
  const videoContainerRef = useRef();
  const [activeVideo, setActiveVideo] = useState(0);
  const [videosList, setVideosList] = useState([]);
  const [videoIds, setVideoIds] = useState([]);
  
  const handleScroll = (e) => {
    //simple logic - just detect how far the present video is from the center of viewport

    const videos = videoContainerRef.current.children;
    let newActiveIndex = activeVideo;
    let closestDis = Infinity;
    for (let index = 0; index < videos.length; index++) {
      const rect = videos[index].getBoundingClientRect();
      const disFromCenter = Math.abs(rect.top + rect.height/2 - window.innerHeight/2);
      if (disFromCenter < closestDis) {
        closestDis = disFromCenter;
        newActiveIndex = index;
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

  useEffect(() => {
    getVideoList().then(videoList => {
      console.log(videoList);
      let videoUrlRaw = [];
      videoList.forEach(obj => {
        //const nums = findResolutions(obj);
        const resolution = obj.availableresolutions;
        const guid = obj.videoid;
        videoUrlRaw.push({guid,resolution});
        //setVideoUrlRaw(prev => ([...prev,{guid,resolution}]));
        //if (nums.length) {
          //const resolution = maxResolution(nums);
          //videoUrlRaw.push({guid,resolution});
        //}
      });
      const finalVideoUrl = videoUrlCreator(videoUrlRaw);
      console.log(finalVideoUrl);
      setVideosList(finalVideoUrl);
      setVideoIds(videoUrlRaw);
    });
  },[]);

  return (
    <div ref={videoContainerRef} className='reelplayer_frame shadow h-[560px] overflow-scroll snap-y snap-mandatory scroll-smooth bg-neutral-900 ' style={{ aspectRatio:"9/16"}}>
      {
        videosList.map((video, ind) => <Video key={videoIds[ind].guid} videoid={videoIds[ind].guid} video={video} userid={userid} active={activeVideo === ind} />)
      }
    </div>
  )
}

export default ReelPlayer