import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const AppContext = createContext();



axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState('');
  const [owner, setIsOwner] = useState(false);
const [pickupDate, setPickupDate] = useState('');
const [returnDate, setReturnDate] = useState('');

  const [cars, setCars] = useState([]);

  const navigate=useNavigate();

  const fetchCars=async ()=>{
    try{

      const {data}=await axios.get('/api/user/cars');


      console.log(data.cars)
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error.message);

    }
  }

  // functions to logout from application 

   const logOut=()=>{
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);

    setIsOwner(false);
toast.success("logout successfully");

   }
  const authUser = async (type, regData) => {
    try {
      const { data } = await axios.post(`/api/user/${type}`, regData);
    

      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        toast.success("Registered successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/user-data', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(data.user.role)
    if(data.success){
            setUser(data.user); 

      setIsOwner(data.user.role==="owner")
    }
    else{
      navigate('/')
    }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
    fetchCars();
  }, [token]); // مهم جدا



  const val={
    authUser,logOut,axios,user,
   setUser,token,setToken,owner,
    setIsOwner,fetchCars,fetchUser,cars,setCars,
   pickupDate, returnDate, setPickupDate, setReturnDate

  }

  return (
    <AppContext.Provider value={val}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
