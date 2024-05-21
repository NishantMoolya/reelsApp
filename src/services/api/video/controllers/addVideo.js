import { supabase } from "../../../config/supabase";

const addVideo = async (videoData) => {
    try {
        const { data, error } = await supabase.from('videos').insert([videoData]).select();
        //console.log(data, error);
        if(error) throw new Error("inserting video error");
        return true;
    } catch (err) {
        console.log(`an error occurred in adding user videos:${err}`);
        return false;
    }
}

export { addVideo };