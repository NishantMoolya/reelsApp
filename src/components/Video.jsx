import React, { useEffect, useState } from 'react'
import '../styles/video.css'
import useVideo from '../hooks/useVideo';
import { NavLink } from 'react-router-dom';
import { updateLikes } from '../services/api/video/controllers/updateLikes';
import userAvatar from '../assets/person1.jpg';

const Video = ({ video, active, videoid, userid, likes, username, videosLikedList }) => {
    
    const { videoRef,previewRef,timeLineRef,previewTimestamp,playVideo,handleTimeLineProgress,handleMouseSeek,handleClickSeek,handleTimeLinePreview } = useVideo();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    
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
        liked?setLikeCount(prev => prev-1):setLikeCount(prev => prev+1);
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
                <span className={`text-2xl absolute right-3 top-1/2 flex flex-col items-center z-20 ${liked?'text-red-500':null}`} onClick={handleLikes}>{liked?<i className="fa-solid fa-heart"></i>:<i className="fa-regular fa-heart"></i>}<p className='text-base font-semibold text-white'>{likeCount < 1000?likeCount:`${likeCount/1000}k`}</p></span>
                <div className='absolute z-20 bottom-10 left-4 flex items-center gap-2'>
                    <img src={userAvatar} alt="user avatar" className='h-10 w-10 rounded-full object-cover' />
                    <p className='capitalize text-base font-semibold'>{username}</p>
                </div>
                <div className='video_timeline' ref={timeLineRef} onClick={handleClickSeek} onMouseMove={handleTimeLinePreview} onMouseLeave={handleMouseSeek}>
                    <div ref={previewRef} className='preview_container'><p className='text-center font-semibold text-lg'>{previewTimestamp}</p></div>
                    <span className='preview_pointer'></span>
                </div>
            </div>
        </div>
    )
}

export default Video