import { useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css"

function Auth(){
    const location = useLocation();
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [showPopup,setShowPopup]=useState(false)
    useEffect(() => {

    if (
        !currentUser &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup"
    ) {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 7000);

        return () => clearTimeout(timer);
    }

}, [currentUser, location.pathname]);
    const handleSignup = () =>{
        setShowPopup(false)
        navigate('/signup')
    }
    const handleLogin = () =>{
        setShowPopup(false)
        navigate('/login')
    }
    const handleSkip = () =>{
        setShowPopup(false)
        
    }
    return(
        
            <div>
                {showPopup && (
                <div className="auth-overlay">
                    <div className="auth-popup">

                        <button
                            className="auth-close"
                            onClick={handleSkip}
                        >
                            ×
                        </button>

                        <h2>Welcome to VAASI 📚</h2>

                        <p>
                            Login or create an account to enjoy
                            your personal reading experience.
                        </p>

                        <div className="auth-buttons">

                            <button onClick={handleSignup}>
                                Sign Up
                            </button>

                            <button onClick={handleLogin}>
                                Login
                            </button>

                        </div>

                        <button
                            className="auth-skip"
                            onClick={handleSkip}
                        >
                            Maybe Later
                        </button>

                    </div>
                </div>
            )}

            </div>
        
    )
}
export default Auth;