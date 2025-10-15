import React from "react";
import SalesCard from "../Components/salesCard";
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
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between">
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
