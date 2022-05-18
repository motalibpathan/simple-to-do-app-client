import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "./Loading";

const SignUp = () => {
  const [signInWitGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  useEffect(() => {
    if (gUser || user) {
      navigate("/");
    }
  }, [gUser, navigate, user]);

  if (loading || gLoading || updating) {
    return <Loading />;
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="font-bold text-xl text-center">Create New Account</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
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
            Already register?{" "}
            <Link className="text-red-500" to={"/login"}>
              Please login
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

export default SignUp;
