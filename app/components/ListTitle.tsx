"use client";

import React, { useState, useRef, useEffect, JSX } from "react";

/**
 * @typedef {object} ListTitleProps
 * @property {string} title - The current title of the list.
 * @property {(next: string) => void} onTitleChangeAction - Callback function to be invoked when the title is changed.
 */
type ListTitleProps = {
  title: string;
  onTitleChangeAction: (next: string) => void;
};

/**
 * A React component that displays and allows for the editing of a list's title.
 *
 * When the title is clicked, it transforms into an input field, allowing the user to make changes.
 * The update is finalized when the user presses the 'Enter' key or when the input field loses focus.
 *
 * @param {ListTitleProps} { title, onTitleChangeAction } The props for the component.
 * @returns {JSX.Element} The rendered title component, which is either a static span or an input field.
 */
export default function ListTitle({
  title,
  onTitleChangeAction,
}: ListTitleProps): JSX.Element {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState("type title here");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) inputRef.current.focus();
  }, [isEditingTitle]);

  // Title logic
  const handleTitleClick = () => {
    setIsEditingTitle(true);
    setInputValue(title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onTitleChangeAction(inputValue.trim() || "List Title");
      setIsEditingTitle(false);
    }
  };

  const handleTitleBlur = () => {
    onTitleChangeAction(inputValue.trim() || "List Title");
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
          {title}
        </span>
      )}
    </div>
  );
}
