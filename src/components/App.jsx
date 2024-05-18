import React from 'react'
import ReelPlayer from './ReelPlayer'
import UploadReel from './UploadReel'

const App = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-neutral-900'>
      {/* <ReelPlayer /> */}
      <UploadReel />
    </div>
  )
}

export default App