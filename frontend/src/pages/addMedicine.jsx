import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';
import { useState } from 'react';
import axios from 'axios';
import NavBarPharmacist from '../components/NavBarPharmacist.jsx';

function AddMedicine() {
  // let { errors, handleSubmit, register } = Validation('username')
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // let c = (data) => {
  //   console.log(data);
  // }
  // let inputArr = [
  //   { title: 'activeIngredients', placeholder: 'enter active ingredients', type: 'activeIngredients', showErr: errors.activeIngredients?.message, register: register("activeIngredients") },
  //   { title: 'price', placeholder: 'enter price', type: 'price', showErr: errors.price?.message, register: register("price") },
  //   { title: 'availableQuantity', placeholder: 'enter available Quantity', type: 'availableQuantity', showErr: errors.availableQuantity?.message, register: register("availableQuantity") },

  // ];
  // let btnArr = [
  //   {
  //     title: 'Add Medicine',
  //     style: 'green-btn',
  //     action: handleSubmit(c),
  //   },
  // ];
  
  const [name, setName] = useState('')
  const [activeIngredients, setActiveIngredients] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [picture, setPicture] = useState('')
  const [quantitySold, setQuantitySold] = useState(0)
  const [medicalUse, setMedicalUse] = useState('')
  const {username} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append other form fields
    data.append('Name', name);
    data.append('ActiveIngredients', activeIngredients);
    data.append('Price', price);
    data.append('Quantity', quantity);
    data.append('Picture', picture);
    data.append('QuantitySold', quantitySold);
    data.append('MedicalUse', medicalUse);
    
    console.log("fontend",data)
    const addmeds = axios.post(`http://localhost:8000/Pharmacist/AddMedicine/${username}`, data, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
      .then(res => console.log(res.data)).catch(err => console.log(err))
  }

  return (
    <div>
      <NavBarPharmacist username={username} />
      {/* <Form title="Add Medicine" inputArr={inputArr} type="addMedicine" btnArr={btnArr} /> */}
      <form onSubmit={handleSubmit}>
        <h3>
          <label>Name</label>
          <input title='name' required placeholder='enter medicine name' type='text' onChange={(e) => setName(e.target.value)} />
        </h3>
        <h3>
          <label>Active Ingredient</label>
          <input type="text" required title="Active Ingredients" placeholder="Enter Active Ingredients" onChange={(e) => setActiveIngredients(e.target.value)} />
        </h3>
        <h3>
          <label>Price</label>
          <input type="number" required title="Price" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
        </h3>
        <h3>
          <label>Quantity</label>
          <input type="number" required title="Quantity" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} />
        </h3>
        <h3>
          <label>Quantity Sold</label>
          <input type="number" required title="Quantity Sold" placeholder="Enter Quantity Sold" onChange={(e) => setQuantitySold(e.target.value)} />
        </h3>
        <h3>
          <label>Medical Use</label>
          <input type="text" required title="Medical Use" placeholder="Enter Medical Use" onChange={(e) => setMedicalUse(e.target.value)} />
        </h3>
        <h3>
          <label>Medicine Image</label>
          <input type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
        </h3>
        <h3>
          <button type="submit">Submit</button>
        </h3>
      </form>
    </div>
  );
}
export default AddMedicine;
