import { baseVideoUrl, cdnAccessKey, supabase } from "../../../config/supabase";

const getVideoList = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            AccessKey: cdnAccessKey
        }
    };
    //const listVideoUrl = `${baseVideoUrl}?page=1&itemsPerPage=10&orderBy=date`;
    
    const start = 0;
    const end = 9;
    try {  
        const { data: videos, error } = await supabase.from('videos').select('videoid,availableresolutions,likes,username').range(start, end);
        //const response = await fetch(listVideoUrl, options)
        //const data = await response.json();
        //console.log(videos);
        //if(response.status === 200) return data;
        if(videos) return videos;
        else throw new Error('an error in getting videos');
    } catch (err) {
        console.log(`an error in getting video list:${err}`);
        return null;
    }
}

export { getVideoList };