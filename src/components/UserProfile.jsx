import React, { useEffect, useState } from 'react'
import { supabase } from '../services/config/supabase'

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getUserProfile = async () => {
    try {
    const res = await supabase.auth.getUser();
    const { user_metadata } = res.data.user;
    console.log(user_metadata);
    return user_metadata;
  } catch (err) {
      console.log(`an error in getting user profile:${err}`);
      return null;
  }
  }

  useEffect(() => {
    getUserProfile().then(res => setUserInfo(res));
  },[]);

  return (
      <div className='reelplayer_frame h-[560px] flex flex-col gap-2 overflow-scroll scroll-smooth bg-white p-2' style={{ aspectRatio:"9/16"}}>
        {userInfo?<>
        <p className='text-3xl font-semibold'>Welcome🖐️,</p>
        <div className='flex items-center gap-2'>
        <img src={userInfo.avatar_url} alt='user avatar' className='h-20 w-20 rounded-full' />
        <p className='text-xl text-slate-500 font-semibold capitalize text-center'>{userInfo.name}</p>
        </div>
          <p className='text-lg text-slate-600 font-semibold px-2'>Your videos</p>
        <hr />
        <div className='reelplayer_frame flex overflow-scroll snap-x snap-mandatory scroll-smooth'>
      </div>
        <button onClick={() => supabase.auth.signOut()} className='capitalize text-base font-semibold self-start bg-blue-500 text-white rounded py-1 px-3 border-none'>Sign out</button>
      </>:"Loading..."}
        </div>
  )
}

export default UserProfile