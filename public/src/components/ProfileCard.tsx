// ProfileCard.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileCard = ({ profile }: { profile: any }) => {
  const [image, setImage] = useState<string>("");

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

  const { username, collegeName, academicYear, stars ,tags } = profile;

  return (
    <div className="card bg-base-100 shadow-xl w-72 p-4 m-4">
      <figure>
        {/* Set image from API response */}
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`} alt="Profile Pic" className="rounded-full w-24 h-24" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{username}</h2>
        <p>{collegeName}</p>
        <p>Academic Year: {academicYear}</p>
        <div className="flex gap-2 mt-2">
          {[...Array(tags)].map((tag, index) => (
            <span key={index} className="text-yellow-400 ">{tag}</span>
          ))}
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
