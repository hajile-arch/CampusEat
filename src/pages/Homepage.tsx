import { useEffect, useState } from "react";
import Content from "../Components/Homepage/Content";
import Scrollbar from "../Components/Homepage/Scrollbar";
import { getUserSession } from "../services/get_session";
import { readProfile } from "../services/profile";
import { ProfileType } from "../types";
import supabase from "../utils/supabase";

const Home = () => {
  const [profile, setProfile] = useState<ProfileType>();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getUserSession().then(async (user) => {
      if (user?.id) {
        await readProfile("*", "user_id", user.id).then((profile) => {
          setProfile(profile[0]);
        });
      } else {
        console.log("user_id not found");
      }
    });
  }, []);

  return (
    <>
      <button
        className="absolute top-4 right-4 z-50"
        onClick={() => {
          setShowProfile((prev) => !prev);
        }}
      >
        <div className="text-lg border-2 font-semibold text-white px-4 py-2 rounded-lg border-gray-300 shadow-md transition duration-300 hover:bg-white hover:text-black">
          <h1>Hi, {profile?.name}</h1>
        </div>
      </button>

      {showProfile && (
        <>
          <button
            className="absolute top-0 left-0 h-dvh w-dvw z-40 bg-black opacity-40"
            onClick={() => {
              setShowProfile((prev) => !prev);
            }}
          ></button>
          <div className="absolute top-20 right-4 z-50 w-[300px] h-[300px] bg-white rounded-md overflow-hidden">
            {/* <button
              className="bg-red-500"
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              Sign Out
            </button> */}
          </div>
        </>
      )}

      <div className="h-screen flex relative">
        <Scrollbar />
        <Content />
      </div>
    </>
  );
};

export default Home;
