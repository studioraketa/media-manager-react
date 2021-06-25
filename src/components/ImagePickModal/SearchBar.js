import React, { useState } from "react";
import { Modal, P } from "@raketa-cms/raketa-mir";

export default function SearchBar(props) {
  const { setQuerryParamsImages, querryParamsImages } = props;
  const [search, setSearch] = useState("");

  const handleChange = (ev) => {
    ev.preventDefault();
    setSearch(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const previousValue = [...querryParamsImages];
    previousValue.push({ name: search });
    setQuerryParamsImages(previousValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
      </form>
    </div>
  );
}
