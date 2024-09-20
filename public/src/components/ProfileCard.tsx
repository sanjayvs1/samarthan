// ProfileCard.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../pages/redux';

const ProfileCard = ({ profile }: { profile: any }) => {
  const userTags = useAppSelector((zoom)=>zoom.userInfo.userInfo?.tags)
  const [image, setImage] = useState<string>("");
  console.log(profile)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
        const response = await axios.get(`https://api.multiavatar.com/${randomNumber}.svg?apikey=LfMK8pr4mPhXew`);
        setImage(response.data); // Set the SVG avatar
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar(); // Call the async function inside useEffect
  }, []);

  const { username, collegeName, year, stars ,tags } = profile;

  return (
    <div className="card bg-base-100 shadow-xl w-72 p-4 m-4">
      <figure>
        {/* Set image from API response */}
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} alt="Profile Pic" className="rounded-full w-24 h-24" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{username}</h2>
        <p>{collegeName}</p>
        <p>Academic Year: {year}</p>
        <div className="flex  gap-2 mt-2">
          {
            userTags?.map((tag)=>(
              <span className='mx-4'>#{tag}Expert</span>
            ))
          }
        </div>
        <div className="flex gap-1 mt-2">
          {[...Array(stars)].map((_, index) => (
            <span key={index} className="text-yellow-400">⭐</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
