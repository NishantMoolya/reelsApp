import React, { useEffect, useState } from 'react'
import ReelPlayer from './ReelPlayer'
import UploadReel from './UploadReel'
import { supabase } from '../services/config/supabase'
import { Route, Routes } from 'react-router-dom'
import UserAuth from './UserAuth'
import UserProfile from './UserProfile'

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    async function hello(){
      const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('videos')
      .eq('id', "7b836b74-c064-483b-ae4a-550b2c7ac72d")
      .single();
      const updatedVideos = profile.videos ? [...profile.videos, { videoId:12345 }] : [{ videoId:12345 }];
      const { data, error } = await supabase
      .from('profiles')
      .update({ videos: updatedVideos })
      .eq('id', "7b836b74-c064-483b-ae4a-550b2c7ac72d");
      console.log(data);
    }
    //hello();
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className='flex items-center justify-center h-screen bg-neutral-900'>
      <Routes>
        <Route path='/' element={<UserAuth session={session} />}>
          <Route index element={<ReelPlayer />} />
          <Route path='upload' element={<UploadReel />} />
          <Route path='profile' element={<UserProfile />} />
        </Route>
      </Routes>
      {/* <ReelPlayer /> */}
      {/* <UploadReel /> */}
    </div>
  )
}

export default App