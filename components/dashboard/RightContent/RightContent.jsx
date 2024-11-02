import React from 'react';
import styles from './RightContent.module.css';
import BoardPage from '../Board/BoardPage';
import AnalyticsPage from '../Analytics/Analytics';
import SettingsPage from '../Settings/Settings';

export default function RightContent({ activeTab }) {
    
  return (
    <div className={styles.content}>
      {activeTab === 'Board' && <BoardPage />}
      {activeTab === 'Analytics' && <AnalyticsPage />}
      {activeTab === 'Settings' && <SettingsPage />}
    </div>
  );
}
