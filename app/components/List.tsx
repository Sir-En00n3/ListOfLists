'use client';

import ListItem from "./ListItem";
import ListTitle from "./ListTitle";
import HomeBtn from "./HomeBtn";
import UiBtn from "./UiBtn";

export default function List() {
  return (
    <>
      {/* ---The List Card--- */}
      <div className="relative flex rounded-2xl h-[90%] w-full max-w-md flex-col items-center justify-start border-4 border-solid border-accent bg-mybg text-text sm:w-3/4 md:w-1/2">
        {/* ---header-style menu--- */}
        <div className="relative flex h-[4.5rem] rounded-t-xl w-full flex-row items-center justify-center border-4 bg-accent">
          <HomeBtn />
          <h1 className="relative text-center text-3xl font-mono font-extrabold mx-auto text-bgp">ListsOfLists</h1>
          <UiBtn />
        </div>

        {/*  ---ListTitle.tsx--- */}
        <div className="relative flex h-8 w-full flex-row items-center justify-center border-2 transition-all duration-500 ease-in-out md:h-15 lg:h-15">
          <ListTitle />
        </div>

        {/*  --ListItem.tsx--- */}
        <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto border-4 border-solid border-accent">
          <ListItem />
        </div>
      </div>
    </>
  );
}
