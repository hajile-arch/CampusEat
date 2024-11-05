import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { UserType } from "../types";

const Haha = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    void (async () => {
      const { data, error } = await supabase.from("user").select();
      if (error) {
        console.log("error: error fetching data");
      } else {
        setUsers(data as UserType[]);
        console.log(data)
        console.log("hit");
      }
    })();
  }, []);

  return (
    users
    // .filter((user) => {
    //   return user.name == "Elijah Wong"
    // })
    .sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    .map((user) => {
      return (
        <div>{user.student_id}</div>
      )
    })
  )
};

export default Haha;
