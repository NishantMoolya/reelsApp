import { fileToBinary } from '../services/api/video/helpers/binaryConverter';
import { createVideoObject } from '../services/api/video/controllers/createVideo';
import { uploadVideo } from '../services/api/video/controllers/uploadVideo';
import { updateUserVideosList } from '../services/api/video/controllers/updateUserVideosList';
import { useState } from 'react';

const useUpload = () => {
    const [status, setStatus] = useState('Change video');
    const uploader = async (title,videoData,userId) => {
        setStatus('processing');
        const minResolution = '720p';

        const binaryData = await fileToBinary(videoData);
        if(binaryData !== false){
            setStatus('creating');
            const videoId = await createVideoObject(title,1000);
            if(videoId !== false){
                setStatus('uploading');
                const uploadData = await uploadVideo(videoId,minResolution,binaryData);
                if(uploadData !== false && uploadData?.statusCode === 200){
                    setStatus('updating');
                    const userData = await updateUserVideosList(userId,videoId);
                    if(userData){
                         console.log('user updated process completed');
                         setStatus('completed');
                        }
                    else {
                        console.log('user not updated');
                        setStatus('update failed');
                    }
                }else{
                    console.log('upload failed');
                    setStatus('upload failed');
                }
            }else{
                console.log('cannot generate videoid');
                setStatus('create failed');
            }
        }else{
            console.log('cannot convert into binary format');  
            setStatus('proccessing failed');
        }
    }

    return { uploader,status };
}

export default useUpload