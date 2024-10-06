//frontend/src/Pages/Signin.jsx
import React from "react";
import "../Styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {signinUser} from '../Redux/actions/userActions';
export const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SigninHandler = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        const userDetails = await dispatch(signinUser(formData));
        if (userDetails._id) {
            navigate(`/user/${userDetails._id}`);
        }
        form.reset();
    }
    return(
        <>
            <div className="SG_HD1_H1"><h1 className="SG_H1">Signin User</h1></div>
            <div className="FRM_DIV_D">
                <form className="FRM_DIV" onSubmit={SigninHandler}>
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
                        <input className="FRM_SBTN" type="submit" value="Sign In" />
                        <Link to="/signup" className="FRM_LNK_BTN">Don't Have Any Account? Click Here</Link>
                    </div>
                </form>
            </div>
        </>
    );
}