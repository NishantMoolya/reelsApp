import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../services/config/supabase'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Outlet } from 'react-router-dom'

const UserAuth = ({ session }) => {
  return (
    <>
      {!session ? <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme='dark' providers={['google']} />
        : <Outlet />}
    </>
  )
}

export default UserAuth