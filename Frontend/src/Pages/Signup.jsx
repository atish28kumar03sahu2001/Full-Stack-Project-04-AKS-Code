//frontend/src/Pages/Signup.jsx
import "../Styles/Signup.css";
import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../Redux/actions/userActions";
export const Signup = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, success, error} = useSelector(state => state.userAuth);

    const HandleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };
    const SignupHandler = (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        dispatch(signupUser(formData));
        form.reset();
        setImagePreview(null);
    }
    useEffect(()=>{
        if(success) navigate("/signin");
    },[success, navigate]);
    return (
        <>
            <div className="SG_HD1_H1"><h1 className="SG_H1">Signup User</h1></div>
            <div className="FRM_DIV_D">
                <form className="FRM_DIV" onSubmit={SignupHandler}>
                    <div className="SGUP_FRM_IMG">
                        {
                            imagePreview ? (
                                <img src={imagePreview} alt="Preview" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                            ) : (
                                <IoPersonCircle size={62} color="rgb(63, 9, 58)" />
                            )
                        }
                        <label className="FRM_IMG_LBL" htmlFor="userimage"><GrGallery size={20} color="white" /></label>
                        <input type="file" id="userimage" name="userimage" onChange={HandleImageChange} accept="image/*" style={{display:"none"}} />
                    </div>
                    <div className="FRM_PART">
                        <label className="FRM_LBL" htmlFor="username">Username</label>
                        <input className="FRM_IP" required type="text" placeholder="Enter Username" id="username" name="username" />
                    </div>
                    <div className="FRM_PART">
                        <label className="FRM_LBL" htmlFor="useremail">Useremail</label>
                        <input className="FRM_IP" required type="text" placeholder="Enter Useremail" id="useremail" name="useremail" />
                    </div>
                    <div className="FRM_PART">
                        <label className="FRM_LBL" htmlFor="password">Password</label>
                        <input className="FRM_IP" required type="password" placeholder="Enter Password" id="password" name="password" />
                    </div>
                    <div className="FRM_PART1">
                        <input className="FRM_SBTN" type="submit" value="Sign Up" />
                        <Link to="/signin" className="FRM_LNK_BTN">Already Have Account? Click Here</Link>
                    </div>
                </form>
            </div>
        </>
    );
}