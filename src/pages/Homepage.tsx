import { useEffect, useState } from "react";
import Content from "../Components/Homepage/Content";
import Scrollbar from "../Components/Homepage/Scrollbar";
import { getUserSession } from "../services/get_session";
import { readProfile } from "../services/profile";
import { ProfileType } from "../types";
import supabase from "../utils/supabase";

const name: string = "Lucas Goh Yuan Kai";

const Home = () => {
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    getUserSession().then(async (user) => {
      if (user?.id) {
        await readProfile("*").then((profile) => {
          setProfile(profile);
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(profile?.name);
  }, [profile]);

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <div className="text-lg border-2 font-semibold text-white px-4 py-2 rounded-lg border-gray-300 shadow-md transition duration-300 hover:bg-white hover:text-black">
          <h1>Hi, {name}</h1>
        </div>
      </div>
      <div className="h-screen flex relative">
        <Scrollbar />
        <Content />
      </div>
    </>
  );
};

export default Home;
