import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate();
  const handleRemove = async() => {
    try{
    const response = await axios.delete(`http://localhost:8000/Patient/removeItemFromCart/${username}/${data.medicine}`, {
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
   // .then(res =>setResult(res)).catch(err => console.log(err))
      if (response.status === 200) {
            alert(response.data.message);
              console.log(response.data.message);
          }}
          catch(error ){
            alert(`Failed to remove item `);
            console.error('Error removing item:', error);
          };
          window.location.reload(true);        
      }
      const handleQuantityAdd = async() => {
        try{
          const newQuantity = data.quantity+1;
        const response = await axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${newQuantity}`,"",{
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        })
       // .then(res =>setResult(res)).catch(err => console.log(err))
          if (response.status === 200) {
                alert(response.data.message);
                  console.log(response.data.message);
              }}
              catch(error ){
                alert(`Failed to remove item `);
                console.error('Error removing item:', error);
              };
              window.location.reload(true);        
          }
          const handleQuantityRemove = async() => {
            if(data.quantity>1){
            try{
            const response = await axios.put(`http://localhost:8000/Patient/updateQuantity/${username}/${data.medicine}/${data.quantity-1}`, "", {
              headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
            }) 
            if (response.status === 200) {
              alert(response.data.message);
                console.log(response.data.message);
            }}
            catch(error ){
              alert(`Failed to remove item `);
              console.error('Error removing item:', error);
            };
            window.location.reload(true);    
          }
          else{
            try{
              const response = await axios.delete(`http://localhost:8000/Patient/removeItemFromCart/${username}/${data.medicine}`, {
                headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
              })
              if (response.status === 200) {
                alert(response.data.message);
                  console.log(response.data.message);
              }}
              catch(error ){
                alert(`Failed to remove item `);
                console.error('Error removing item:', error);
              };
              window.location.reload(true);
          }           
              }
            
  return (
    <>
    <th>{data.medicine}</th>
    <td>{data.quantity}</td>


      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={handleRemove}
      >
        Remove
      </button>
      </div>
      </td>

      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={handleQuantityAdd}
      >
        +
      </button>
      </div>
      </td>

      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={handleQuantityRemove}
      >
        -
      </button>
      </div>
      </td>
      
      
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

function TableCart({ tHead, data, username }) {
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

export default TableCart;
