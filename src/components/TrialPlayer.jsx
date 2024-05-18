import React from 'react'

const TrialPlayer = () => {
  return (
    <div>
        <div style={{position:"relative",paddingTop:"56.25%"}}>
            {/* <iframe src={"https://iframe.mediadelivery.net/embed/243136/aa0598aa-05f6-4885-b42d-af6e28147939?autoplay=true&loop=true&muted=true&preload=true&responsive=true"} title='reels' loading={'lazy'} style={{border:0,position:"absolute",top:0,height:"200px",width:"300px"}} allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true}></iframe> */}
        </div>
        {/* <video src="https://vz-e75f48af-b1c.b-cdn.net/aa0598aa-05f6-4885-b42d-af6e28147939/play_480p.mp4" autoPlay muted></video> */}
        <video src="https://iframe.mediadelivery.net/embed/243136/aa0598aa-05f6-4885-b42d-af6e28147939?autoplay=true&loop=true&muted=true&preload=true&responsive=true" autoPlay muted></video>
    </div>
  )
}

export default TrialPlayer