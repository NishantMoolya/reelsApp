import React, { useEffect, useState } from 'react'
import '../styles/video.css'
import useVideo from '../hooks/useVideo';
import { NavLink } from 'react-router-dom';
import { updateLikes } from '../services/api/video/controllers/updateLikes';

const Video = ({ video, active, videoid, userid, videosLikedList }) => {
    
    const { videoRef,previewRef,timeLineRef,previewTimestamp,playVideo,handleTimeLineProgress,handleMouseSeek,handleClickSeek,handleTimeLinePreview } = useVideo();
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        const reel = videoRef.current;
        if (active) {
            reel.currentTime = 0;
            reel.play();
        } else {
            reel.pause();
        }
    }, [active]);
    
    useEffect(() => {
        if (videosLikedList.includes(videoid)) { 
            setLiked(true);
        }else{
            setLiked(false);
        }
    }, [videosLikedList]);
    
    const [openDropDown, setOpenDropDown] = useState(false);
    const handleDropDown = () => {
        setOpenDropDown(prev => !prev);
    }

    const handleLikes = async () => {
        setLiked(prev => !prev);
        updateLikes(!liked,videoid,userid);
    }

    return (
        <div className='w-full h-full snap-start relative'>
            {/* video */}
            <video ref={videoRef} onClick={playVideo} className='w-full h-full object-fill z-10 relative' src={video.url} onTimeUpdate={handleTimeLineProgress} loop muted></video>
            {/* video elements container */}
            <div className='absolute top-0 bottom-0 right-0 left-0 bg-transparent text-white'>
                {/* dropdown box */}
                <span className='absolute right-4 top-4 z-20 flex flex-col' onClick={handleDropDown}>
                    {openDropDown ? <i className="fa-solid fa-xmark text-2xl self-end"></i> : <i className="fa-solid fa-ellipsis-vertical text-2xl self-end"></i>}
                    {openDropDown && <ul className='flex flex-col gap-2 py-2 px-4 bg-white shadow rounded-sm text-neutral-500 capitalize divide-y-2'>
                        <li><NavLink to={'/profile'}>my profile</NavLink></li>
                        <li><NavLink to={'/upload'}>upload</NavLink></li>
                        <li><NavLink to={'/'}>description</NavLink></li>
                    </ul>}
                </span>
                <span className={`text-2xl absolute right-3 top-1/2 flex flex-col items-center z-20 ${liked?'text-red-500':null}`} onClick={handleLikes}>{liked?<i className="fa-solid fa-heart"></i>:<i className="fa-regular fa-heart"></i>}<p className='text-base font-semibold text-white'>12</p></span>
                <div className='video_timeline' ref={timeLineRef} onClick={handleClickSeek} onMouseMove={handleTimeLinePreview} onMouseLeave={handleMouseSeek}>
                    <div ref={previewRef} className='preview_container'><p className='text-center font-semibold text-lg'>{previewTimestamp}</p></div>
                    <span className='preview_pointer'></span>
                </div>
            </div>
        </div>
    )
}

export default Video