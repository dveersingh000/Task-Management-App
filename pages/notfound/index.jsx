import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css'; 

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
      <button className={styles.homeButton} onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}
