import React from 'react'
import LeftSidebar from '../../components/dashboard/LeftSidebar/LeftSidebar'
import RightContent from '../../components/dashboard/RightContent/RightContent'
import styles from './index.module.css'

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <LeftSidebar />
      <RightContent />
    </div>
  )
}
