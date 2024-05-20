import { baseVideoUrl, cdnAccessKey } from "../../../config/supabase";

const uploadVideo = async (videoId,minResolution,binaryData) => {

    const uploadUrl = `${baseVideoUrl}/${videoId}?enabledResolutions=${minResolution}`;
    //upload binary video file
    const uploadOptions = {
        method: 'PUT',
        headers: {
            AccessKey: cdnAccessKey,
            "Content-Length":binaryData.byteLength,
            "Content-Type":"application/octet-stream"
        },
        body: binaryData
    };
    try {
    const uploadRes = await fetch(uploadUrl,uploadOptions);
    const uploadData = await uploadRes.json();
    console.log(uploadData);
    if(uploadData.statusCode === 200) return uploadData;
    else throw new Error('upload error');
} catch (err) {
        console.log(`an error in uploading:${err}`);
        return false;
}
}

export { uploadVideo };