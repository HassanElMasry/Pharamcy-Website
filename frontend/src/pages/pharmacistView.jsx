import { Navigate, useNavigate, useParams } from "react-router-dom";
import MainBtn from "../components/Button";
import NavBarPharmacist from "../components/NavBarPharmacist";
import MedicineListPharmacist from "../components/medicineListPharmacist";


function PharmacistView(){
    const navigate = useNavigate();
    const {username} = useParams();
return (
    <div>
    <NavBarPharmacist username={username}/>
    <MainBtn
              txt="Add Medicine"
              style="green-btn"
              action={() => navigate(`/addMedicine/${username}`)}
              key="navBtn"
            />
    <MedicineListPharmacist username={username}/>
    </div>
)
}
export default PharmacistView;