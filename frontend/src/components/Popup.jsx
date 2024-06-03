
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
const apiUrl = "http://localhost:2000";
console.log("url",apiUrl);
const Popup = () => {
  
  const history = useNavigate();

  const initialData = {
    Username: '',
    Useremail: '',
    Address: '',
  };
  
  const [UserDatas, setUserDatas] = useState(initialData);

  const handleOnChange = (e) => {
    setUserDatas((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${apiUrl}/post`, UserDatas)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    history('/');
  };

  const showToastMessage=()=>{
    // toast.success("Success Notification !",{
    // position:toast.POSITION.TOP_RIGHT,
    // });
    toast.success("Success Notification")
  };

  const closePopup = () => {
    // Implement the close popup logic here
  };

  return (
    <div>
      <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
          {/* header */}
          <div className="flex items-center justify-between">
            <div>
              <h1>Book Your Table</h1>
            </div>
            <div>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={closePopup}
              />
            </div>
          </div>

          {/* body */}
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="Username"
              placeholder="Name"
              value={UserDatas.Username}
              onChange={handleOnChange}
              className="w-full rounded-full border border-gray-300 px-2 py-1 mb-4"
            />
            <input
              type="email"
              name="Useremail"
              placeholder="Email"
              value={UserDatas.Useremail}
              onChange={handleOnChange}
              className="w-full rounded-full border border-gray-300 px-2 py-1 mb-4"
            />
            <input
              type="text"
              name="Address"
              placeholder="Address"
              value={UserDatas.Address}
              onChange={handleOnChange}
              className="w-full rounded-full border border-gray-300 px-2 py-1 mb-4"
            />
            <div className="flex justify-center">
              <button 
                onClick={showToastMessage}
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
              >
                Book Now
              </button>
              
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Popup;
