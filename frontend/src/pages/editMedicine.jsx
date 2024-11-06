import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';
import NavBarPharmacist from '../components/NavBarPharmacist.jsx'
import { useState } from 'react';
import axios from 'axios';

function EditMedicine() {
  const { name, username } = useParams();
  const [activeIngredients, setActiveIngredients] = useState('');
  const [price, setPrice] = useState(0);
  const [picture, setPicture] = useState('');

  // let { errors, handleSubmit, register } = Validation('username')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let c = (data) => {
  //   console.log(data);
  // }
  // let inputArr = [
  //   { title: 'activeIngredients', placeholder: 'enter active ingredients', type: 'activeIngredients', showErr: errors.activeIngredients?.message, register: register("activeIngredients") },
  //   { title: 'price', placeholder: 'enter price', type: 'price', showErr: errors.price?.message, register: register("price") },
  // ];
  // let btnArr = [
  //   {
  //     title: 'Edit Medicine',
  //     style: 'green-btn',
  //     action: handleSubmit(c),
  //   },
  // ];
  const updateIngredients = (e) => {
    e.preventDefault();
    const data = { ActiveIngredients: activeIngredients }
    console.log(data)
    const response = axios.put(`http://localhost:8000/Pharmacist/UpdateMed/${username}/${name}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => console.log(res.data)).catch(err => console.log(err))
  }
  const updatePrice = (e) => {
    e.preventDefault();
    const data = { Price: price }
    console.log(data)
    const response = axios.put(`http://localhost:8000/Pharmacist/UpdateMed/${username}/${name}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => console.log(res.data)).catch(err => console.log(err))
  }
  const updatePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('Picture', picture);
    console.log(data);

    axios.put(`http://localhost:8000/Pharmacist/UpdateMed/${username}/${name}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <NavBarPharmacist username={username}/>
      <h1>Edit Medicine</h1>
      {/* <Form title="Edit Medicine" inputArr={inputArr} type="editMedicine" btnArr={btnArr} /> */}
      <form>
        <h3>
          <input placeholder='active ingredients' type='text' onChange={(e) => setActiveIngredients(e.target.value)} />
          <button onClick={updateIngredients}>
            Update Active Ingredients</button>
        </h3>

        <h3>
          <input placeholder='price' type='text' onChange={(e) => setPrice(e.target.value)} />
          <button onClick={updatePrice}>
            Update Price</button>
        </h3>

        <h3>
          <input placeholder='medicine image' type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
          <button onClick={updatePicture}>
            Update Medicine Image</button>
        </h3>

      </form>

    </div>
  );
}
export default EditMedicine;
