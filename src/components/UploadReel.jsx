import React, { useEffect, useRef, useState } from 'react'
import { isResolution } from '../utilities/uploadHelper';
import { supabase } from '../services/config/supabase';
import useUpload from '../hooks/useUpload';

const UploadReel = () => {
    const inputFileRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const [videoTitle, setVideoTitle] = useState("");
    const [canUpload, setCanUpload] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const { status,uploader } = useUpload();

    const selectFile = (e) => {
        if(inputFileRef.current){
            inputFileRef.current.click();
        }
    }

    const handleFile = (e) => {
        try {
        const file = inputFileRef.current.files[0];
        console.log(file);
        if(file){
            setVideoSrc(URL.createObjectURL(file));
            //console.log(userId);
        }
    } catch (err) {
            console.log(`error in uploading file:${err}`);
    }
    }

    const handleRestrictions = (e) => {
        const width = e.target.videoWidth;
        const height = e.target.videoHeight;
        console.log(`Resolution: ${width} x ${height}`);
        if(isResolution(width,height,720)) {
            setCanUpload(true);
        }else{
            alert(`Resolution: ${width}x${height} cannot upload please choose video with minimum 720p resolution(720x1280)`);
            setCanUpload(false);
        }
    }

    const handleUpload = async () => {
        if (videoSrc !== null && videoTitle !== "") {
            const file = inputFileRef.current.files[0];
            if (userInfo) {   
                setCanUpload(false);
                //console.log("hello");
                await uploader(videoTitle.trim(),file,userInfo.id,userInfo.name);
                setCanUpload(true);
                setVideoTitle("");
                setVideoSrc(null);
            }
        }else{
            alert("Fill neccessary fields");
        }
    }

    useEffect(() => {
        const getUserProfile = async () => {
            try {
            const res = await supabase.auth.getUser();
            const { user } = res.data;
            console.log(user);
            return {id:user.id,name:user.user_metadata.name};
          } catch (err) {
              console.log(`an error in getting user profile:${err}`);
              return null;
          }
          }
          getUserProfile().then(userData => setUserInfo(userData));
    },[]);

  return (
    <div className='reelplayer_frame h-[560px] flex flex-col gap-2 overflow-scroll scroll-smooth bg-white p-2' style={{ aspectRatio:"9/16"}}>
        <div onClick={selectFile} className='flex flex-col gap-2 justify-center items-center h-1/2 p-2 border-dotted border-black border-2 rounded'>
            <input ref={inputFileRef} type="file" name="video" accept='video/mp4' onChange={handleFile} hidden />
            {videoSrc && <video className='flex-1' src={videoSrc} onLoadedMetadata={handleRestrictions} style={{ aspectRatio:"9/16",maxHeight:'80%' }}></video>}
            <button className='capitalize text-base font-semibold self-center bg-blue-500 text-white rounded py-1 px-3 border-none'>{videoSrc?status:"select video"}</button>
        </div>
        <div className='flex flex-col gap-2 p-2'>
            <p className='text-lg font-semibold capitalize text-slate-500'>specifications</p>
            <div className='flex justify-between text-slate-400 capitalize font-semibold'>
                <p>file type</p>
                <p>.mp4</p>
            </div>
            <div className='flex justify-between text-slate-400 capitalize font-semibold'>
                <p>resolution</p>
                <p>720p</p>
            </div>
            <div className='flex justify-between text-slate-400 capitalize font-semibold'>
                <p>aspect ratio</p>
                <p>9:16</p>
            </div>
            <div className='flex justify-between text-slate-400 capitalize font-semibold'>
                <p>length</p>
                <p>	&lt; 1 minute</p>
            </div>
        </div>
        <div className='flex flex-col gap-1'>
            <label htmlFor="title" className='text-base font-semibold text-slate-500'>Title for the video</label>
            <input type="text" name='title' value={videoTitle} onChange={(e) => setVideoTitle(e.currentTarget.value)} className='border border-slate-400 text-base py-1 px-2 rounded' placeholder='Descriptive title' />
        </div>
        <button className={`capitalize text-base font-semibold self-center bg-blue-500 text-white rounded py-1 px-3 border-none disabled:bg-blue-300 ${videoSrc?"cursor-pointer":"cursor-not-allowed"}`} disabled={canUpload?false:true} onClick={handleUpload}>upload</button>
    </div>
  )
}

export default UploadReel