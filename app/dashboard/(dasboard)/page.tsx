"use client"
import React, { useLayoutEffect, useState } from "react";
import { getAllHouseProfile } from "../../../lib/api/apitGET";
import CensusCard from "../../../components/ui_census/census_card";
import CensusGraph from "@/components/ui_census/census_graph";

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
    <div className="h-auto flex flex-col w-full gap-10">

      <div className="flex gap-4 w-full h-full overflow-y-auto">
        <CensusGraph />
      </div>

      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <label>Number of Census Data: {censusData.length}</label>
          <button onClick={() => handleFetchHouseProfile()}>Refresh</button>
        </div>

        <div className="rounded-md border-zinc-200 dark:border-zinc-800 w-full overflow-y-auto border dark:bg-graident-dark">
          <div className="w-full bg-white dark:bg-inherit rounded-md space-y-5 py-5">
            <div className="grid grid-cols-5  py-2 border-b pb-5 dark:border-zinc-600">
              {headers.map((header, index) => (
                <h1 key={index} className="font-medium text-sm dark:text-gray-500 text-center">
                  {header}
                </h1>
              ))}
            </div>
            <>
              {censusData.length === 0 ? <div className="w-full flex justify-center font-semibold tracking-widest">NO DATA</div> : <>
                {censusData?.map((item: any, index: number) => (
                  <CensusCard key={index} item={item} />
                ))}
              </>}
            </>
          </div>
        </div>
      </div>

    </div>
  );
}
