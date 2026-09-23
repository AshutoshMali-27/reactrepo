import { useForm } from "react-hook-form";
import type { LoginRequests } from "../types";
import { useLogin } from "../hooks/useLogin";
import { loginValidation } from "../auth.validation";
interface LoginFormProps {
    onSuccess?: () => void;
}
function LoginForm({onSuccess}: LoginFormProps){
    const loginMutation = useLogin();
    const {register,handleSubmit,formState:{errors }} = useForm<LoginRequests>();
    const onSubmit = (data: LoginRequests) => {
        loginMutation.mutate(data, {
            onSuccess: () => {
                 onSuccess?.();
            },
        });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">
                    User Name
                </label>
                <input className="form-control" {...register("userName",{ required:loginValidation.userName.required, })} />
                {errors.userName && ( <small className="text-danger"> {errors.userName.message} </small>)}
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Password
                </label>
                <input type="password"  className="form-control" {...register( "password", { required: loginValidation.password.required, } )}/>
                {errors.password && ( <small className="text-danger"> {errors.password.message} </small>)}

            </div>
            {loginMutation.isError && (<div className="alert alert-danger"> Login failed. Please check your credentials.</div>)}
            <button type="submit" className="btn btn-primary" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
export default LoginForm;