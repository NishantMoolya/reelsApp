const fileToBinary = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const binaryData = reader.result;
            resolve(binaryData);
        };
        reader.onerror = () => {
            reject(new Error('Unable to read the file as binary data'));
        };
        reader.readAsArrayBuffer(file);
    });
};

const uploadVideo = async (title,videoData) => {
    //initial config to create video
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            AccessKey: 'fc4499cd-111b-4e5f-9d9e94d92e43-c544-4011'
        },
        body: JSON.stringify({thumbnailTime: 1000, title:title})
    };
    const createUrl = 'https://video.bunnycdn.com/library/243136/videos';

    const response = await fetch(createUrl, options);
    const data = await response.json();
    console.log(data);

    //extract videoID
    const videoId = data.guid;
    const minResolution = '720p';
    const uploadUrl = `https://video.bunnycdn.com/library/243136/videos/${videoId}?enabledResolutions=${minResolution}`;

    //convert into binary data
    const binaryData = await fileToBinary(videoData);

    //upload binary video file
    const uploadOptions = {
        method: 'PUT',
        headers: {
            AccessKey: 'fc4499cd-111b-4e5f-9d9e94d92e43-c544-4011',
            "Content-Length":binaryData.byteLength,
            "Content-Type":"application/octet-stream"
        },
        body: binaryData
    };
    const uploadRes = await fetch(uploadUrl,uploadOptions);
    const uploadData = await uploadRes.json();
    console.log(uploadData);
}

export { uploadVideo };