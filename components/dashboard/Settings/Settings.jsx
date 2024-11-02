import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MdOutlinePerson2, MdEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.settingsHeader}>Settings</div>
      <form className={styles.form}>
        <div className={styles.inputContainer}>
          <MdOutlinePerson2 className={styles.icon} />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputContainer}>
          <MdEmail className={styles.icon} />
          <input
            type="email"
            placeholder="Update Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputContainer}>
          <MdLock className={styles.icon} />
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Old Password"
            value={formData.currentPassword}
            onChange={(e) => handleInputChange("currentPassword", e.target.value)}
            className={styles.inputField}
          />
          <div className={styles.toggleIconContainer} onClick={toggleCurrentPasswordVisibility}>
            {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <div className={styles.inputContainer}>
          <MdLock className={styles.icon} />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) => handleInputChange("newPassword", e.target.value)}
            className={styles.inputField}
          />
          <div className={styles.toggleIconContainer} onClick={toggleNewPasswordVisibility}>
            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <button type="submit" className={styles.saveButton}>
          Update
        </button>
      </form>
    </div>
  );
}
