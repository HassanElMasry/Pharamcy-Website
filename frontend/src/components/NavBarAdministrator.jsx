import MainBtn from './Button';
import logo from '../assets/images/svg/logo.svg';
import notify from '../assets/images/svg/notification.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showUserDrop } from '../features/userDropDown.js';
import DropDown from './Dropdown.jsx';
import axios from 'axios';
function NavBarAdministrator(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.loggedIn);

  const handleLogout = async (event) => {
    event.preventDefault(); 
    try {
    console.log(sessionStorage.getItem("token"));
    const response = await axios.post(`http://localhost:8000/logout/${props.username}`,"",{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    });
    sessionStorage.removeItem('token');
    console.log(sessionStorage.getItem("token"));
    navigate(`/login`);}
    catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.error : error.message);
    }
  };
  return (
    <nav className="navbar shadow-sm mb-4">
      <div className="d-flex flex-row justify-content-between w-100 align-items-center">
        <div className="d-flex flex-row">
          <a className="navbar-brand">
            <img src='https://i.pinimg.com/originals/57/1a/e3/571ae39ce1b3360b0cf852322b413bdb.jpg' alt="Pharmacy" width={40} height={40} />
          </a>
        </div>
        
          <div>
          <MainBtn
              txt="Home"
              style="green-btn"
              action={() => navigate(`/administratorView/${props.username}`)}
              key="navBtn"
            />
          </div>
          <div>
            <MainBtn
              txt="Change Password"
              style="green-btn"
              action={() => navigate(`/changePassword/${props.username}`)}
              key="navBtn"
            />
          </div>
          <div>
            <MainBtn
              txt="Logout"
              style="green-btn"
              action={handleLogout}
              key="navBtn"
            />
          </div>


      </div>
    </nav>
  );
}

export default NavBarAdministrator;
