import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import "./Userlogin.css";

function Userlogin() {

    const { users, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        const user = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (user) {

            setCurrentUser(user);

            localStorage.setItem(
                "vaasi-current-user",
                JSON.stringify(user)
            );

            alert("Login Successful");
            navigate('/profile');   

        } else {

            const emailExists = users.some(
                (user) => user.email === email
            );

            if (emailExists) {

                alert("Wrong Password");

            } else {

                alert("Account not found. Please Sign Up");

            }
        }
    };

    return (
        <div className="login-page">

            <div className="login-overlay">

                <div className="login-popup">

                    <div className="login-header">

                        <div className="login-icon">
                            📚
                        </div>

                        <h1>Welcome Back</h1>

                        <p>
                            Login to continue your VAASI
                            reading experience.
                        </p>

                    </div>


                    <form
                        className="login-form"
                        onSubmit={handleLogin}
                    >

                        <div className="login-field">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="login-field">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>


                        <button
                            className="login-submit"
                            type="submit"
                        >
                            Login
                        </button>

                    </form>


                    <p className="signup-link">

                        Don't have an account?{" "}

                        <span
                            onClick={() => navigate("/signup")}
                        >
                            Create Account
                        </span>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Userlogin;