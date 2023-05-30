import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../../utils/route.constant";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center h-screen justify-center flex-col gap-8">
      <p className="text-3xl text-ellipsis text-primary-600">
        You should be logged in for access this page
      </p>
      <button className="" onClick={() => navigate(APP_ROUTE.HOME)}>
        Back to login
      </button>
    </div>
  );
};

export default NotFoundPage;
