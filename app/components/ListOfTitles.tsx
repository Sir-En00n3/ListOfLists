"use client";

import React, { JSX, useState, useEffect } from "react";
import HomeBtn from "./HomeBtn";
import NewListBtn from "./NewListBtn";

/**
 * A component that displays a list of titles that are saved in local storage.
 * The included HomeBtn component navigates back to the Home page.
 * The NewListBtn component navigates to the UIPage for creating a new list.
 * 
 * @component
 * @requires HomeBtn - For application navigation.
 * @requires NewListBtn - For creating a new list.
 * @returns {JSX.Element} A structured UI containing a home button and a list of titles.
 */
export default function ListOfTitles(): JSX.Element {
    const [titles, setTitles] = useState<string[]>([]);

    useEffect(() => {
        const storedTitles: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                storedTitles.push(key);
            } else {
                alert("Something went wrong. Please try again.");
            };
        }
        setTitles(storedTitles);
    }, []);

    return (

        /** Main Container: Centers content and applies styling for the list display area. */
        <div className="relative flex h-[90%] w-full max-w-md flex-col items-center justify-start rounded-2xl border-4 border-solid border-accent bg-mybg text-text sm:w-3/4 md:w-1/2">
        
            {/* Header Section: Contains navigation, branding. */}
            <div className="relative flex h-18 w-full flex-row items-center justify-center rounded-t-xl border-4 bg-accent">
                <HomeBtn />
                <h1 className="relative mx-auto text-center font-bold font-merienda text-3xl text-bgp">
                    ListsOfList
                </h1>
                <NewListBtn />
            </div>
            {/* Titles List Section: Renders the list of titles. */}
            <div className="relative flex h-full w-full flex-col items-center justify-start overflow-y-auto p-4">
                <span className="mb-4 text-lg font-semibold underline">Saved Lists</span>
                <ul className="w-full space-y-2">
                    {titles.map((title) => (
                        <li key={title} className="w-full border-b border-gray-300 pb-2 text-left font-mono text-base">
                            {title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}