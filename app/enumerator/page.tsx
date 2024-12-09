"use client";

import { removeCookies } from "@/lib/actions";
import FloatingNavbar from "../(home)/components/FloatingNabvar";
import Form from "./form/ui/page";
import { useEffect } from "react";
export default function Home() {

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (!currentPath.startsWith('/dashboard')) {
      removeCookies();
    }
  }, []);


  return (
    <div className="w-screen h-screen  flex flex-col">
      <FloatingNavbar />
      <div className="w-full h-full overflow-y-auto flex flex-col items-center px-3 py-3 lg:py-8">
        <Form />
      </div>
    </div>
  );
}
