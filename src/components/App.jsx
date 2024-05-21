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
    async function hello(videoData) {
      const { data, error } = await supabase.from('videos').insert([videoData]).select();
      console.log(data, error);
    }
    
    //hello({videoid:videoId,title,likes,availableresolutions,videolibraryid,thumbnailfilename,dateuploaded});
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
    </div>
  )
}

export default App