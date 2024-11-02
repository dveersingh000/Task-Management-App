import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./BoardPage.module.css";

export default function BoardPage() {
  const [userName, setUserName] = useState("Kumar"); // Replace with actual logged-in user
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const columns = ["Backlog", "To do", "In progress", "Done"];

  return (
    <div className={styles.boardPage}>
      {/* Header Section */}
      <div className={styles.header}>
        <h2 className={styles.welcomeMessage}>Welcome! {userName}</h2>
        <span className={styles.date}>{formatDate()}</span>
      </div>

      {/* Board Header */}
      <div className={styles.boardHeader}>
        <div className={styles.boardTitle}>
          <h3>Board</h3>
          <button className={styles.addPeopleButton}>
            <FiUserPlus className={styles.icon} /> Add People
          </button>
        </div>
        <div className={styles.filterDropdown}>
          <span>This week</span>
          <MdKeyboardArrowDown className={styles.icon} />
        </div>
      </div>

      {/* Task Columns */}
      <div className={styles.columns}>
        {columns.map((column, index) => (
          <div key={index} className={styles.column}>
            <div className={styles.columnHeader}>
              <h4>{column}</h4>
              <button className={styles.addTaskButton}>+</button>
            </div>
            {/* This is where tasks will be listed in each column */}
            <div className={styles.taskList}>
              {/* Placeholder text for empty columns */}
              <p className={styles.emptyMessage}>No tasks yet</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
