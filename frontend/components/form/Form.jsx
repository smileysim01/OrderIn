import styles from './form.module.css'
import {useNavigate} from 'react-router-dom'

function FormField({name, type, label, placeholder,value, onChange}) {
    return (
      <div className={styles.formFields}>
          <label>{label}</label>
          <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} autoComplete='on' />
      </div>
    )
}

function Form({formFields, onSubmit, error, errorMessages, submitButtonText, type, formType}) {
  const navigate = useNavigate();
  return (
      <form onSubmit={onSubmit} className={styles.container}>
        {formFields.map((field, index) => (
          <div className={styles.formField} key={`${field.name}-${index}`}>
            {field.img ? <img src={field.img} alt={field.name}/> : null}
            <div className={type ? styles.tasks : styles.inputs} id={styles.inputContainer}>
              <FormField name={field.name} type={field.type} label={field?.label} placeholder={field?.placeholder} value={field.value} onChange={field.onChange}/>
              {error[field.name] ? <p className={styles.error}>{errorMessages[field.name]}</p> : null}
            </div>
          </div>
          ))
        }
        {formType == "login" ? <p className={styles.forgotPwd} onClick={()=>navigate("/resetPassword")}>Forgot Password?</p> : null}
        <button className={styles.submitButton} type="submit">{submitButtonText}</button>
      </form>
  )
}

export default Form
