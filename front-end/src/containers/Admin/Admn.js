import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../../components/Admin/Admin';
import Nabvar from '..//../components/navbar/Navbar';
const Admn = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("token"));
        if (!auth) {
            navigate("/");
        }
    }, [])
  return (
    <><Nabvar/>

    <div>
      
      <AdminPanel/>
    </div>    </>
  )
}

export default Admn
