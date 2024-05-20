import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const cdnAccessKey = process.env.REACT_APP_CDN_ACCESS_KEY;
const baseVideoUrl = `${process.env.REACT_APP_BASE_VIDEO_URL}/${process.env.REACT_APP_VIDEO_LIB_ID}/videos`;

export const supabase = createClient(supabaseUrl, supabaseKey);

export { cdnAccessKey,baseVideoUrl };