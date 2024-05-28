import { supabase } from "../../../config/supabase";

const userLikedVideos = async (userid) => {
    try {
        let { data, error } = await supabase.from('profiles').select('videos_liked').eq('id',userid);
        if (error) throw new Error("User liked videos error");
        const [ videos_liked ] = data;
        return videos_liked.videos_liked;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { userLikedVideos };