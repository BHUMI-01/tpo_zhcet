import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../../components/Admin/Admin';

const Admn = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("token"));
        if (!auth) {
            navigate("/");
        }
    }, [])
  return (
    <div>
      <AdminPanel/>
    </div>
  )
}

export default Admn
