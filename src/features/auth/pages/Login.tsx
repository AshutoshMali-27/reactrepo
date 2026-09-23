import { useNavigate } from "react-router-dom";
import LoginForm from "../component/LoginForm";

function Login() {

    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate("/");
    };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <h2 className="mb-4">
                        Login
                    </h2>
                    <LoginForm  onSuccess={handleSuccess} />
                </div>

            </div>

        </div>
    );
}

export default Login;