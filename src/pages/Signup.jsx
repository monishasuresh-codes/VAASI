import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import "./Signup.css";

function Signup() {

    const { users, setUsers } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [favoriteAuthor, setFavoriteAuthor] = useState("");
    const [favoriteGenres, setFavoriteGenres] = useState([]);

    const genres = [
        "Fiction",
        "Romance",
        "Mystery",
        "Fantasy",
        "Thriller",
        "Self-help",
        "Biography",
        "History"
    ];

    const handleGenreChange = (genre) => {
        if (favoriteGenres.includes(genre)) {
            setFavoriteGenres(
                favoriteGenres.filter(
                    (item) => item !== genre
                )
            );
        } else {
            setFavoriteGenres([
                ...favoriteGenres,
                genre
            ]);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const existingUser = users.some(
            (user) =>
                user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            alert("This Email already exists, Try logging in");
            return;
        }

        const existingUsername = users.some(
            (user) =>
                user.username.toLowerCase() === username.toLowerCase()
        );

        if (existingUsername) {
            alert("Username already exists");
            return;
        }

        const newUser = {
            id: crypto.randomUUID(),
            name: name,
            username: username,
            email: email,
            password: password,
            profileImage: profileImage,
            bio: bio,
            favoriteAuthor: favoriteAuthor,
            favoriteGenres: favoriteGenres,
            joinedAt: new Date().toISOString(),
            role: "user"
        };

        const updatedUsers = [
            ...users,
            newUser
        ];

        localStorage.setItem(
            "vaasi-users",
            JSON.stringify(updatedUsers)
        );

        setUsers(updatedUsers);

        alert("Signup Successful");

        navigate("/login");
    };

    return (
        <div className="signup-page">

            <div className="signup-container">

                <div className="signup-header">
                    <h1>Create Your VAASI Profile</h1>

                    <p>
                        Create your account and personalize
                        your reading experience.
                    </p>
                </div>

                <form
                    className="signup-form"
                    onSubmit={handleSignup}
                >

                    {/* Basic Information */}

                    <div className="signup-section">

                        <h2>Basic Information</h2>

                        <div className="signup-row">

                            <div className="signup-field">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="signup-field">
                                <label>Username</label>

                                <input
                                    type="text"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>

                        </div>

                        <div className="signup-field">

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

                    </div>


                    {/* Account Security */}

                    <div className="signup-section">

                        <h2>Account Security</h2>

                        <div className="signup-row">

                            <div className="signup-field">

                                <label>Password</label>

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="signup-field">

                                <label>Confirm Password</label>

                                <input
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* Reading Profile */}

                    <div className="signup-section">

                        <h2>Reading Profile</h2>

                        <div className="signup-field">

                            <label>Profile Picture URL</label>

                            <input
                                type="text"
                                placeholder="Paste image URL (optional)"
                                value={profileImage}
                                onChange={(e) =>
                                    setProfileImage(e.target.value)
                                }
                            />

                        </div>


                        <div className="signup-field">

                            <label>Favorite Author</label>

                            <input
                                type="text"
                                placeholder="Your favorite author (optional)"
                                value={favoriteAuthor}
                                onChange={(e) =>
                                    setFavoriteAuthor(e.target.value)
                                }
                            />

                        </div>


                        <div className="signup-field">

                            <label>About You</label>

                            <textarea
                                placeholder="Tell us a little about yourself..."
                                value={bio}
                                onChange={(e) =>
                                    setBio(e.target.value)
                                }
                                rows="4"
                            />

                        </div>


                        <div className="signup-field">

                            <label>Favorite Genres</label>

                            <div className="genre-options">

                                {genres.map((genre) => (

                                    <label
                                        className={
                                            favoriteGenres.includes(genre)
                                                ? "genre-option selected"
                                                : "genre-option"
                                        }
                                        key={genre}
                                    >

                                        <input
                                            type="checkbox"
                                            checked={favoriteGenres.includes(genre)}
                                            onChange={() =>
                                                handleGenreChange(genre)
                                            }
                                        />

                                        <span>{genre}</span>

                                    </label>

                                ))}

                            </div>

                        </div>

                    </div>


                    <button
                        className="signup-submit"
                        type="submit"
                    >
                        Create Account
                    </button>

                    <p className="login-link">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")}>
                            Login
                        </span>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Signup;