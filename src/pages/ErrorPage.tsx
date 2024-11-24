import { Link } from 'react-router-dom';
import logo from '../assets/logo-1.png';

function ErrorPage() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <img src={logo} alt="Logo" className="mb-4" />
                <h1 className="text-3xl font-bold">Page Not Found</h1>
                <h4 className="text-xl">Error 404</h4><Link to={'/login'}>Go to Login</Link>
            </div>
        </div>
    );
}

export default ErrorPage;
