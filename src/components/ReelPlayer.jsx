import React from 'react'
import Video from './Video'

const ReelPlayer = () => {
  return (
    <div className='border shadow rounded-md w-[315px] h-[560px] overflow-scroll snap-y snap-mandatory scroll-smooth bg-neutral-900'>
        {
            Array(3).fill(0).map((data,ind) => <Video key={ind} />)
        }
    </div>
  )
}

export default ReelPlayer