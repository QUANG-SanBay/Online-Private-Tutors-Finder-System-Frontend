import React from "react";
import styles from "../../../components/Learner/profile/Profile.module.scss";
import ProfileTab from "~/components/Learner/profile/info";

export default function LearnerDashboard() {

  const user = { 
    name: "Nguyễn Văn A", 
    email: "a@email.com", 
    phone: "0909221177", 
    address: "Hanoi" 
  };

  function handleSaveProfile(data) {
    console.log("Save profile", data);
  }

  return (
    <div className={styles["ld-root"]}>
      {/* Main content */}
      <main className={styles["ld-main"]}>
         <ProfileTab user={user} onSave={handleSaveProfile} />
      
      </main>
    </div>
  );
}
