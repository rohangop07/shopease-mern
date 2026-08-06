import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return(
        <div className="notfound">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                Oops! The page you're looking for doesn't exist.
            </p>

            <Link to="/" className="home-btn">
             ⬅ Back to Home
             </Link>

        </div>
    );
}

export default NotFound;