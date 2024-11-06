import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import { useState } from 'react';
import axios from 'axios'

function AddAdministrator() {
  // let { errors, handleSubmit, register } = Validation('username')
  // let c = (data) => {
  //   console.log(data);
  // }
  // let inputArr = [
  //   { title: 'username', placeholder: 'enter username', type: 'username', showErr: errors.username?.message, register: register("username"),  },
  //   { title: 'password', placeholder: 'enter password', type: 'password', showErr: errors.password?.message, register: register("password") },
  // ];
  // let btnArr = [
  //   {
  //     title: 'Add Administrator',
  //     style: 'green-btn',
  //     action: handleSubmit(),
  //   },
  // ];
  const [Username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null);
  const {username} = useParams();

  const axiosJWT = axios.create();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const data = {Username:Username, Password:password, Email:email}
    console.log(data);
    console.log(sessionStorage.getItem("token"));
    await axios.post(`http://localhost:8000/Admin/AddAdmin/${username}`,data,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    });
    console.log("ya bashaa");
    } catch(err){
      alert("Adding another Admin failed");
    }    
  }

  return (
    <div>
      <NavBarAdministrator />
      {/* <Form title="Add Administrator" inputArr={inputArr} type="addAdministrator" btnArr={btnArr} /> */}
      <form onSubmit={handleSubmit}>
  <input  title= 'username' required placeholder= 'enter username' type= 'text' onChange={(e) => setUsername(e.target.value)} />
  <input type="email" required title="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
  <input type="password" required title="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
  <button type="submit">Submit</button>
</form>

    </div>
  );
}
export default AddAdministrator;
