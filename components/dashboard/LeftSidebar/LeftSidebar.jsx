import React from 'react';
import { CiGrid32, CiSettings } from 'react-icons/ci';
import { PiDatabaseThin } from 'react-icons/pi';
import { RiBox3Line } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';
import styles from './LeftSidebar.module.css';

export default function LeftSidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <RiBox3Line className={styles.icon} />
        <span>Pro Manage</span>
      </div>
      <div className={styles.menu}>
        <button className={styles.tab}>
          <CiGrid32 className={styles.tabIcon} />
          Board
        </button>
        <button className={styles.tab}>
          <PiDatabaseThin className={styles.tabIcon} />
          Analytics
        </button>
        <button className={styles.tab}>
          <CiSettings className={styles.tabIcon} />
          Settings
        </button>
      </div>
      <button className={styles.logout}>
        <MdOutlineLogout className={styles.logoutIcon} />
        Logout
      </button>
    </div>
  );
}
