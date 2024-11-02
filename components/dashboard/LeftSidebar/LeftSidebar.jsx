import React, { useState } from 'react';
import { CiGrid32, CiSettings } from 'react-icons/ci';
import { PiDatabaseThin } from 'react-icons/pi';
import { RiBox3Line } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';
import styles from './LeftSidebar.module.css';

export default function LeftSidebar({ activeTab, setActiveTab }) {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    closeLogoutModal();
    console.log("Logged out successfully"); 
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <RiBox3Line className={styles.icon} />
        <span>Pro Manage</span>
      </div>
      <div className={styles.menu}>
        <button
          className={`${styles.tab} ${activeTab === 'Board' ? styles.active : ''}`}
          onClick={() => setActiveTab('Board')}
        >
          <CiGrid32 className={styles.tabIcon} />
          Board
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'Analytics' ? styles.active : ''}`}
          onClick={() => setActiveTab('Analytics')}
        >
          <PiDatabaseThin className={styles.tabIcon} />
          Analytics
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'Settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('Settings')}
        >
          <CiSettings className={styles.tabIcon} />
          Settings
        </button>
      </div>
      <button className={styles.logout} onClick={openLogoutModal}>
        <MdOutlineLogout className={styles.logoutIcon} />
        Logout
      </button>

      {isLogoutModalOpen && (
        <div className={styles.modalOverlay} onClick={closeLogoutModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Are you sure you want to Logout?</h3>
            <button className={styles.confirmButton} onClick={handleLogout}>
              Yes, Logout
            </button>
            <button className={styles.cancelButton} onClick={closeLogoutModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}