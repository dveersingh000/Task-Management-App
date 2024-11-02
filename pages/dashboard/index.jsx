import React, { useState } from 'react'
import LeftSidebar from '../../components/dashboard/LeftSidebar/LeftSidebar'
import RightContent from '../../components/dashboard/RightContent/RightContent'
import styles from './index.module.css'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Board');
  return (
    <div className={styles.dashboardContainer}>
      <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <RightContent activeTab={activeTab} />
    </div>
  )
}
