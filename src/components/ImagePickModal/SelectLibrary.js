import React, { useState } from "react";
import * as mir from "@raketa-cms/raketa-mir";

export default function SelectLibrary(props) {
  const { selectedLibrary, setSelectedLibrary, fetchedLibraries } = props;

  const [showDropDown, setShowDropDown] = useState(false);

  const handleMenu = (ev) => {
    ev.preventDefault();
    setShowDropDown((prev) => !prev);
  };

  const handleLibrarySelect = (libraryObject) => {
    console.log(libraryObject);
    setSelectedLibrary(libraryObject);
    setShowDropDown(false);
  };

  const librariesToDisplay = fetchedLibraries.data ? (
    fetchedLibraries.data.map((el) => (
      <button key={el.uid} onClick={() => handleLibrarySelect(el)}>
        {el.name}
      </button>
    ))
  ) : (
    <mir.P>No libraires</mir.P>
  );

  return (
    <div>
      <button onClick={handleMenu}>
        {selectedLibrary && selectedLibrary.name
          ? selectedLibrary.name
          : "choose library"}
      </button>
      {showDropDown ? <div>{librariesToDisplay}</div> : null}
    </div>
  );
}
