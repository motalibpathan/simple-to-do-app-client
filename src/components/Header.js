import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "./Loading";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className=" bg-gray-100">
      <div className="navbar md:container mx-auto">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            TO DO APP
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            {!user && (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
            {user && (
              <div className="flex items-center">
                <span className="font-bold mr-3">{user?.displayName}</span>
                <button
                  className="cursor-pointer font-bold rounded-xl py-2 px-7 bg-red-500 text-white"
                  onClick={() => signOut(auth)}
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
