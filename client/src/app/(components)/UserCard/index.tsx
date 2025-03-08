import { User } from '@/state/api'
import Image from 'next/image'
import React from 'react'

type Props = {
    user:User
}

const UserCard = ({user}: Props) => {
  return (
    <div className='flex items-center rounded border p-4 shadow dark:text-white'>
        {user.profilePictureUrl && (
            <Image 
              src={`/icons/${user.profilePictureUrl}`}
              alt='profile picture'
              width={32}
              height={32}
              className='rounded-full'
            />
        )}
            <div className='pl-[15px]'>
                <h3>Name : {user.username}</h3>
                <p>Email : {user.email  ? user.email : "-"}</p>
            </div>
        
    </div>
  )
}

export default UserCard