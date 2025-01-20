import React from "react";
import Card from "./Card";

const Tester = () => {
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
      title="Tester Team"
      description="Meet our skilled developers who build amazing applications."
      teamMembers={teamMembers}
    />
  );
};

export default Tester;
