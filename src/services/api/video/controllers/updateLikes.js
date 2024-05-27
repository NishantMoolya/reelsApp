import { supabase } from "../../../config/supabase";

const updateLikes = async (liked,videoid,userid) => {
    let amount = 1;
    try {    
    if (!liked) {
        amount = -1;
        let { data, error } = await supabase.rpc('update_likes', {amount,video_id:videoid});
        console.log("hello running like",data, error);
        if(error) throw new Error("inserting video error");
        else {
            let { liked, likedError } = await supabase.rpc('unlike_video', {userid,video_id:videoid});
            console.log("liking running like",liked, likedError);
            if(likedError) throw new Error("inserting video error");
        }
        return true;
    }else{
        let { data, error } = await supabase.rpc('update_likes', {amount,video_id:videoid});
        console.log("hello running like",data, error);
        if(error) throw new Error("inserting video error");
        else {
            let { liked, likedError } = await supabase.rpc('like_video', {userid,video_id:videoid});
            if(likedError) throw new Error("inserting video error");
        }
        return true;
    }
    } catch (err) {
        console.log(`an error occurred in adding user videos:${err}`);
        return false;
    }
}

export { updateLikes };