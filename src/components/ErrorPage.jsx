import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen grid place-items-center px-4 sm:px-6 md:px-10 text-center">
      <div className="w-full max-w-xl mx-auto">
        <FlagIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-700" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-8 !text-2xl sm:!text-3xl md:!text-4xl !leading-snug"
        >
          Error 404 <br /> It looks like something went wrong.
        </Typography>
        <Typography className="mt-6 mb-10 text-base sm:text-lg font-normal text-gray-900 mx-auto px-2 sm:px-4 md:px-0">
          Don&apos;t worry, our team is already on it. Please try refreshing
          the page or come back later.
        </Typography>
        <Link to="/">
          <Button className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-3 rounded-md">
            back home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
