"use client"

import ListOfTitles from "../components/ListOfTitles";


export default function WelcomePage() {
  return (
    <div className="flex=col relative flex h-full w-full items-center justify-center bg-bgp font-sans text-white">
      <ListOfTitles />
    </div>
  );
}
