import "./SearchBar.css";
import React, { useState, useEffect } from "react";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

const SearchBar = ({ value = "", onChange }: Props) => {
  const [active, setActive] = useState(false);
  const input = React.useRef<HTMLInputElement>(null);

  const [localValue, setLocalValue] = useState<string>(value ?? "");

  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  useEffect(() => {
    if (active && input.current) input.current.focus();
  }, [active]);

  return (
    <div className="searchbar">
      <div className="relative w-full flex items-center">
        <input
          type="text"
          className={active ? "input active glass-card" : "input"}
          placeholder="Cerca Film"
          ref={input}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (onChange) onChange(localValue);
            }
          }}
        />

        {localValue.length > 0 && (
          <button
            aria-label="clear-search"
            className="absolute right-10 bg-transparent! border-none! focus:outline-none! focus-visible:outline-none!"
            onClick={() => {
              setLocalValue("");
              if (onChange) onChange("");
              if (input.current) input.current.focus();
            }}
          >
            ×
          </button>
        )}

        <button className="btn ml-2" onClick={() => setActive(!active)}>
          <svg
            className="w-5 h-5 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
