// import React from 'react';
// import styles from '../pages/register/index.module.css';

// function FormField({ name, type, placeholder, value, onChange }) {
//     return (
//         <div>
//             <input 
//                 className={styles.inputField}
//                 value={value} 
//                 onChange={onChange} 
//                 type={type} 
//                 name={name} 
//                 placeholder={placeholder} 
//             />
//         </div>
//     )
// }

// export default function Form({ formFields, onSubmit, errorMessage, error }) {
//     return (
//         <form onSubmit={onSubmit} className={styles.form}>
//             {
//                 formFields.map((field, index) => (
//                     <div key={index}>
//                         <FormField 
//                             value={field.value} 
//                             onChange={field.onChange} 
//                             name={field.name} 
//                             type={field.type} 
//                             placeholder={field.placeholder} 
//                         />
//                         {error[field.name] && <p className={styles.errorText}>{error[field.name]}</p>}
//                     </div>
//                 ))
//             }
//             <button className={styles.submitButton} type="submit">Register</button>
//         </form>
//     )
// }
