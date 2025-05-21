import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 text-center">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl w-full">
        <XCircleIcon className="w-25 h-25 text-gray-900 mx-auto mb-6" />

        <Typography
          variant="h1"
          color="blue-gray"
          className="text-3xl md:text-4xl font-semibold leading-snug"
        >
          404 - Page Not Found
        </Typography>

        <Typography className="mt-4 text-gray-700 text-base md:text-lg">
          Oops! It looks like something went wrong.
        </Typography>
        <Typography className="mt-2 text-sm md:text-base text-gray-600">
          Don’t worry, our team is already on it. Please try refreshing the page
          or come back later.
        </Typography>

        <div className="mt-8">
          <Link to="/">
            <Button
              className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-3 rounded-md"
              ripple={true}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
