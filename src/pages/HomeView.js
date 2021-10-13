import "../index.css";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./Login";
import TableView from "../components/table.js"

function HomeView () {

  const history = useHistory();
  // check to see if the user is not logged in
  if (!localStorage.getItem("user-info")) {
    return <Login />;
  }

  async function loginOutHandler(event) {
    event.preventDefault();
    // TODO create logout handler
    localStorage.removeItem("user-info");
    history.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full space-y-8 ">
        <div className="overflow-hidden sm:rounded-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 px-5 py-10">
              HOME VIEW
            </h2>
            <div className="text-center group relative w-full flex justify-center py-2 px-4">
              
                <TableView className="shadow"/>
              
            </div>
            <div className="mt-6 text-center"></div>
            <div className="px-5 py-10">
             
              <button
                onClick={loginOutHandler}
                className=" py-2 px-4 underline group relative w-full"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
