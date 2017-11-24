import React from "react";
import { connectCurrentRefinements } from "react-instantsearch/connectors";

const ClearAll = connectCurrentRefinements(({ items, refine }) => (
  <div>
    {items.length > 0 && (
      <button
        onClick={() => refine(items)}
        className="bg-white hover:bg-grey-lighter border text-sm py-2 px-3 rounded my-2"
      >
        Clear all
      </button>
    )}
  </div>
));

export default ClearAll;
