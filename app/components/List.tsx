"use client";

import { JSX, useState } from "react";
import ListItem from "./ListItem";
import ListTitle from "./ListTitle";
import HomeBtn from "./HomeBtn";

interface ListData {
  id: string;
  title: string;
  items: string[];
}

export default function List(): JSX.Element {
  // --- STATE MANAGEMENT ---
  const [itemText, setItemText] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("Default Title");

  // --- PERSISTENCE LOGIC ---
  const [listId] = useState<string>(() => `list-${Date.now().toString()}`);

  const saveToLocalStorage = (): void => {
    const listData: ListData = {
      id: listId,
      title: title,
      items: itemText,
    };
    
    // Save a newly created list.
    localStorage.setItem(listId, JSON.stringify(listData));
    alert(`List saved with ID: ${listId}`);
  };

  return (
    <>
      {/* Main container: Provides the card-style layout and color theme. */}
      <div className="relative flex h-[90%] w-full max-w-md flex-col items-center justify-start rounded-2xl border-4 border-solid border-accent bg-mybg text-text sm:w-3/4 md:w-1/2">
        {/* Header Section: Contains navigation, branding, and persistence controls. */}
        <div className="relative flex h-18 w-full flex-row items-center justify-center rounded-t-xl border-4 bg-accent">
          <HomeBtn />
          <h1 className="relative mx-auto text-center font-mono text-3xl font-extrabold text-bgp">
            ListsOfLists
          </h1>
          <button
            className="mybtn"
            type="button"
            onClick={() => saveToLocalStorage()}
          >
            Save
          </button>
        </div>

        {/* Title Section: Provides the interface for editing the list heading. */}
        <div className="relative flex h-8 w-full flex-row items-center justify-center border-2 transition-all duration-500 ease-in-out md:h-15 lg:h-15">
          <ListTitle title={title} onTitleChangeAction={setTitle} />
        </div>

        {/* Items Section: Scrollable container for dynamic list item management. */}
        <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto border-4 border-solid border-accent">
          <ListItem itemText={itemText} onItemTextChangeAction={setItemText} />
        </div>
      </div>
    </>
  );
}