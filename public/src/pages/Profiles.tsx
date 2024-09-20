import React from 'react'
import ProfileCard from '../components/ProfileCard'
import { useAppSelector } from './redux'

const Profiles = () => {
    const randomUser = useAppSelector((store) => store.randomUsers)
  return (
    <div className="flex flex-wrap justify-center">
    {randomUser.map(( profile,index:number) => (
      <ProfileCard profile={profile}  />
    ))}
  </div>
  )
}

export default Profiles
