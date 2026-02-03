"use client";

import { JSX, useState } from "react";
import ListItem from "./ListItem";
import ListTitle from "./ListTitle";
import HomeBtn from "./HomeBtn";


// Lift title when it is saved.
type ListTitleProps = {
  title: string;
};

/**
 * The core orchestration component for the ListOfLists application.
 * * This component functions as the primary state provider and layout container 
 * for an individual list. It manages the synchronization between the list 
 * title and the collection of list items, facilitating data flow via props 
 * to specialized child components.
 * * @component
 * @requires HomeBtn - For application navigation.
 * @requires ListTitle - For header string manipulation.
 * @requires ListItem - For managing the string array of list entries.
 * * @returns {JSX.Element} A structured card UI containing application branding, 
 * persistent storage triggers, and editable list management.
 */
export default function List(): JSX.Element {

  // --- STATE MANAGEMENT ---
  /** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} State for list item strings. */
  const [itemText, setItemText] = useState<string[]>([]);

  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} State for the list title. */
  const [title, setTitle] = useState<string>("List Title");

  /**
   * Persists the current list state to the browser's local storage.
   * * @param {string} key - The identifier used as the storage key (currently maps to title).
   * @param {string[]} value - The array of list item strings to be stringified.
   * @returns {void}
   */
  const saveToLocalStorage = (key: string, value: string[]) => {
    // Prevent saving empty lists
    if (value.length === 0) { 
      alert("Cannot save empty list!");
      return;
    } else {
    localStorage.setItem(key, JSON.stringify(value));
    alert(`List "${key}" saved!`);
    setItemText([]); // Clear list after saving
    setTitle("List Title"); // Reset title after saving
    };
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
          <button className="mybtn" type="button" onClick={() => saveToLocalStorage(title, itemText)}>
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