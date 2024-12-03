import styles from './index.module.css';
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import Form from '../../components/form/Form'
import { register } from '../../services/auth'
import ValidateForm from '../../utils/validateForm';
import logo from '../../src/assets/logo.png'
import food1 from '../../src/assets/food1.png'
import Footer from '../../components/footer/Footer'


function Registration() {
    const navigate = useNavigate()
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
      const onSubmit = async (e) => {
        e.preventDefault()
        const isValid = ValidateForm(formData, setErrors)
        if (isValid) {
          try {
            const response = await register(formData)
            if(response.status === 201) {
              localStorage.setItem("token", response.token)
              localStorage.setItem("name", response.name)
              toast.success(response.message)
              navigate("/")
            } 
          } catch (error) {
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
              if(errorMessage === "User already exists.") {
                setErrorMessages((prevMsg) => ({...prevMsg, email: errorMessage}));
                setErrors((prevErrors) => ({...prevErrors, email: true}));
              }
            } else {
              toast.error("An unexpected error occured. Please try again.")
            }
          }
        }
      }
    
      const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
      const formFields = [
        {
          name: "name",
          type: "text",
          placeholder: "Name",
          label: "Name",
          value: formData.name,
          onChange: onChange
        }, {
          name: "email",
          type: "email",
          placeholder: "Email",
          value: formData.email,
          label: "Email",
          onChange: onChange
        }, {
          name: "password",
          type: "password",
          placeholder: "Password",
          label: "Password",
          value: formData.password,
          onChange: onChange
        }, {
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          label: "Confirm Password",
          value: formData.confirmPassword,
          onChange: onChange
        }
      ]
      const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      })
      const [errorMessages, setErrorMessages] = useState({
        name: "Name is required.",
        email: "Please enter a valid email address.",
        confirmPassword: "Passwords do not match.",
        password: "Please enter a password."
      })
    
      // for responsiveness
        const [width, setWidth] = useState(window.innerWidth);
        // checking device size to make it responsive
        useEffect(() => {
          const handleResize = () => setWidth(window.innerWidth);
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
        }, []);
      
      return (
        <div className={styles.container}>
            {
                (width > 720) ? ( // Left & Right Containers
                <>
                <div className={styles.content}>
                    <div className={styles.leftContainer}>
                      <img src={logo} alt="logo" className={styles.logo} />
                      <div className={styles.leftBox}>
                      <p className={styles.heading}>Welcome Back 👋</p>
                      <p className={styles.subheading}>Today is a new day. It's your day. You shape it. Sign in to start ordering.</p>
                      <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Sign up" formType="login" />
                      <div className={styles.noAccount}>
                        <p>Already have an account?&nbsp;<span onClick={()=>navigate('/')}>Sign In</span></p>
                      </div>
                      </div>
                    </div>
                    <div className={styles.rightContainer}>
                      <img src={food1} alt="food" className={styles.food} />
                    </div> 
                  </div>
                </>
                ) : ( // Only Left Container
                <div className={styles.leftContainer} id={styles.mobileContainer}>
                    <img src={logo} alt="logo" className={styles.logo} />
                    <p className={styles.heading}>Welcome Back 👋</p>
                    <p className={styles.subheading}>Today is a new day. It's your day. You shape it. Sign in to start ordering.</p>
                    <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Sign up" />
                    <p>Already have an account?&nbsp;<span onClick={()=>navigate('/')}>Sign In</span></p>
                </div>
                )
            }
          <Footer width={width} />
        </div>
      )
    }
    
export default Registration
    
