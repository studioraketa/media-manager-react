import React, { useState } from "react";
import { Modal, P } from "@raketa-cms/raketa-mir";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (ev) => {
    ev.preventDefault();
    setSearch(ev.target.value);
  };

  return (
    <div>
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
}
