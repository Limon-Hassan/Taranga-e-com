import React from "react";
import SalesCard from "../Components/SalesCard";
import Totalincome from "../Components/Totalincome";
import Totalpaid from "../Components/Totalpaid";
import Totalvisitors from "../Components/Totalvisitors";
import Oderchart from "../Components/Oderchart";
import Earningchart from "../Components/Earningchart";
import Topproduct from "../Components/Topproduct";
import Topbestsaler from "../Components/Topbestsaler";
import Productoverviews from "../Components/Productoverviews";
const Home = () => {
  return (
    <>
      <section>
        <div className="sm:mx-0 sm:max-w-0 sm:px-5 desktop:mx-auto desktop:max-w-[1400px] desktop:px-0">
          <div className="sm:flex-col sm:gap-4 desktop:flex-row desktop:gap-0 flex  desktop:items-center sm:justify-normal desktop:justify-between">
            <SalesCard></SalesCard>
            <Totalincome></Totalincome>
            <Totalpaid></Totalpaid>
            <Totalvisitors></Totalvisitors>
          </div>
          <Oderchart></Oderchart>
          <Earningchart></Earningchart>
          <Topproduct></Topproduct>
          <Topbestsaler></Topbestsaler>
          <Productoverviews></Productoverviews>
        </div>
      </section>
    </>
  );
};

export default Home;
