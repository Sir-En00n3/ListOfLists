"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ListItem() {
  const [itemText, setItemText] = useState<string[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [itemInputValue, setItemInputValue] = useState("");
  const itemInputRef = useRef<HTMLInputElement>(null);

  const [editingItemIdx, setEditingItemIdx] = useState<number | null>(null);
  const [editingItemValue, setEditingItemValue] = useState("");
  const editingItemRef = useRef<HTMLInputElement>(null);// set the limit you want

  useEffect(() => {
    if (isAddingItem && itemInputRef.current) itemInputRef.current.focus();
  }, [isAddingItem]);

  useEffect(() => {
    if (editingItemIdx !== null && editingItemRef.current)
      editingItemRef.current.focus();
  }, [editingItemIdx]);

  // List item logic
  const handleItemPlaceholderClick = () => {
    setIsAddingItem(true);
    setItemInputValue("");
  };

  const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemInputValue(e.target.value);
  };

  const handleItemInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && itemInputValue.trim()) {
      setItemText([...itemText, itemInputValue.trim()]);
      setItemInputValue("");
      setIsAddingItem(true); // Stay in add mode for the next item
    }
  };

  const handleItemInputBlur = () => {
    if (itemInputValue.trim()) {
      setItemText([...itemText, itemInputValue.trim()]);
    }
    setIsAddingItem(false);
    setItemInputValue("");
  };

  // Edit existing item logic
  const handleItemClick = (idx: number) => {
    setEditingItemIdx(idx);
    setEditingItemValue(itemText[idx]);
  };

  const handleEditingItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingItemValue(e.target.value);
  };

  const handleEditingItemKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      saveEditedItem();
    }
  };

  const handleEditingItemBlur = () => {
    saveEditedItem();
  };

  const saveEditedItem = () => {
    if (editingItemIdx !== null) {
      const updated = [...itemText];
      updated[editingItemIdx] =
        editingItemValue.trim() || updated[editingItemIdx];
      setItemText(updated);
      setEditingItemIdx(null);
      setEditingItemValue("");
      console.log(editingItemIdx);
    }
  };

  return (
    <div className="relative flex h-10 w-full flex-col items-center justify-start pl-1.5">
      {itemText.map((item, idx) => (
        <div
          key={idx}
          className="list-item w-full border-b border-black text-left font-mono text-lg font-medium text-black md:text-2xl lg:text-3xl"
        >
          <span className="mr-2">{idx + 1}.</span>
          {editingItemIdx === idx ? (
            <input
              ref={editingItemRef}
              type="text"
              value={editingItemValue}
              size={50}
              onChange={handleEditingItemChange}
              onKeyDown={handleEditingItemKeyDown}
              onBlur={handleEditingItemBlur}
              className="w-auto bg-transparent text-black outline-none"
              maxLength={50}
            />
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => handleItemClick(idx)}
              tabIndex={0}
              role="button"
              aria-label={`Edit item ${idx + 1}`}
            >
              {item}
            </span>
          )}
        </div>
      ))}
      {isAddingItem ? (
        <input
          ref={itemInputRef}
          type="text"
          value={itemInputValue}
          size={50}
          onChange={handleItemInputChange}
          onKeyDown={handleItemInputKeyDown}
          onBlur={handleItemInputBlur}
          placeholder="type item here"
          className="w-full bg-transparent text-black outline-none"
          maxLength={50}
        />
      ) : (
        <span
          className="h-full w-full cursor-pointer border-b-2 border-gray-500 font-mono text-gray-500"
          onClick={handleItemPlaceholderClick}
          tabIndex={0}
          role="button"
          aria-label="Add new list item"
        >
          List Item
        </span>
      )}
    </div>
  );
}
