import React from "react"
import "./../styles/searchBar.css"

export default function SearchBar(props: {
  onChange: (str: string) => void,
  className?: string,
  title?: string,
  placeholder?: string
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  }

  return (
    <form className={`search-bar-form ${props.className ?? ""}`}>
      <input type="text"
        onChange={handleChange}
        placeholder={props.placeholder}
        title={props.title}
      />
      <button type="reset">&times;</button>
    </form>
  )
}
