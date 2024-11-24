"use client";

import FloatingNavbar from "../(home)/components/FloatingNabvar";
import Form from "./form/ui/page";

export default function Home() {
  return (
    <div className="w-full h-auto ">
      <FloatingNavbar />
      <div className="w-screen h-auto overflow-y-auto overflow-hidden flex items-center justify-center px-5 py-5">
        <Form />
      </div>
    </div>
  );
}
