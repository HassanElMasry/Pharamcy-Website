import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate()
  const[result, setResult] = useState('');
  const handleAdd = async() => {
    try{
    const response = await axios.post(`http://localhost:8000/Patient/AddMedicineToCart/${username}/${data.Name}`, "", {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
   // .then(res =>setResult(res)).catch(err => console.log(err))
      if (response.status === 200) {
            alert(response.data.message);
              console.log(response.data.message);
          }}
          catch(error ){
            alert(`Failed to add item `);
            console.error('Error adding item:', error);
          };
  }
  //console.log('added', result);
  return (
    <>
      
    {data.Name && <th>{data.Name}</th>}

    {data.ActiveIngredients && <td>{data.ActiveIngredients}</td>}
    {data.Price && <td>{data.Price}</td>}
    {data.Picture && <td> <img src = {data.Picture} alt='image' width={60} height={60}/> </td>}
    {data.MedicalUse && <td>{data.MedicalUse}</td>}
    {data.Quantity && <td>{data.Quantity}</td>}
    {data.Sales && <td>{data.Sales}</td>}

    {data.Gender&&<td>{data.Gender}</td>}
    {data.Age&&<td>{data.Age}</td>}
    {data.MobileNumber&&<td>{data.MobileNumber}</td>}

    {data.Affiliation&&<td>{data.Affiliation}</td>}
    {data.HourlyRate&&<td>{data.HourlyRate}</td>}
    {data.EducationalBackground&&<td>{data.EducationalBackground}</td>}
      

      {data.ActiveIngredients && 
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={handleAdd}
      >
        Add to cart
      </button>
      </div>
      </td>
      }
      {data.Gender &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/patientInfo/${data.Username}/${username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Affiliation && !data.Status &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/pharmacistInfo/${data.Username}/${username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Status &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/requestInfo/${data.Username}/${username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Status&&<td>{data.Status}</td>}
    </>
  );
}

// function NoramlTableBody({ data }) {
//   let arr = [];
//   for (let key in data) arr.push(data[key]);

//   return (
//     <>
//       {arr.map((e) => (
//         <td>{e}</td>
//       ))}
//     </>
//   );
// }

function Table({ tHead, data, searchText, filterText, username}) {
  return (
    <div className="case-table card mt-4">
      <table className="table table-striped m-0">
        <thead>
          <tr className="text-capitalize">
            {tHead.map((e) => (
              <th scope="col">{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
          .filter((e) => {
            return filterText.toLowerCase() === '' || filterText.toLowerCase() === 'all'?
            e : e.MedicalUse.toLowerCase() === filterText.toLowerCase()
          })
          .filter((e) => {
            return searchText.toLowerCase() === '' ? 
            e: e.Name.toLowerCase().includes(searchText.toLowerCase())
          })
          .map((e) => (
            <tr className="text-capitalize">
                <CaseTableBody data={e} username={username}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
