import { supabase } from "../../../config/supabase";

const updateLikes = async (liked,videoid = "415bcdsjk") => {
    let amount = 1;
    if (!liked) {
        amount = -1;
    }
    try {    
let { data, error } = await supabase.rpc('update_likes', {amount,videoid})
        //console.log(data, error);
        if(error) throw new Error("inserting video error");
        return true;
    } catch (err) {
        console.log(`an error occurred in adding user videos:${err}`);
        return false;
    }
}

export { updateLikes };