import React from "react";
import "./searchBar.css";

export default function SearchBar(props: {
  onChange: (str: string) => void;
  className?: string;
  title?: string;
  placeholder?: string;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.onChange(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.onChange(event.target[0].value);
  };

  return (
    <form className={`search-bar-form ${props.className ?? ""}`} onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} placeholder={props.placeholder} title={props.title ?? "button"} />
      <button type="reset">&times;</button>
    </form>
  );
}
