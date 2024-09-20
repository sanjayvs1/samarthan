// ProfileCard.js
import React from 'react';

const ProfileCard = () => {
    function range(start:number, end:number) {
        return Array.from({ length: end - start }, (_, i) => i + start);
      }
  return (
    <div className="card bg-base-100 shadow-xl w-72 p-4 m-4">
      <figure>
        <img src="" alt="Profile Pic" className="rounded-full w-24 h-24" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">username</h2>
        <p>collegeName</p>
        <p>Academic Year: academicYear</p>
        <div className="flex gap-1 mt-2">
          {range(1,5).map(( index:number) => (
            <span key={index} className="text-yellow-400">⭐</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
