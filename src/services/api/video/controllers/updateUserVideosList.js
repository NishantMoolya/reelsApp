import { supabase } from "../../../config/supabase";

const updateUserVideosList = async (userId,videoId) => {
    try {
    const { data: profile, error: fetchError } = await supabase.from('profiles').select('videos').eq('id', userId).single();
    if(fetchError) throw new Error("User fetch error");
    const updatedVideos = profile.videos ? [...profile.videos, { videoId: videoId }] : [{ videoId: videoId }];
    const { data, error } = await supabase.from('profiles').update({ videos: updatedVideos }).eq('id', userId);
    if(error) throw new Error("User fetch error");
    return true;
} catch (err) {
    console.log(`an error occurred in updating user videos:${err}`);
    return false;
}
}

export { updateUserVideosList };