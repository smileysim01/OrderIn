import styles from './index.module.css';
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import Form from '../../components/form/Form'
import { login } from '../../services/auth'
import logo from '../../src/assets/logo.png'
import food1 from '../../src/assets/food1.png'
import Footer from '../../components/footer/Footer'


function Login() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/home");
        }
      }, [navigate]);
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
        try {
          const response = await login(formData)
          if(response.status === 200) {
            localStorage.setItem("token", response.token)
            localStorage.setItem("name", response.name)
            navigate("/home")
          } 
        } catch (error) {
          if(error.status === 400) {
            setErrorMessages({email: error.message, password: error.message});
            setErrors({email: true, password: true});
          } else {
            toast.error("An unexpected error occured. Please try again.")
          }
        }
        
      }
    
      const [formData, setFormData] = useState({
        email: "",
        password: ""
      })
      const formFields = [
        {
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
        }
      ]
      const [errors, setErrors] = useState({
        email: false,
        password: false
      })
      const [errorMessages, setErrorMessages] = useState({
        email: "Please enter a valid email address.",
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
                      <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Sign in" formType="login" />
                      <div className={styles.noAccount}>
                        <p>Don't you have an account?&nbsp;<span onClick={()=>navigate('/register')}>Sign Up</span></p>
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
                    <Form formFields={formFields} onSubmit={onSubmit} error={errors} errorMessages={errorMessages} submitButtonText="Sign in" />
                    <p>Don't you have an account?&nbsp;<span onClick={()=>navigate('/register')}>Sign Up</span></p>
                </div>
                )
            }
          <Footer width={width} />
        </div>
      )
    }
    
    export default Login
    
