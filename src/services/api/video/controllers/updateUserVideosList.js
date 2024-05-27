import { supabase } from "../../../config/supabase";

const updateUserVideosList = async (userId,videoId) => {
    try {
    const { data,error } = await supabase.rpc('update_user_uploads',{ userid:userId,video_metadata:{videoId} });
    console.log("hello running",data);
    if(error) throw new Error("User fetch error");
    return true;
} catch (err) {
    console.log(`an error occurred in updating user videos:${err}`);
    return false;
}
}

export { updateUserVideosList };