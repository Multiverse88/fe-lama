import React from "react";
import PropTypes from "prop-types";

const Title = ({ role, description }) => {
  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-500 uppercase">
        Our Team
      </h2>
      {/* Role */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
        {role}
      </h1>
      {/* Deskripsi */}
      <p className="text-base sm:text-lg text-gray-600 mt-4">{description}</p>
    </div>
  );
};

export default Title;
