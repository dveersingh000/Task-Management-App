import React from 'react';
import styles from './Analytics.module.css';

const Analytics = () => {
  return (
    <div className={styles.analyticsContainer}>
      <h2 className={styles.title}>Analytics</h2>
      <div className={styles.taskContainer}>
        <div className={styles.taskList}>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> Backlog Tasks
            <span className={styles.count}>16</span>
          </div>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> To-do Tasks
            <span className={styles.count}>14</span>
          </div>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> In-Progress Tasks
            <span className={styles.count}>03</span>
          </div>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> Completed Tasks
            <span className={styles.count}>22</span>
          </div>
        </div>
        <div className={styles.taskList}>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> Low Priority
            <span className={styles.count}>16</span>
          </div>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> Moderate Priority
            <span className={styles.count}>14</span>
          </div>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> High Priority
            <span className={styles.count}>03</span>
          </div>
          <div className={styles.taskItem}>
            <span className={styles.dot}></span> Due Date Tasks
            <span className={styles.count}>5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
