import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

function ReadBookCard({
    id,
    cover,
    title,
    author,
    genre,
    bookFile,
    isLibrary = false,
    isBookmark = false,
    isCompleted = false
}) {
    const navigate = useNavigate();

    const { requireLogin, currentUser } = useContext(UserContext);

    const progress = Number(
        localStorage.getItem(
            `vaasi-progress-${currentUser?.email}-${id}`
        ) || 0
    );

    const totalPages = Number(
        localStorage.getItem(
            `vaasi-total-pages-${currentUser?.email}-${id}`
        ) || 0
    );

    const progressPercentage =
        totalPages > 0
            ? Math.round((progress / totalPages) * 100)
            : 0;

    const bookmark = Number(
        localStorage.getItem(
            `vaasi-bookmark-${currentUser?.email}-${id}`
        ) || 0
    );

    return (
        <div className="read-book-card">

            <div className="read-book-cover">
                <img
                    src={cover}
                    alt={title}
                />
            </div>

            <div className="read-book-info">

                <p className="read-book-genre">
                    {genre}
                </p>

                <h3>{title}</h3>

                <span>{author}</span>

                {isLibrary && progress && !isBookmark && !isCompleted && (
                    <p className="reading-page">
                        Last read: Page {progress}
                    </p>
                )}

                {isLibrary &&
                    progress &&
                    totalPages > 0 &&
                    !isBookmark &&
                    !isCompleted && (
                        <div className="reading-progress">

                            <div className="reading-progress-bar">

                                <div
                                    className="reading-progress-fill"
                                    style={{
                                        width: `${progressPercentage}%`
                                    }}
                                ></div>

                            </div>

                            <span className="reading-progress-text">
                                {progressPercentage}% completed
                            </span>

                        </div>
                    )}

                {isBookmark && bookmark > 0 && (
                    <p className="reading-bookmark">
                        🔖 Bookmarked Page: {bookmark}
                    </p>
                )}

                <button
                    onClick={() => {
                        if (requireLogin()) {
                            navigate(
                                isCompleted
                                    ? `/reader/${id}?restart=true`
                                    : isBookmark
                                        ? `/reader/${id}?page=${bookmark}`
                                        : `/reader/${id}`
                            );
                        }
                    }}
                >
                    {isCompleted
                        ? "Read Again"
                        : isBookmark
                            ? "Go to Bookmark"
                            : isLibrary
                                ? "Continue Reading"
                                : "Read Now"}
                </button>

            </div>

        </div>
    );
}

export default ReadBookCard;