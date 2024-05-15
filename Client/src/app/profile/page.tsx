import React from "react";
import TopBar from "../components/Home/TopBar";
import ProfilePage from "../components/Home/ProfileComponents/ProfilePage";
import BottomNav from "../components/Home/BottomNav";

export default function Profile() {
  return (
    <div className="mt-0 sm:mt-8 md:mt-16 lg:mt-20">
      <TopBar />
      <ProfilePage />
      <BottomNav />
    </div>
  );
}