import { useContext } from "react";
import ReadBookCard from "../components/Readbookcard";
import ReadBookData from "../data/Readbookdata";
import "./Library.css";
import UserContext from "../Context/UserContext";

function Library() {
    const { currentUser } = useContext(UserContext);

    // =========================================================
    // LOGIN CHECK
    // =========================================================

    if (!currentUser) {
        return (
            <div>
                <h1>Please Login to access your Library</h1>
            </div>
        );
    }

    // =========================================================
    // USER-SPECIFIC STORAGE KEYS
    // =========================================================

    const currentlyReading = ReadBookData.filter((book) => {
        const progress = localStorage.getItem(
            `vaasi-progress-${currentUser.email}-${book.id}`
        );

        return progress !== null;
    });

    // =========================================================
    // CONTINUE READING
    // =========================================================

    const continueReading = [...currentlyReading]
        .filter((book) => {
            const progress = Number(
                localStorage.getItem(
                    `vaasi-progress-${currentUser.email}-${book.id}`
                ) || 0
            );

            const totalPages = Number(
                localStorage.getItem(
                    `vaasi-total-pages-${currentUser.email}-${book.id}`
                ) || 0
            );

            return totalPages === 0 || progress < totalPages;
        })
        .sort((a, b) => {
            const timeA = Number(
                localStorage.getItem(
                    `vaasi-lastread-${currentUser.email}-${a.id}`
                ) || 0
            );

            const timeB = Number(
                localStorage.getItem(
                    `vaasi-lastread-${currentUser.email}-${b.id}`
                ) || 0
            );

            return timeB - timeA;
        });

    // =========================================================
    // BOOKMARKED BOOKS
    // =========================================================

    const bookmarkedBooks = ReadBookData.filter((book) => {
        const bookmark = localStorage.getItem(
            `vaasi-bookmark-${currentUser.email}-${book.id}`
        );

        return bookmark !== null;
    });

    // =========================================================
    // COMPLETED BOOKS
    // =========================================================

    const completedBooks = ReadBookData.filter((book) => {
        const progress = Number(
            localStorage.getItem(
                `vaasi-progress-${currentUser.email}-${book.id}`
            ) || 0
        );

        const totalPages = Number(
            localStorage.getItem(
                `vaasi-total-pages-${currentUser.email}-${book.id}`
            ) || 0
        );

        return totalPages > 0 && progress >= totalPages;
    });

    // =========================================================
    // UI
    // =========================================================

    return (
        <main className="library-page">

            {/* Library Header */}
            <section className="library-hero">
                <div className="library-hero-content">
                    <p className="library-subtitle">
                        YOUR PERSONAL SPACE
                    </p>

                    <h1>MY LIBRARY</h1>

                    <p>
                        Continue your reading journey, revisit your books,
                        and keep everything you love in one place.
                    </p>
                </div>
            </section>

            {/* Continue Reading */}
            <section className="library-section">

                <div className="library-section-heading">
                    <div>
                        <p className="section-label">
                            PICK UP WHERE YOU LEFT OFF
                        </p>

                        <h2>Continue Reading</h2>
                    </div>
                </div>

                {continueReading.length > 0 ? (
                    <div className="library-book-grid">

                        {continueReading.map((book) => (
                            <ReadBookCard
                                key={book.id}
                                id={book.id}
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                                genre={book.genre}
                                bookFile={book.bookFile}
                                isLibrary={true}
                            />
                        ))}

                    </div>
                ) : (
                    <div className="empty-library">

                        <h3>Nothing to continue yet</h3>

                        <p>
                            Start reading a book and your latest book will appear here.
                        </p>

                    </div>
                )}

            </section>

            {/* Bookmarks */}
            <section className="library-section">

                <div className="library-section-heading">
                    <div>
                        <p className="section-label">
                            SAVED FOR LATER
                        </p>

                        <h2>Bookmarks</h2>
                    </div>
                </div>

                {bookmarkedBooks.length > 0 ? (
                    <div className="library-book-grid">

                        {bookmarkedBooks.map((book) => (
                            <ReadBookCard
                                key={book.id}
                                id={book.id}
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                                genre={book.genre}
                                bookFile={book.bookFile}
                                isLibrary={true}
                                isBookmark={true}
                            />
                        ))}

                    </div>
                ) : (
                    <div className="empty-library">

                        <h3>No bookmarks yet</h3>

                        <p>
                            Bookmark a page while reading and it will appear here.
                        </p>

                    </div>
                )}

            </section>

            {/* Completed Books */}
            <section className="library-section">

                <div className="library-section-heading">
                    <div>
                        <p className="section-label">
                            YOUR READING MILESTONES
                        </p>

                        <h2>Completed Books</h2>
                    </div>
                </div>

                {completedBooks.length > 0 ? (
                    <div className="library-book-grid">

                        {completedBooks.map((book) => (
                            <ReadBookCard
                                key={book.id}
                                id={book.id}
                                cover={book.cover}
                                title={book.title}
                                author={book.author}
                                genre={book.genre}
                                bookFile={book.bookFile}
                                isLibrary={true}
                                isCompleted={true}
                            />
                        ))}

                    </div>
                ) : (
                    <div className="empty-library">

                        <h3>No completed books yet</h3>

                        <p>
                            Finish reading a book and it will appear here.
                        </p>

                    </div>
                )}

            </section>

        </main>
    );
}

export default Library;