import React, { useEffect, useRef, useState } from 'react'
import '../styles/video.css'

const Video = ({ video,active,startFromBegin }) => {
    const [play, setPlay] = useState(true);
    //const [progress, setProgress] = useState(0);
    const [openDropDown, setOpenDropDown] = useState(false);
    const videoRef = useRef();
    const timeLineRef = useRef();

    const playVideo = () => {
        if(play){
            videoRef.current.pause();
            setPlay(false);
        }else{
            videoRef.current.play();
            setPlay(true);
        }
    }

    const handleTimeLine = (e) => {
        const progress = (videoRef.current.currentTime/ videoRef.current.duration);
        timeLineRef.current.style.setProperty("--preview-position", progress);
    }

    const handleDropDown = () => {
        setOpenDropDown(prev => !prev);
    }

useEffect(() => {
    const reel = videoRef.current;
    if(active){
        reel.currentTime = 0;
        reel.play();
        setPlay(true);
    }else{
        reel.pause();
        setPlay(false);
    }
},[active]);

  return (
    <div className='w-full h-full snap-start relative'>
        {/* video */}
        <video ref={videoRef} onClick={playVideo} className='w-full h-full object-fill z-10 relative' src={video.url} onTimeUpdate={handleTimeLine} loop muted></video>
        {/* video elements container */}
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-transparent text-white'>
            {/* dropdown box */}
            <span className='absolute right-4 top-4 z-20 flex flex-col' onClick={handleDropDown}>
                {openDropDown?<i className="fa-solid fa-xmark text-2xl self-end"></i>:<i className="fa-solid fa-ellipsis-vertical text-2xl self-end"></i>}
                {openDropDown && <ul className='flex flex-col gap-2 py-2 px-4 bg-white shadow rounded-sm text-neutral-500 capitalize divide-y-2'>
                    <li>my profile</li>
                    <li>upload</li>
                    <li>description</li>
                </ul>}
            </span>
            <span  className='text-2xl absolute right-3 top-1/2 z-20'><i className="fa-regular fa-heart"></i></span>
            <div className='video_timeline' ref={timeLineRef}></div>
        </div>
    </div>
  )
}

export default Video