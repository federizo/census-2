"use client"
import React, { useLayoutEffect, useState } from "react";
import { getAllHouseProfile } from "../../../lib/api/apitGET";
import CensusCard from "./ui/census_card";
import CensusGraph from "@/components/ui_census/census_graph_population";
import CensusGraphPopulation from "@/components/ui_census/census_graph_population";
import CensusGraphMaleFemale from "@/components/ui_census/census_graph_male_female";

export default function Dashboard() {
  const headers = ["HOUSE NO.", "HOUSE CONTACT", "NO. OF MEMBERS", "CREATED BY"];

  const [censusData, setCensusData] = useState<any[]>([]);

  const handleFetchHouseProfile = async () => {
    try {
      const response: any = await getAllHouseProfile();

      const updatedResponse = response.map((profile: any) => ({
        ...profile,
        DoYouHave: profile.DoYouHave ?? [],
        HouseHoldUses: profile.HouseHoldUses ?? [],
        Location: profile.Location ?? [],
        Pet: profile.Pet ?? [],
        FamMember: profile.FamMember ?? [],
        Apartment: profile.Apartment ?? [],
      }));

      setCensusData(updatedResponse)
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    handleFetchHouseProfile();
  }, []);



  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="hidden lg:grid grid-cols-2 gap-4 w-full overflow-y-auto shrink-0">
        <CensusGraphMaleFemale year={2024} />
        <CensusGraphPopulation />
      </div>

      <div className="flex flex-col w-full overflow-y-auto mt-5">
        <div className="w-full flex justify-between px-2 mb-5">
          <label>Number of Census Data: {censusData.length}</label>
          <button onClick={() => handleFetchHouseProfile()}>Refresh</button>
        </div>

        <div className="rounded-t-md border-zinc-200 dark:border-zinc-800 w-full h-fit border dark:bg-graident-dark overflow-hidden ">
          <div className="w-full h-full bg-white dark:bg-inherit rounded-md space-y-5 py-5">

            <div className="grid grid-cols-5 py-2 border-b pb-5 dark:border-zinc-600">
              {headers.map((header, index) => (
                <h1 key={index} className="font-medium text-sm dark:text-gray-500 text-center">
                  {header}
                </h1>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-b-md border-zinc-200 dark:border-zinc-800 w-full h-full border dark:bg-graident-dark overflow-y-auto ">
          <div className="w-full h-full bg-white dark:bg-inherit rounded-md space-y-5 py-10">
            {censusData.length === 0 ? <div className="w-full flex justify-center font-semibold tracking-widest">NO DATA</div> : <>
              {censusData?.map((item: any, index: number) => (
                <CensusCard key={index} item={item} />
              ))}
            </>}
          </div>
        </div>
      </div>

    </div>
  );
}
