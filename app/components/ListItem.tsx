"use client";

import React, { useState, useEffect, useRef, JSX } from "react";

/**
 * @typedef {object} ListItemProps
 * @property {string[]} itemText - The array of strings that represents the items in the list.
 * @property {(next: string[]) => void} onItemTextChangeAction - The function to call when the list of items is updated.
 */
type ListItemProps = {
  itemText: string[];
  onItemTextChangeAction: (next: string[]) => void;
};

/**
 * A React functional component for managing and displaying a list of items.
 * Allows adding, editing, and maintaining a list of text-based items with interactive controls for user input.
 *
 * @param {ListItemProps} { itemText, onItemTextChangeAction }
 * @return {JSX.Element} The rendered list item management component, including input fields for adding and editing items, and the displayed list of items.
 */
export default function ListItem({ itemText, onItemTextChangeAction }: ListItemProps): JSX.Element {
  
  // --- STATE MANAGEMENT ---
  // State to track if the user is currently adding a new item.
  const [isAddingItem, setIsAddingItem] = useState(false);
  // State for the value of the input field when adding a new item.
  const [itemInputValue, setItemInputValue] = useState("");
  // Ref to the input element for adding a new item, used to focus it programmatically.
  const itemInputRef = useRef<HTMLInputElement>(null);

  // State to track the index of the item being edited. Null if no item is being edited.
  const [editingItemIdx, setEditingItemIdx] = useState<number | null>(null);
  // State for the value of the input field when editing an existing item.
  const [editingItemValue, setEditingItemValue] = useState("");
  // Ref to the input element for editing an item, used for focusing.
  const editingItemRef = useRef<HTMLInputElement>(null);

  // --- EFFECTS ---
  // Effect to automatically focus the input field when the user starts adding a new item.
  useEffect(() => {
    if (isAddingItem && itemInputRef.current) {
      itemInputRef.current.focus();
    }
  }, [isAddingItem]);

  // Effect to automatically focus the input field when the user starts editing an existing item.
  useEffect(() => {
    if (editingItemIdx !== null && editingItemRef.current) {
      editingItemRef.current.focus();
    }
  }, [editingItemIdx]);


  // --- ADD NEW ITEM LOGIC ---
  // Triggered when the "List Item" placeholder is clicked.
  const handleItemPlaceholderClick = () => {
    setIsAddingItem(true); // Enter "add mode".
    setItemInputValue(""); // Clear any previous input value.
  };

  // Updates the state as the user types in the "add item" input field.
  const handleItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemInputValue(e.target.value);
  };

  // Handles key presses in the "add item" input.
  const handleItemInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If the user presses "Enter" and the input is not empty, add the new item.
    if (e.key === "Enter" && itemInputValue.trim()) {
      onItemTextChangeAction([...itemText, itemInputValue.trim()]);
      setItemInputValue(""); // Clear the input field for the next item.
      setIsAddingItem(true); // Remain in "add mode" to allow adding multiple items quickly.
    }
  };

  // Handles the "add item" input losing focus.
  const handleItemInputBlur = () => {
    // If there's text in the input, add it to the list.
    if (itemInputValue.trim()) {
      onItemTextChangeAction([...itemText, itemInputValue.trim()]);
    }
    setIsAddingItem(false); // Exit "add mode".
    setItemInputValue(""); // Clear the input field.
  };

  // --- EDIT EXISTING ITEM LOGIC ---
  // Triggered when an existing list item is clicked.
  const handleItemClick = (idx: number) => {
    setEditingItemIdx(idx); // Set the index of the item to be edited.
    setEditingItemValue(itemText[idx]); // Pre-fill the input with the current item's text.
  };

  // Updates the state as the user types in the "edit item" input field.
  const handleEditingItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingItemValue(e.target.value);
  };

  // Handles key presses in the "edit item" input.
  const handleEditingItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEditedItem(); // Save the changes when "Enter" is pressed.
    }
  };

  // Saves the changes when the "edit item" input loses focus.
  const handleEditingItemBlur = () => {
    saveEditedItem();
  };

  // Core logic to save the edited item.
  const saveEditedItem = () => {
    if (editingItemIdx !== null) {
      const updated = [...itemText]; // Create a copy of the items array.
      // Update the item at the specific index. If the edited value is empty, revert to the original value.
      updated[editingItemIdx] = editingItemValue.trim() || updated[editingItemIdx];
      onItemTextChangeAction(updated); // Propagate the changes up to the parent component.
      setEditingItemIdx(null); // Exit "edit mode".
      setEditingItemValue(""); // Clear the editing input value.
    }
  };

  // --- COMPONENT RENDERING ---
  return (
    <div className="relative flex h-10 w-full flex-col items-center justify-start pl-1.5">
      {/* --- Render Existing List Items --- */}
      {/* Map over the `itemText` array to display each list item. */}
      {itemText.map((item, idx) => (
        <div
          key={idx}
          className="list-item w-full border-b border-black text-left font-mono text-lg font-medium text-black md:text-2xl lg:text-3xl"
        >
          <span className="mr-2">{idx + 1}.</span>
          {/* --- Conditional Rendering for Editing --- */}
          {/* If the current item is being edited, show an input field. Otherwise, show the item text. */}
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
      
      {/* --- Conditional Rendering for Adding a New Item --- */}
      {/* If `isAddingItem` is true, show the input field for a new item. */}
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
        // Otherwise, show a placeholder span that, when clicked, enables "add mode".
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
