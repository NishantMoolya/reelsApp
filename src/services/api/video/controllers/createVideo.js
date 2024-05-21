import { baseVideoUrl, cdnAccessKey } from "../../../config/supabase";

const createVideoObject = async (title,thumbnailTime) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            AccessKey: cdnAccessKey
        },
        body: JSON.stringify({ thumbnailTime: thumbnailTime, title: title })
    };
    const createUrl = baseVideoUrl;
    try {
        const response = await fetch(createUrl, options);
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            const { guid,videoLibraryId,title,dateUploaded,thumbnailFileName } = data;
            return { guid,videoLibraryId,title,dateUploaded,thumbnailFileName };
        } else {
            throw new Error("Cannot create video object");
        }
    } catch (err) {
        console.log(`an error occurred:${err}`);
        return false;
    }
}

export { createVideoObject };