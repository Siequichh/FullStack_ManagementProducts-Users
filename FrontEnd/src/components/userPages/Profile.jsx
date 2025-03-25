import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p className="text-red-600 text-center">You are not logged in!</p>;
  }

  return (
    <>
      <div className="text-center m-10">
        <h1 className="text-2xl">Information:</h1>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </>
  );
};

export default Profile;
