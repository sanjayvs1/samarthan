import React from 'react'
import { useAppSelector } from './redux'
import ProfileCard from '../components/ProfileCard'

const SelfProfile = () => {
    
    const profile = useAppSelector((store) => store.userInfo.userInfo)
  return (
    <div className="flex flex-wrap justify-center">
        <ProfileCard profile={profile} />
  </div>
  )
}

export default SelfProfile
