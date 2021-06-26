import React, { useState } from "react";
import * as mir from "@raketa-cms/raketa-mir";

export default function LibrariesDropDown(props) {
  const {
    selectedLibrary,
    setSelectedLibrary,
    fetchedLibraries,
    setQuerryParamsImages,
    querryParamsImages,
  } = props;

  const [showDropDown, setShowDropDown] = useState(false);

  const handleMenu = (ev) => {
    ev.preventDefault();
    setShowDropDown((prev) => !prev);
  };

  const handleLibrarySelect = (libraryObject) => {
    setSelectedLibrary(libraryObject);
    const previousValue = [...querryParamsImages];

    // bug to fix - must filter previousValue to see if data for this param has already been recorded.

    previousValue.push({ library_uid: libraryObject.uid });
    setQuerryParamsImages(previousValue);
    setShowDropDown(false);
  };

  const librariesToDisplay = fetchedLibraries ? (
    fetchedLibraries.map((el) => (
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
          : "select library"}
      </button>
      {showDropDown ? <div>{librariesToDisplay}</div> : null}
    </div>
  );
}
