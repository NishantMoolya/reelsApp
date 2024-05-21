import { fileToBinary } from '../services/api/video/helpers/binaryConverter';
import { createVideoObject } from '../services/api/video/controllers/createVideo';
import { uploadVideo } from '../services/api/video/controllers/uploadVideo';
import { updateUserVideosList } from '../services/api/video/controllers/updateUserVideosList';
import { useState } from 'react';
import { addVideo } from '../services/api/video/controllers/addVideo';

const useUpload = () => {
    const [status, setStatus] = useState('Change video');
    const uploader = async (title,videoData,userId) => {
        setStatus('processing');
        const minResolution = '720p';

        const binaryData = await fileToBinary(videoData);
        if(binaryData !== false){
            setStatus('creating');
            let videoMetadata = await createVideoObject(title,1000);
            if(videoMetadata !== false){
                const videoId = videoMetadata.guid;
                setStatus('uploading');
                const uploadData = await uploadVideo(videoId,minResolution,binaryData);
                if(uploadData !== false && uploadData?.statusCode === 200){
                    setStatus('updating');
                    const userData = await updateUserVideosList(userId,videoId);
                    if(userData){
                         console.log('user updated');
                         const { dateUploaded,guid,thumbnailFileName,title,videoLibraryId} = videoMetadata;
                         const videoObj = { videoid:guid,videolibraryid:videoLibraryId,title:title,availableresolutions:'720',thumbnailfilename:thumbnailFileName,likes:0,dateuploaded:dateUploaded };
                         setStatus('adding video');
                         const addedVideo = await addVideo(videoObj);
                         if (addedVideo) {
                            console.log('added video process completed');
                            setStatus('completed');
                         }else{
                            console.log('adding video failed');
                            setStatus('adding video failed');
                         }
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