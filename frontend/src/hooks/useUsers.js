import { useState } from "react";
import { getUser } from "../libs/fetchUserUtils";
import { API_URL } from "../libs/api";

export const useUsers = () => {
  const [randomUser, setRandomUser] = useState([]);

  const getAllUser = async () => {
    try {
      const users = await getUser(API_URL);
      const currentUser = JSON.parse(sessionStorage.getItem("user"));
      const filteredUsers = users.filter(
        (user) => user._id !== currentUser?._id
      );
      const shuffled = filteredUsers.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      setRandomUser(selected);
    } catch (error) {
      console.log(error);
    }
    console.log(randomUser);
  };

  return {
    randomUser,
    getAllUser,
  };
};
