import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../css/registrationForm.css';
import { useParams, useLocation } from 'react-router-dom';

const Registration = () => {
    const [formname, getFormname] = useState('Registration Form');
    const [buttonvalue, getButtonvalue] = useState('Registration');
    const [button, getButton] = useState("Login");
    const [text, getText] = useState("Already a user?");
    const [firstname, getFirstName] = useState('');
    const [lastname, getlastname] = useState('');
    const [phoneno, getPhoneno] = useState('');
    const [email, getEmail] = useState('');
    const [password, getPassword] = useState('');
    const [dob,getDob] = useState('')
    const[formerror, getformerror] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [path, getPath] = useState('/login');

    useEffect(() => {
        if (location.pathname === '/login') {
            getFormname('Login form');
            getButtonvalue('Login');
            getButton('Sign Up');
            getText('New user?');
            getPath('/registration');
        }
        if (params.id) {
            getFormname('Update form');
            getButtonvalue('Update');
            axios.get('http://localhost:8080/users/singleuserlist/' + params.id).then((response) => {
                console.log(response.data.message);
                getFirstName(response.data.message.firstname);
                getlastname(response.data.message.lastname);
                getEmail(response.data.message.email);
                getPassword(response.data.message.password);
                getDob(response.data.message.dob);
            });
        }
    }, [location.pathname, params.id]);

    const firstNameHandler = (e) => {
        getFirstName(e.target.value);
    };
    const lastnameHandler = (e) => {
        getlastname(e.target.value);
    };
    const phonenoHandler = (e) => {
        getPhoneno(e.target.value);
    };
    const emailHandler = (e) => {
        getEmail(e.target.value);
    };
    const passwordHandler = (e) => {
        getPassword(e.target.value);
    };
    const dobHandler = (e) =>{
        getDob(e.target.value)
    }

    const submithandler = (e) => {
        e.preventDefault();
        if (params.id) {
            let registrationData = {
                firstname: firstname,
                lastname: lastname,
                phoneno: phoneno,
                email: email,
                password: password,
                dob:dob,
            };
            axios.put('http://localhost:8080/users/updateuser/' + params.id, registrationData).then((res) => {
                console.log(res);
                navigate("/userlist");
            });
        }else  if(location.pathname =='/login'){
            let registrationData = {firstname:firstname,lastname:lastname,phoneno:phoneno,email:email,password:password}
            axios.post('http://localhost:8080/users/login/',registrationData).then((response)=>{
                    if(response.data.message == 'Either email or password is wrong'){
                        getformerror('Either email or password is wrong')
                    }else{
                        console.log(response.data.message._id)
                        localStorage.setItem('email',response.data.message.email)
                        localStorage.setItem('id',response.data.message._id)
                        localStorage.setItem('firstname',response.data.message.firstname)   
                        navigate('/userlist')
                    }
                    
            })
        } else {
            let registrationData = {
                firstname: firstname,
                lastname: lastname,
                phoneno: phoneno,
                email: email,
                password: password,
                dob: dob,
            };
            axios.post('http://localhost:8080/users/registration', registrationData).then((res) => {
                console.log(res);
                navigate("/login");
            });
        }
    };

    return (
        <>
            <div id="form-top-container">
                <div id="form-container">
                    <div className="header-form">{formname}</div>
                    <div>{formerror}</div>
                    <form className="form" onSubmit={submithandler}>
                        {buttonvalue !== 'Login' &&
                            <>
                                <div className="input-box">
                                    <label htmlFor="firstname">First name </label>
                                    <input type="text" value={firstname} onChange={firstNameHandler} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="lastname">Last name </label>
                                    <input type="text" placeholder="Last name" value={lastname} onChange={lastnameHandler} />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="phoneno">Phone no </label>
                                    <input type="text" placeholder="Phone No" value={phoneno} onChange={phonenoHandler} />
                                </div>
                            </>
                        }
                        <div className="input-box">
                            <label htmlFor="email">Email </label>
                            <input type="text" placeholder="Email" value={email} onChange={emailHandler} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="password">Password </label>
                            <input type="password" placeholder="Password" value={password} onChange={passwordHandler} />
                        </div>
                        {buttonvalue == "Update" &&
                        <div className="input-box">
                            <label htmlFor="dob">DOB </label>
                            <input type="date" placeholder="DOB" value={dob} onChange={dobHandler} />
                        </div>
                        }
                        <input type="submit" value={buttonvalue} />
                        {buttonvalue !== "Update" &&
                            <>
                                <div>{text}<a onClick={() => { navigate(path) }}>{button}</a>
                                </div>
                            </>
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default Registration;
