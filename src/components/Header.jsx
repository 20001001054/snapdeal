import { useNavigate } from "react-router-dom";
import '../css/header.css';
const Header = ()=>{
    const navigate = useNavigate();
    return(
        <>
        <div id="navigation-container">
        <div id="logo">React</div>
        <ul>
            <div class="header-li">
            <li><a onClick={()=>{navigate('/')}}>Home</a></li>
            <li><a onClick={()=>{navigate('/registration')}}>Registration</a></li>
            <li><a onClick={()=>{navigate('/login')}}>Login</a></li>
            <li><a onClick={()=>{navigate('/Contact')}}>Contact</a></li>
            <li><a onClick={()=>{navigate('/About')}}>About Us</a></li>
            <li><a onClick={()=>{navigate('/userlist')}}>User </a></li>
            
            </div>
        </ul>
        </div>
        </>
    )
}
export default Header;