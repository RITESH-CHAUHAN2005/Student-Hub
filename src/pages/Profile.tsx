import React, { useEffect, useState } from "react";
import { auth } from "../backend/api/firebase";
import { User } from "firebase/auth";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div className="text-center mt-10">Loading user profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 text-center">
      <img
        className="w-24 h-24 rounded-full mx-auto mb-4"
        src={user.photoURL || "https://via.placeholder.com/150"}
        alt="Profile"
      />
      <h2 className="text-2xl font-semibold">{user.displayName || "No name"}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="mt-4 text-sm text-gray-400">UID: {user.uid}</p>
    </div>
  );
};

export default Profile;
