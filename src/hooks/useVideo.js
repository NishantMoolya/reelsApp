import { useRef, useState } from 'react'
import { formatDuration } from '../utilities/formatter';

const useVideo = () => {
    const videoRef = useRef(null);      //to refer video element
    const timeLineRef = useRef(null);   //to refer progress bar of video element
    const previewRef = useRef(null);    //to refer virtual preview of progress bar(fake timeline)
    const [previewTimestamp, setPreviewTimestamp] = useState(0);    //to display timestamp of preview timeline

    //to toggle play state of video
    const playVideo = () => {
        try {
        if(videoRef.current.paused){
            videoRef.current.play();
        }else{
            videoRef.current.pause();
        }
    } catch (err) {
            console.log(`error in playing video:${err}`);
            alert("an error occurred in loading video");
    }
    }

    //to sync timeline of video progress
    const handleTimeLineProgress = (e) => {
        const progress = (videoRef.current.currentTime/ videoRef.current.duration);
        timeLineRef.current.style.setProperty("--progress-position", progress);
        //setPreviewTimestamp(formatDuration(videoRef.current.currentTime));  //to display current timeline
    }

    //function to seek on any timestamp using click event by user
    const handleClickSeek = (e) => {
        const rect = timeLineRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    }

    //function to seek on any timestamp using mousemove event by user
    const handleMouseSeek = (e) => {
        timeLineRef.current.style.setProperty("--preview-position", 0);
        handleClickSeek(e);
    }

    //to display the preview of timeline where user is hovering
    const handleTimeLinePreview = (e) => {
        const rect = timeLineRef.current.getBoundingClientRect();
        const percent = Math.min(Math.max(0,e.clientX - rect.x),rect.width)/rect.width;

        const newTime = percent * videoRef.current.duration;  //setting the current preview time
        setPreviewTimestamp(formatDuration(newTime));

        let previewContainer = Math.min(Math.max(percent,0.08),0.92);  //min value = 0.08 max value = 0.92
        previewRef.current.style.setProperty("--preview-container-position", previewContainer); //preview-container display
        timeLineRef.current.style.setProperty("--preview-position", percent); //preview-pointer display
    }
    return { videoRef,timeLineRef,previewRef,previewTimestamp,playVideo,handleTimeLineProgress,handleClickSeek,handleMouseSeek,handleTimeLinePreview };
}

export default useVideo;