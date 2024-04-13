import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Message = ({ message }) => {
  return (
    <div className='w-full h-16 bg-gray-200 rounded-lg p-2'>
      <span className='text-gray-900'>
        {message}
      </span>
    </div>
  )
}

const Chat = ({ messages, close }) => {
  return (
    <div className='bottom-2 right-2 fixed h-full max-h-[600px] w-full max-w-80 rounded-lg bg-gray-50 border-solid border-slate-600 border-2 px-4 space-y-3 overflow-y-auto pt-5'>
      <div role='button' onClick={close} className='flex justify-center items-center p-1 absolute top-1 right-2'>
        <XMarkIcon className='w-5 h-5 text-gray-800' />
      </div>
      {messages?.map?.(message => (
        <Message message={message} />
      ))}
    </div>
  )
}

export const Widget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false)

  if (isChatOpen) {
    return (
      <Chat
        // messages={messages}
        close={() => setIsChatOpen(false)}
      />
    )
  }

  return (
    <div role='button' onClick={() => setIsChatOpen(true)} className='cursor-pointer flex justify-center items-center bottom-2 right-2 fixed w-16 h-16 rounded-full bg-gray-200 border-solid border-slate-700 border-2'>
      {/* notifications counter */}
      <div className='absolute flex justify-center items-center top-0 right-0 w-6 h-6 rounded-full bg-red-400 border-solid border-red-600 border-1'>
        <span className='text-gray-50 font-medium text-xs'>
          1
        </span>
      </div>
      {/* <img /> */}
    </div>
  )
}
