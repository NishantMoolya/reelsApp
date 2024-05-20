const findResolutions = (videoObj) => {
        let numArr = [];
        if (videoObj.availableResolutions) { 
            const res = videoObj.availableResolutions.split(',');
            res.map(str => {
                const strnum = str.split('p')[0];
                const num = Number(strnum);
                numArr.push(num);
            })
        }
        return numArr;
}
const maxResolution = (numArr) => {
    let maxRes = numArr[0];
    numArr.forEach(element => {
        if (maxRes < element) {
            maxRes = element;
        }
    });
    return maxRes;
}
const videoUrlCreator = (videoUrlRaw) => {
    let videoUrls = [];
    videoUrlRaw.forEach(ele => {
        const url = `https://vz-e75f48af-b1c.b-cdn.net/${ele.guid}/play_${ele.resolution}p.mp4`;
        videoUrls.push({url});
    });
    return videoUrls;
}

// videoList = [{guid:1235454,availableResolutions:"720p,240p,360p,480p" },{guid:14656,availableResolutions:"240p,360p,480p" }];
// let videoUrlRaw = [];
// videoList.forEach(obj => {
//     const nums = findResolutions(obj);
//     const big = maxResolution(nums);
//     console.log(big);
//     videoUrlRaw.push({ guid:obj.guid,resolution:big});
// });
// const finalVideoUrl = videoUrlCreator(videoUrlRaw);
// console.log(finalVideoUrl);

export { findResolutions,maxResolution,videoUrlCreator };