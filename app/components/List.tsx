"use client";

import { JSX, useState } from "react";
import ListItem from "./ListItem";
import ListTitle from "./ListTitle";
import HomeBtn from "./HomeBtn";

/**
 * A primary component that assembles a complete, interactive list.
 * It integrates `ListTitle` for the list's title and `ListItem` for managing the list's items.
 * This component maintains the state for the title and the list items, passing state and state-updating functions down to its children.
 * It also provides functionality to save the entire list as a downloadable text file.
 *
 * @returns {JSX.Element} The fully assembled list component with a header, editable title, and editable list items.
 */
export default function List(): JSX.Element {
  // --- STATE MANAGEMENT ---
  // State for the list items, initialized as an empty array of strings.
  const [itemText, setItemText] = useState<string[]>([]);
  // State for the list title, initialized with a default value.
  const [title, setTitle] = useState("List Title");

  /**
   * --- FILE SAVING FUNCTIONALITY ---
   * Saves the current list (title and items) to a text file and triggers a download in the browser.
   *
   * @param {string} title - The title of the list.
   * @param {string[]} itemText - An array of strings representing the items in the list.
   */
  const saveListToTxt = (title: string, itemText: string[]) => {
    // Combine the title and items into a single string, with the title on the first line,
    // followed by a blank line, and then each item on a new line.
    const content = `${title}\n\n${itemText.join("\n")}`;

    // Create a Blob, which is a file-like object of immutable, raw data.
    // This Blob will contain the text content of our list.
    const blob = new Blob([content], { type: "text/plain" });

    // Create a URL that points to the Blob object in memory.
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor (`<a>`) element to programmatically trigger the download.
    const a = document.createElement("a");

    // Set the anchor's `href` to the Blob URL and the `download` attribute to the desired filename.
    a.href = url;
    a.download = `${title}.txt`;

    // Append the anchor to the document, simulate a click to start the download, and then remove it.
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the anchor element and revoking the Blob URL to free up browser memory.
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- COMPONENT RENDERING ---
  return (
    <>
      {/* --- The Main List Card Container --- */}
      {/* This `div` serves as the main wrapper for the entire list component, styling it as a card. */}
      <div className="relative flex h-[90%] w-full max-w-md flex-col items-center justify-start rounded-2xl border-4 border-solid border-accent bg-mybg text-text sm:w-3/4 md:w-1/2">
        
        {/* --- Header Section --- */}
        {/* This section contains the navigation (HomeBtn), the application title, and the save functionality. */}
        <div className="relative flex h-18 w-full flex-row items-center justify-center rounded-t-xl border-4 bg-accent">
          {/* The HomeBtn component provides a way to navigate back to the main page. */}
          <HomeBtn />
          {/* The main title of the application. */}
          <h1 className="relative mx-auto text-center font-mono text-3xl font-extrabold text-bgp">
            ListsOfLists
          </h1>
          {/* The "Save List" button triggers the `saveListToTxt` function when clicked. */}
          <button
            className="mybtn"
            onClick={() => saveListToTxt(title, itemText)}
          >
            Save List
          </button>
        </div>

        {/* --- List Title Section --- */}
        {/* This `div` wraps the `ListTitle` component, which is responsible for displaying and editing the list's title. */}
        {/* It passes the current `title` state and the `setTitle` function down to the `ListTitle` component as props. */}
        <div className="relative flex h-8 w-full flex-row items-center justify-center border-2 transition-all duration-500 ease-in-out md:h-15 lg:h-15">
          <ListTitle title={title} onTitleChangeAction={setTitle} />
        </div>

        {/* --- List Items Section --- */}
        {/* This `div` wraps the `ListItem` component, which handles the display and management of the individual list items. */}
        {/* It passes the `itemText` state and the `setItemText` function to the `ListItem` component. */}
        {/* The `overflow-y-auto` class enables vertical scrolling if the list items exceed the container's height. */}
        <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto border-4 border-solid border-accent">
          <ListItem itemText={itemText} onItemTextChangeAction={setItemText} />
        </div>
      </div>
    </>
  );
}
