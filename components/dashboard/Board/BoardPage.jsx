import React, { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./BoardPage.module.css";

export default function BoardPage() {
  const [userName, setUserName] = useState("Kumar");
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailAdded, setIsEmailAdded] = useState(false);
  const [addedEmail, setAddedEmail] = useState("");


  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("LOW PRIORITY");
  const [assignee, setAssignee] = useState("");
  const [checklist, setChecklist] = useState(["", ""]);
  const [dueDate, setDueDate] = useState("");

  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const columns = ["Backlog", "To do", "In progress", "Done"];

  const openAddPeopleModal = () => {
    setIsAddPeopleModalOpen(true);
    setIsEmailAdded(false);
    setEmail("");
  };
  const closeAddPeopleModal = () => setIsAddPeopleModalOpen(false);

  const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
    setTaskTitle("");
    setTaskPriority("LOW PRIORITY");
    setAssignee("");
    setChecklist(["", ""]); 
    setDueDate("");
  };
  const closeAddTaskModal = () => setIsAddTaskModalOpen(false);

  const handleAddEmail = () => {
    setAddedEmail(email);
    setIsEmailAdded(true);
  };

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, ""]); 
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index] = value;
    setChecklist(newChecklist);
  };

  const handleDeleteChecklistItem = (index) => {
    const newChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(newChecklist);
  };

  const handleSaveTask = () => {
    console.log({
      title: taskTitle,
      priority: taskPriority,
      assignee: assignee,
      checklist: checklist,
      dueDate: dueDate,
    });
    closeAddTaskModal();
  };

  return (
    <div className={styles.boardPage}>
      <div className={styles.header}>
        <h2 className={styles.welcomeMessage}>Welcome! {userName}</h2>
        <span className={styles.date}>{formatDate()}</span>
      </div>
      <div className={styles.boardHeader}>
        <div className={styles.boardTitle}>
          <h3>Board</h3>
          <button className={styles.addPeopleButton} onClick={openAddPeopleModal}>
            <FiUserPlus className={styles.icon} /> Add People
          </button>
        </div>
        <div className={styles.filterDropdown}>
          <span>This week</span>
          <MdKeyboardArrowDown className={styles.icon} />
        </div>
      </div>

      <div className={styles.columns}>
        {columns.map((column, index) => (
          <div key={index} className={styles.column}>
            <div className={styles.columnHeader}>
              <h4>{column}</h4>
              {column === "To do" && (
                <button className={styles.addTaskButton} onClick={openAddTaskModal}>
                  +
                </button>
              )}
            </div>
            <div className={styles.taskList}>
              <p className={styles.emptyMessage}>No tasks yet</p>
            </div>
          </div>
        ))}
      </div>

      {isAddTaskModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAddTaskModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.addTaskTitle}>Title*</h3>
            <input
              type="text"
              placeholder="Enter Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className={styles.modalInput}
            />
            <div className={styles.priority}>
              <span>Select Priority*</span>
              <div>
                <label>
                  <input
                    type="radio"
                    value="HIGH PRIORITY"
                    checked={taskPriority === "HIGH PRIORITY"}
                    onChange={(e) => setTaskPriority(e.target.value)}
                  />
                  High Priority
                </label>
                <label>
                  <input
                    type="radio"
                    value="MODERATE PRIORITY"
                    checked={taskPriority === "MODERATE PRIORITY"}
                    onChange={(e) => setTaskPriority(e.target.value)}
                  />
                  Moderate Priority
                </label>
                <label>
                  <input
                    type="radio"
                    value="LOW PRIORITY"
                    checked={taskPriority === "LOW PRIORITY"}
                    onChange={(e) => setTaskPriority(e.target.value)}
                  />
                  Low Priority
                </label>
              </div>
            </div>
            <h3 className={styles.addTaskTitle}>Assign to</h3>
            <input
              type="text"
              placeholder="Add a assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={styles.modalInput}
            />
            <h4>Checklist ({checklist.length}/{3})*</h4>
            {checklist.map((item, index) => (
              <div key={index} className={styles.checklistItem}>
                <input
                  type="text"
                  placeholder="Task to be done"
                  value={item}
                  onChange={(e) => handleChecklistChange(index, e.target.value)}
                  className={styles.modalInput}
                />
                <button onClick={() => handleDeleteChecklistItem(index)}>Delete</button>
              </div>
            ))}
            <button onClick={handleAddChecklistItem}>+ Add New</button>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.modalInput}
            />
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={closeAddTaskModal}>
                Cancel
              </button>
              <button className={styles.addButton} onClick={handleSaveTask}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isAddPeopleModalOpen && (
        <div className={styles.modalOverlay} onClick={closeAddPeopleModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {isEmailAdded ? (
              <>
                <h3 className={styles.modalTitle}>{addedEmail} added to board</h3>
                <button className={styles.okButton} onClick={closeAddPeopleModal}>
                  Okay, got it
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.modalTitle}>Add People to the Board</h3>
                <input
                  type="email"
                  placeholder="Enter the email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.modalInput}
                />
                <div className={styles.modalActions}>
                  <button className={styles.cancelButton} onClick={closeAddPeopleModal}>
                    Cancel
                  </button>
                  <button className={styles.addButton} onClick={handleAddEmail}>
                    Add Email
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
