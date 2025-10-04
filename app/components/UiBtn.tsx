"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function UiBtn() {
  const path = usePathname();

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (path === "/ui") {
      alert('Experience your Artistic Value!')
    }
  };

  return (
    <div>
      <Link href={"/ui"}>
        <button className="mybtn" onClick={handleOnClick}>
          UI/UX
        </button>
      </Link>
    </div>

  );
}
