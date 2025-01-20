import React from "react";
import Programmer from "../components/About/Programmer";
import Analyst from "../components/About/Analyst";
import DBDesign from "../components/About/DBDesign";
import Tester from "../components/About/Tester";
import Uiux from "../components/About/UIUX";

const AboutPage = () => {
  return (
    <>
      <div className="bg-gray-50 py-12 pt-40">
        <Analyst />
      </div>
      <div className="bg-secondary bg-opacity-10 py-12">
        <Uiux />
      </div>
      <div className="bg-gray-50 py-12">
        <DBDesign />
      </div>
      <div className="bg-secondary bg-opacity-10 py-12">
        <Programmer />
      </div>
      <div className="bg-gray-50 py-12 ">
        <Tester />
      </div>
    </>
  );
};

export default AboutPage;
