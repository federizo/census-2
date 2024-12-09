"use client"

import Hero from "@/app/(home)/components/Hero";
import FloatingNavbar from "@/app/(home)/components/FloatingNabvar";
import Footer from "@/app/(home)/components/Footer";
import CardsMappingV3 from "@/app/(home)/components/CardsV3/CardsMappingV3";
import Map from "@/app/(home)/components/map";
import TableDetails from "@/app/(home)/components/table-details";
import BottomDetails from "@/app/(home)/components/bottom-details";
import { removeCookies } from "@/lib/actions";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!currentPath.startsWith('/dashboard')) {
      removeCookies();
    }
  }, []);


  return (
    <div className="relative w-screen h-screen flex flex-col overflow-y-hidden ">
      <header className="flex overflow-hidden flex-col w-full">
        <FloatingNavbar />
      </header>

      <div className="z-0 w-full h-full overflow-y-auto items-center grid-col overflow-hidden ">
        <Hero />
        <div className="px-[5rem] flex flex-col">
          <CardsMappingV3 />
          <Map />
          <TableDetails />
          <BottomDetails />
        </div>
        <Footer />
      </div>
    </div>
  );
}
