
function FormField({ name, type, placeholder, value, onChange }) {
    return (
        <input value={value} onChange={onChange} type={type} name={name} placeholder={placeholder} />
    )
}

export default function Form({ formFields, onSubmit, errorMessage, error }) {


    return <form onSubmit={onSubmit}>
        {
            formFields.map((field, index) => (
                <>
                <FormField value={field.value} onChange={field.onchange} key={index} name={field.name} type={field.type} placeholder={field.placeholder} />
                {error[field.name] ? <p>{errorMessage[field.name].message}</p> : null
            }
        </>
            ))
        }
        
        <button type="submit">Submit</button>
    </form>

}
