import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div class=" bg-gray-700">
      <div className="navbar md:container mx-auto text-white">
        <div class="flex-1">
          <Link to={"/"} class="btn btn-ghost normal-case text-xl">
            TO DO APP
          </Link>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal p-0">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
