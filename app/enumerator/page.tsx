"use client";

import FloatingNavbar from "../(home)/components/FloatingNabvar";
import Form from "./form/ui/page";

export default function Home() {
  return (
    <div className="w-screen h-screen  flex flex-col">
      <FloatingNavbar />
      <div className="w-full h-full overflow-y-auto flex flex-col items-center px-3 py-3 lg:py-8">
        <Form />
      </div>
    </div>
  );
}
