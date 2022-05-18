import React, { useEffect, useRef } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "./Loading";

const Login = () => {
  const [signInWitGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const emailRef = useRef("");
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  useEffect(() => {
    if (gUser || user) {
      navigate("/");
    }
  }, [gUser, navigate, user]);

  if (loading || gLoading) {
    return <Loading />;
  }
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);
  };

  const handlePasswordReset = () => {
    const email = emailRef.current.value;
    if (email) {
      console.log(email);
      sendPasswordResetEmail(email);
      toast.success("Password reset email send!");
    } else {
      toast.error("Please enter a email");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="font-bold text-xl text-center">Please Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>

            <input
              type="submit"
              className="btn w-full max-w-xs mt-5"
              value={"Login"}
            />
          </form>
          {(error || gError) && (
            <p className="my-2 text-red-500">{error.message}</p>
          )}
          <p>
            Forgot password?{" "}
            <button className="text-red-500" onClick={handlePasswordReset}>
              Reset password
            </button>
          </p>
          <p>
            New to TO DO app ?{" "}
            <Link className="text-red-500" to={"/signup"}>
              Create new account
            </Link>{" "}
          </p>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWitGoogle()}
            className="uppercase btn btn-outline btn-gray-800"
          >
            <img
              width={20}
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
            />
            <span className="ml-2"> Continue With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
