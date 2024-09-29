import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import { useAppSelector } from "./redux";

const SelfProfile = () => {
  const profile = useAppSelector((store) => store.userInfo.userInfo);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-10 bg-gray-100">
      {/* Create Assignment Button */}
      {/* <button
        className="btn btn-warning absolute top-16 left-10 font-bold px-12 rounded-full shadow-lg hover:bg-yellow-400 transition"
        onClick={() => navigate("/admin/create-assignment")}
      >
        Create Assignment
      </button> */}

      {/* Profile Section */}
      <div className="w-full flex justify-center items-center mb-8">
        <ProfileCard profile={profile} />
      </div>

      
    </div>
  );
};

export default SelfProfile;
