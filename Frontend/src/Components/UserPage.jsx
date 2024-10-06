// frontend/src/Components/User.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoPersonCircle } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { updateUserProfile } from '../Redux/actions/userActions';
import '../Styles/UserPage.css';
import '../Styles/Signup.css';

export const UserPage = () => {
    const [userData, setUserData] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const userInfo = useSelector(state => state.userAuth.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            setUserData(userInfo);
        } else {
            const storedUser = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUser) {
                setUserData(storedUser);
            }
        }
    }, [userInfo]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/signin';
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const HandleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const userId = userData._id;
        const updatedUser = dispatch(updateUserProfile(formData, userId));
        if (updatedUser) {
            setUserData(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        }
        form.reset();
        setImagePreview(null);
    };

    return (
        <>
            <div className="UP_DIV_HD1"><h1 className="UP_H1">User Profile</h1></div>
            {userData && (
                <div className="PF_DIV">
                    {userData.userimage && (
                        <img className="IMG_SRC" src={userData.userimage && userData.userimage.data ? `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(userData.userimage.data)))}` : `data:image/png;base64,${userData.userimage}`} alt={userData.username} />
                    )}
                    <p className="PF_P">{userData.username}</p>
                    <p className="PF_P">{userData.useremail}</p>
                    <button className="LG_BTN" onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div className="UP_FRM_DIV_D">
                <form className='UP_FRM_D' onSubmit={HandleUpdate}>
                    <div className="UP_IMG_FRM">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                        ) : (
                            <IoPersonCircle size={62} color="rgb(63, 9, 58)" />
                        )}
                        <label className="FRM_IMG_LBL" htmlFor="userimage">
                            <GrGallery size={20} color="white" />
                        </label>
                        <input type="file" id="userimage" name="userimage" onChange={handleImageChange} accept="image/*" style={{ display: "none" }} />
                    </div>
                    <div className="FRM_LB_IP_D">
                        <label className="UP_LBL" htmlFor="username">Username</label>
                        <input className="UP_IP" type="text" placeholder="Enter Username" id="username" name="username" />
                    </div>
                    <div className="FRM_LB_IP_D">
                        <label className="UP_LBL" htmlFor="useremail">Useremail</label>
                        <input className="UP_IP" type="text" placeholder="Enter Useremail" id="useremail" name="useremail" />
                    </div>
                    <div className="FRM_LB_IP_D">
                        <label className="UP_LBL" htmlFor="password">Password</label>
                        <input className="UP_IP" type="password" placeholder="Enter Password" id="password" name="password" />
                    </div>
                    <div className="FRM_LB_IP_D">
                        <input className="UP_SBTN" type="submit" value="Update Profile" />
                    </div>
                </form>
            </div>
        </>
    );
};
//Atish Kumar Sahu atish123 Lipun Kumar Sahu lipun456