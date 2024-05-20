import { baseVideoUrl, cdnAccessKey } from "../../../config/supabase";

const getVideoList = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            AccessKey: cdnAccessKey
        }
    };
    const listVideoUrl = `${baseVideoUrl}?page=1&itemsPerPage=10&orderBy=date`;
    try {  
        const response = await fetch(listVideoUrl, options)
        const data = await response.json();
        console.log(data);
        if(response.status === 200) return data;
        else throw new Error('an error in getting videos');
    } catch (err) {
        console.log(`an error in getting video list:${err}`);
        return null;
    }
}

export { getVideoList };