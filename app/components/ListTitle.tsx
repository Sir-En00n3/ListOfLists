"use client";

import React, { useState, useRef, useEffect } from "react";

export default function ListTitle() {
  const [titleText, setTitleText] = useState("The List Title");
  const [userEditedTitle, setUserEditedTitle] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) inputRef.current.focus();
  }, [isEditingTitle]);

  // Title logic
  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setInputValue(userEditedTitle ? titleText : "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim()) {
        setTitleText(inputValue);
        setUserEditedTitle(true);
      } else {
        setTitleText("List Title");
        setUserEditedTitle(false);
      }
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    if (inputValue.trim()) {
      setTitleText(inputValue);
      setUserEditedTitle(true);
    } else {
      setTitleText("List Title");
      setUserEditedTitle(false);
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="lg:6xl relative flex h-full w-full flex-row items-center justify-center text-center font-mono font-bold transition-all duration-500 ease-in-out sm:text-2xl md:text-4xl">
      {isEditingTitle ? (
        <input
          ref={inputRef}
          type="text"
          size={50}
          value={inputValue}
          onChange={handleTitleChange}
          onKeyDown={handleTitleKeyDown}
          onBlur={handleTitleBlur}
          placeholder="type title here"
          className="w-full bg-transparent text-center text-black outline-none"
        />
      ) : (
        <span
          className="w-full cursor-pointer"
          onClick={handleTitleClick}
          tabIndex={0}
          role="button"
          aria-label="Edit list title"
        >
          {titleText}
        </span>
      )}
    </div>
  );
}
