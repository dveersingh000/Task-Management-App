import React from 'react';
import styles from './RightContent.module.css';
import BoardPage from '../Board/BoardPage';

export default function RightContent() {
    
  return (
    <div className={styles.content}>
      <BoardPage />
      
    </div>
  );
}
