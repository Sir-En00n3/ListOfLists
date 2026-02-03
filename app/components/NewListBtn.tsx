"use client";

import Link from "next/link";

/**
 * @description A simple UI button component.
 * @returns A button that links to the /ui/ page.
 */
export default function NewLisrBtn() {
  return (
    <>
      {/* Link to the UI page */}
      <Link href="/ui/">
        {/* The button that triggers the link */}
        <button className="mybtn">New List</button>
      </Link>
    </>
  );
}
