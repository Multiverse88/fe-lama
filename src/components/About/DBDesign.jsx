import React from "react";
import Card from "./Card";

const DBDesign = () => {
  const teamMembers = [
    {
      name: "Hikel Bahrul",
      role: "Front-End Developer",
      image: "/images/hikel.jpg",
      social: {
        github: "https://github.com/hikelbahrul",
        linkedin: "https://linkedin.com/in/hikelbahrul",
      },
    },
  ];

  return (
    <Card
      title="Database Designer Team"
      description="Meet our skilled developers who build amazing applications."
      teamMembers={teamMembers}
    />
  );
};

export default DBDesign;
