'use client';

import React, { useState, useEffect, useRef } from "react";


export default function ListItem() {
    const [itemText, setItemText] = useState<string[]>([]);
    const [isAddingItem, setIsAddingItem] = useState(false);
    const [itemInputValue, setItemInputValue] = useState("");
    const itemInputRef = useRef<HTMLInputElement>(null);

    const [editingItemIdx, setEditingItemIdx] = useState<number | null>(null);
    const [editingItemValue, setEditingItemValue] = useState("");
    const editingItemRef = useRef<HTMLInputElement>(null);

    const MAX_ITEMS = 50; // set the limit you want
    
    useEffect(() => {
        if (isAddingItem && itemInputRef.current) itemInputRef.current.focus();
      }, [isAddingItem]);
    
      useEffect(() => {
        if (editingItemIdx !== null && editingItemRef.current)
          editingItemRef.current.focus();
      }, [editingItemIdx]);
    
    
      // List items logic
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
          setIsAddingItem(true); // Stay in add mode for next item
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
          console.log(editingItemIdx)
        }
      };
    
    return (

        <div className="relative w-full h-10 pl-1.5 flex flex-col items-center justify-start">
              {itemText.map((item, idx) => (
                <div
                  key={idx}
                  className="list-item w-full text-left font-mono font-medium text-lg md:text-2xl lg:text-3xl text-black border-b border-black"
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
                      className="bg-transparent text-black outline-none w-auto"
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
                  className="w-full h-full cursor-pointer text-gray-500 font-mono border-b-2 border-gray-500"
                  onClick={handleItemPlaceholderClick}
                  tabIndex={0}
                  role="button"
                  aria-label="Add new list item"
                >
                  List Item
                </span>
              )}
            </div>

    )
}