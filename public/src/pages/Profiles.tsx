import React from 'react'
import ProfileCard from '../components/ProfileCard'

const Profiles = () => {
    function range(start:number, end:number) {
        return Array.from({ length: end - start }, (_, i) => i + start);
      }
  return (
    <div className="flex flex-wrap justify-center">
    {range(1,6).map(( index:number) => (
      <ProfileCard key={index}  />
    ))}
  </div>
  )
}

export default Profiles
