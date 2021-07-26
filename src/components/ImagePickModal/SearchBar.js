import React, { useState } from "react";
import { Input } from "@raketa-cms/raketa-mir";

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

    const isParamExisting = previousValue.find((el) => el.name);

    if (isParamExisting) {
      isParamExisting.name = search;
    } else {
      previousValue.push({ name: search });
    }

    setQuerryParamsImages(previousValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="search..."
        />
      </form>
    </div>
  );
}
