import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import "./Profile.css";

function Profile() {

    const {
        currentUser,
        setCurrentUser,
        users,
        setUsers
    } = useContext(UserContext);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
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

    const handleEdit = () => {

        setName(currentUser.name || "");
        setUsername(currentUser.username || "");
        setBio(currentUser.bio || "");
        setFavoriteAuthor(currentUser.favoriteAuthor || "");
        setFavoriteGenres(currentUser.favoriteGenres || []);

        setIsEditing(true);
    };

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

    const handleSave = (e) => {

        e.preventDefault();

        const usernameExists = users.some(
            (user) =>
                user.username?.toLowerCase() ===
                username.toLowerCase() &&
                user.id !== currentUser.id
        );

        if (usernameExists) {
            alert("Username already exists");
            return;
        }

        const updatedUser = {
            ...currentUser,
            name: name,
            username: username,
            bio: bio,
            favoriteAuthor: favoriteAuthor,
            favoriteGenres: favoriteGenres
        };

        const updatedUsers = users.map(
            (user) =>
                user.id === currentUser.id
                    ? updatedUser
                    : user
        );

        setUsers(updatedUsers);
        setCurrentUser(updatedUser);

        localStorage.setItem(
            "vaasi-users",
            JSON.stringify(updatedUsers)
        );

        localStorage.setItem(
            "vaasi-current-user",
            JSON.stringify(updatedUser)
        );

        setIsEditing(false);

        alert("Profile Updated Successfully");
    };

    const handleLogout = () => {

        setCurrentUser(null);

        localStorage.removeItem(
            "vaasi-current-user"
        );

        navigate("/");
    };

    if (!currentUser) {

        return (
            <div className="profile-page">

                <div className="profile-login-card">

                    <h2>Please Login</h2>

                    <p>
                        Login to view your VAASI profile.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>

                </div>

            </div>
        );
    }

    const joinedDate = currentUser.joinedAt
        ? new Date(
            currentUser.joinedAt
        ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "Not available";

    return (
        <div className="profile-page">

            <div className="profile-container">

                {!isEditing ? (

                    <>
                        <div className="profile-header">

                            <div className="profile-image">

                                {currentUser.profileImage ? (

                                    <img
                                        src={currentUser.profileImage}
                                        alt={currentUser.name}
                                    />

                                ) : (

                                    <span>
                                        {currentUser.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </span>

                                )}

                            </div>

                            <div className="profile-heading">

                                <h1>
                                    {currentUser.name}
                                </h1>

                                <p>
                                    @{currentUser.username}
                                </p>

                                <span className="profile-role">
                                    VAASI Reader
                                </span>

                            </div>

                        </div>

                        <div className="profile-section">

                            <h2>About Me</h2>

                            <p className="profile-bio">
                                {currentUser.bio
                                    ? currentUser.bio
                                    : "No bio added yet."}
                            </p>

                        </div>

                        <div className="profile-section">

                            <h2>Account Information</h2>

                            <div className="profile-info-grid">

                                <div className="profile-info">
                                    <span>Email</span>
                                    <strong>
                                        {currentUser.email}
                                    </strong>
                                </div>

                                <div className="profile-info">
                                    <span>Username</span>
                                    <strong>
                                        @{currentUser.username}
                                    </strong>
                                </div>

                                <div className="profile-info">
                                    <span>Member Since</span>
                                    <strong>
                                        {joinedDate}
                                    </strong>
                                </div>

                                <div className="profile-info">
                                    <span>Account Type</span>
                                    <strong>
                                        Reader
                                    </strong>
                                </div>

                            </div>

                        </div>

                        <div className="profile-section">

                            <h2>Reading Preferences</h2>

                            <div className="profile-preference">

                                <h3>Favorite Genres</h3>

                                {currentUser.favoriteGenres &&
                                currentUser.favoriteGenres.length > 0 ? (

                                    <div className="profile-tags">

                                        {currentUser.favoriteGenres.map(
                                            (genre) => (
                                                <span key={genre}>
                                                    {genre}
                                                </span>
                                            )
                                        )}

                                    </div>

                                ) : (

                                    <p>
                                        No favorite genres added yet.
                                    </p>

                                )}

                            </div>

                            <div className="profile-preference">

                                <h3>Favorite Author</h3>

                                <p>
                                    {currentUser.favoriteAuthor
                                        ? currentUser.favoriteAuthor
                                        : "No favorite author added yet."}
                                </p>

                            </div>

                        </div>

                        <div className="profile-actions">

                            <button
                                className="profile-edit"
                                onClick={handleEdit}
                            >
                                Edit Profile
                            </button>

                            <button
                                className="profile-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </div>
                    </>

                ) : (

                    <form
                        className="profile-edit-form"
                        onSubmit={handleSave}
                    >

                        <h2>Edit Profile</h2>

                        <div className="profile-edit-field">

                            <label>Full Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="profile-edit-field">

                            <label>Username</label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="profile-edit-field">

                            <label>Email</label>

                            <input
                                type="email"
                                value={currentUser.email}
                                disabled
                            />

                        </div>

                        <div className="profile-edit-field">

                            <label>About You</label>

                            <textarea
                                rows="4"
                                value={bio}
                                onChange={(e) =>
                                    setBio(e.target.value)
                                }
                                placeholder="Tell us about yourself..."
                            />

                        </div>

                        <div className="profile-edit-field">

                            <label>Favorite Author</label>

                            <input
                                type="text"
                                value={favoriteAuthor}
                                onChange={(e) =>
                                    setFavoriteAuthor(e.target.value)
                                }
                                placeholder="Your favorite author"
                            />

                        </div>

                        <div className="profile-edit-field">

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

                                        <span>
                                            {genre}
                                        </span>

                                    </label>

                                ))}

                            </div>

                        </div>

                        <div className="profile-edit-actions">

                            <button
                                type="submit"
                                className="profile-save"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="profile-cancel"
                                onClick={() =>
                                    setIsEditing(false)
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                )}

            </div>

        </div>
    );
}

export default Profile;