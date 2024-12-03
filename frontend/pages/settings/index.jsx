import styles from './index.module.css'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Form from '../../components/form/Form'
import { settings, getAccount } from '../../services/auth'
import back from '../../src/assets/back.png';
import mike from '../../src/assets/mike.png';

function Settings() {
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setErrors({
      ...errors,
      [e.target.name]: false
    })
  }
  const logoutFunc = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  }
  const [isLoading, setIsLoading] = useState(true);
  const loadUserData = async () => {
    await getAccount().then((res) => {
    setFormData(res.data);
    setIsLoading(false);
    });
  }
  useEffect(() => {
    loadUserData();
  },[])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await settings(formData)
      if(response.status === 200 && response.message === "Settings updated successfully.") {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("cart")
        toast.success(response.message)
      } else if (response.status === 200) {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      if(error.message && typeof error.message === 'object') {
        setErrorMessages((prevMsg) => ({...prevMsg, ...error.message}));
        setErrors((prevErrors) => {
          const newErrors = {...prevErrors};
          Object.keys(error.message).forEach((field) => {
            newErrors[field] = true;
          });
          return newErrors;
        })
        toast.error("Please check the form fields and try again.")
      } else if(error.status === 400) {
        const errorMessage = error.message;
        if(errorMessage === "Email already exists.") {
          setErrorMessages((prevMsg) => ({...prevMsg, email: errorMessage}));
          setErrors((prevErrors) => ({...prevErrors, email: true}));
        }else if(errorMessage === "Incorrect password.") {
          setErrorMessages((prevMsg) => ({...prevMsg, oldPassword: errorMessage}));
          setErrors((prevErrors) => ({...prevErrors, oldPassword: true}));
        }
      } else {
        error.message ? toast.error(error.message) : toast.error("An unexpected error occured. Please try again.")
      }
    }
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  })
  const formFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      value: formData.name,
      onChange: onChange
    },{
      name: "email",
      type: "email",
      placeholder: "Update Email",
      value: formData.email,
      onChange: onChange
    },{
      name: "gender",
      type: "gender",
      placeholder: "Update Gender",
      value: formData.gender,
      onChange: onChange
    }, {
      name: "country",
      type: "country",
      placeholder: "Update Country",
      value: formData.country,
      onChange: onChange
    }
  ]
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    gender: false,
    country: false
  })
  const [errorMessages, setErrorMessages] = useState({
    name: "Name is required.",
    email: "Please enter a valid email address.",
    gender: "Please enter a valid gender.",
    country: "Please enter a valid country."
  })

  return (
    <div className={styles.container} div={styles.mobileContainer}>
        <div className={styles.heading}>
          <img src={back} alt="back" className={styles.backIcon}/>
          <h1>My Profile</h1>
          <button classname={styles.logout} onClick={logoutFunc}>Logout</button>
        </div>
        <div className={styles.name}>
          {formData.img? <img src={formData.img} alt="image" className={styles.nameIcon}/> : <img src={mike} alt="image" className={styles.nameIcon}/>}
          <h1>{formData.name}</h1>
        </div>
        {isLoading ? <p>Loading...</p> : 
        <div className={styles.divider}>
          <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Edit" />
        </div>}
    </div>
  )
}

export default Settings