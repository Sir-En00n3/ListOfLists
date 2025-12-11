import Link from "next/link";

/**
 * @description A button component that links to the home page.
 * @returns A button that links to the home page.
 */
export default function HomeBtn() {
  return (
    // Link to the home page
    <Link href={"./"}>
      {/* The button that triggers the link */}
      <button className="mybtn" type="button">
        HOME
      </button>
    </Link>
  );
}
