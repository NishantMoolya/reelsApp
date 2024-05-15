import React, { useEffect, useRef, useState } from 'react'

const Video = () => {
    const [play, setPlay] = useState(false);
    const [openDropDown, setOpenDropDown] = useState(false);
    const videoRef = useRef();

    const playVideo = () => {
        if(play){
            videoRef.current.pause();
            setPlay(false);
        }else{
            videoRef.current.play();
            setPlay(true);
        }
    }

    const handleDropDown = () => {
        setOpenDropDown(prev => !prev);
    }

    useEffect(() => {
        playVideo();
    },[]);

  return (
    <div className='w-full h-full snap-start relative'>
        <video ref={videoRef} onClick={playVideo} className='w-full h-full object-fill z-10 relative' src={"https://assets.mixkit.co/videos/preview/mixkit-ocean-waves-bursting-on-the-shore-of-the-coast-4078-large.mp4"} loop muted></video>
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-transparent text-white'>
            <span className='absolute right-4 top-4 z-20 flex flex-col' onClick={handleDropDown}>
                {openDropDown?<i className="fa-solid fa-xmark text-2xl self-end"></i>:<i className="fa-solid fa-ellipsis-vertical text-2xl self-end"></i>}
                {openDropDown && <ul className='flex flex-col gap-2 py-2 px-4 bg-white shadow rounded-sm text-neutral-500 capitalize divide-y-2'>
                    <li>my profile</li>
                    <li>upload</li>
                    <li>description</li>
                </ul>}
            </span>
            <span  className='text-2xl absolute right-3 top-1/2 z-20'><i className="fa-regular fa-heart"></i></span>
        </div>
    </div>
  )
}

export default Video