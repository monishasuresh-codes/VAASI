import './Footer.css';

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">
                    <h2>VAASI</h2>
                    <p>
                        Discover stories, explore new worlds,
                        and find your next favorite book.
                    </p>
                </div>

                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <a href="/">Home</a>
                    <a href="/explore">Explore Books</a>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                </div>

                <div className="footer-links">
                    <h3>Explore</h3>
                    <a href="/categories">Categories</a>
                    <a href="/trending">Trending Books</a>
                    <a href="/new-arrivals">New Arrivals</a>
                    <a href="/authors">Popular Authors</a>
                </div>

                <div className="footer-contact">
                    <h3>Stay Connected</h3>
                    <p>Follow your curiosity. Read something wonderful.</p>

                    <div className="footer-social">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 VAASI. All rights reserved.</p>
                <p>Made for book lovers.</p>
            </div>

        </footer>
    );
}

export default Footer;