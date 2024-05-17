import { useEffect, useState} from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../css/registrationForm.css';
import { useParams,useLocation} from 'react-router-dom';
const Registration = ()=>{
    const [formname,getFormname] = useState('Registration Form');
    const [buttonvalue,getButtonvalue]= useState('Registration')
    const [button, getButton] = useState("Login")
    const [text, getText] = useState("Alrady an user?")
    const [firstname, getFirstName] = useState('')
    const [lastName, getLastName] = useState('')
    const [phoneno, getPhoneno] = useState('')
    const [email, getEmail] = useState('')
    const [password, getPassword] = useState('')
    const location = useLocation();
    const navigate = useNavigate()
    const params = useParams();
    console.log(params)
        const [path,getPath] = useState('/login')
    // console.log(location.pathname);
    useEffect( ()=>{
        if(location.pathname === '/login'){
            getFormname('Login form')
            getButtonvalue('Login')
            getButton('Sign Up')
            getText('New user?')
            getPath('/registration')
        }
        if(params.id){
            getFormname('Update form')
            getButtonvalue('Update')
            axios.get('http://localhost:8080/users/singleuserlist/'+ params.id).then((response) =>{
                console.log(response.data.message)
                getFirstName(response.data.message.firstname)
                getLastName(response.data.message.lastName)
                getEmail(response.data.message.email)
                getPassword(response.data.message.password)
            })
        }

    },[])
    
    
    const firstNameHandler = (e) =>{
        getFirstName(e.target.value)
    }
    const lastNameHandler = (e) =>{
        getLastName(e.target.value)
    }

    const phonenoHandler = (e) =>{
        getPhoneno(e.target.value)
    }

    const emailHandler = (e) =>{
        getEmail(e.target.value)
    }

    const passwordHandler = (e) =>{
        getPassword(e.target.value)
    }

    const submithandler = (e) =>{
        // e.preventDefault()
        if(params.id){
            let registrationData = {
                firstname:firstname,
                lastName:lastName,
                phoneno:phoneno,
                email:email,
                password:password,
               }
               axios.put('http://localhost:8080/users/updateuser/' +params.id,registrationData).then((res) =>{console.log(res)})
               navigate("/userlist")
            }
        else{
       let registrationData = {
        firstname:firstname,
        lastName:lastName,
        phoneno:phoneno,
        email:email,
        password:password,
       }
       axios.post('http://localhost:8080/users/registration',registrationData).then((res) =>{console.log(res)})
       navigate("/login")
    }
    }

    return(
        <>
        <div id="form-top-container">
             <div id="form-container">
                <div class="header-form">{formname}</div>
                <form class="form">
        { buttonvalue != 'Login' && 
                <>
                    <div class="input-box">
                        <label for="firstname">First name </label>
                        <input type="text"  value={firstname} onChange={firstNameHandler}  />
                    </div>
                    <div class="input-box">
                        <label for="lastname">Last name </label>
                        <input type="text" placeholder="Last name" value={lastName} onChange={lastNameHandler} />
                    </div>
                    <div class="input-box">
                        <label for="phoneno">Phone no </label>
                        <input type="text" placeholder="Phone No" value={phoneno} onChange={phonenoHandler} />
                    </div>
                </>
            }
                <div class="input-box">
                    <label for="email">Email </label>
                    <input type="text" placeholder="Email" value={email} onChange={emailHandler} />
                </div>
                <div class="input-box">
                    <label for="password">Password </label>
                    <input type="password" placeholder="Password"value={password} onChange={passwordHandler} />
                </div>
                <input type="submit" value={buttonvalue} onClick={()=>{submithandler(); }}/>
                { buttonvalue != "Update" &&
                <>
                <div>{text}<a onClick={()=>{navigate(path)}}>{button}</a>
                 </div>
                </>
                }   
                </form>
            </div>
        </div>

        </>
    )
}
export default Registration