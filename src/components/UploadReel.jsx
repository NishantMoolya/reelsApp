import React, { useRef, useState } from 'react'

const UploadReel = () => {
    const inputFileRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState(null);
    const selectFile = (e) => {
        if(inputFileRef.current){
            inputFileRef.current.click();
        }
    }
    const handleFile = (e) => {
        try {
        const file = inputFileRef.current.files[0];
        console.log(file);
        setVideoSrc(URL.createObjectURL(file));
    } catch (err) {
            console.log(`error in uploading file:${err}`);
    }
    }
  return (
    <div className='reelplayer_frame h-[560px] flex flex-col gap-2 overflow-scroll scroll-smooth bg-white p-2' style={{ aspectRatio:"9/16"}}>
        <div onClick={selectFile} className='flex flex-col gap-2 justify-center items-center h-1/2 p-2 border-dotted border-black border-2 rounded'>
            <input ref={inputFileRef} type="file" name="video" accept='video/mp4' onChange={handleFile} hidden />
            {videoSrc && <video className='flex-1' src={videoSrc} style={{ aspectRatio:"9/16",maxHeight:'80%' }}></video>}
            <button className='capitalize text-base font-semibold self-center bg-blue-500 text-white rounded py-1 px-3 border-none'>{videoSrc?"change video":"select video"}</button>
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
            <input type="text" name='title' className='border border-slate-400 text-base py-1 px-2 rounded' placeholder='Descriptive title' />
        </div>
        <button className={`capitalize text-base font-semibold self-center bg-blue-500 text-white rounded py-1 px-3 border-none disabled:bg-blue-300 ${videoSrc?"cursor-pointer":"cursor-not-allowed"}`} disabled={videoSrc?false:true}>upload</button>
    </div>
  )
}

export default UploadReel