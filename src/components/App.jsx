import React, { useEffect, useState } from 'react'
import ReelPlayer from './ReelPlayer'
import UploadReel from './UploadReel'
import { supabase } from '../services/config/supabase'
import { Route, Routes } from 'react-router-dom'
import UserAuth from './UserAuth'
import UserProfile from './UserProfile'

const App = () => {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);

  const getUserProfile = async () => {
    try {
    const res = await supabase.auth.getUser();
    const { user } = res.data;
    console.log(user);
    return user.id;
  } catch (err) {
      console.log(`an error in getting user profile:${err}`);
      return null;
  }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    getUserProfile().then(id => setUserId(id));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className='flex items-center justify-center h-screen bg-neutral-900'>
      <Routes>
        <Route path='/' element={<UserAuth session={session} />}>
          <Route index element={<ReelPlayer userid={userId} />} />
          <Route path='upload' element={<UploadReel />} />
          <Route path='profile' element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App