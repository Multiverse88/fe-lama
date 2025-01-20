import React from "react";
import PropTypes from "prop-types";
import Title from "./Title";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Card = ({ title, description, teamMembers }) => {
  return (
    <div className="container mx-auto text-center">
      {/* Title Section */}
      <Title role={title} description={description} />

      {/* Team Members Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl p-6">
            <img
              className="mx-auto object-cover w-24 h-24 rounded-full"
              src={member.image}
              alt={member.name}
            />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500">{member.role}</p>
            <div className="flex justify-center gap-4 mt-4 text-gray-400">
              <a
                href={member.social.linkedin}
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={member.social.github}
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Validasi tipe data untuk props
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  teamMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      social: PropTypes.shape({
        github: PropTypes.string.isRequired,
        linkedin: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default Card;
