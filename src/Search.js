import React from "react";

import ClearAll from "./ClearAll";
import Hits from "./Hits";
import Menu from "./Menu";
import Panel from "./Panel";
import CheckboxList from "./CheckboxList";
import SearchBox from "./SearchBox";
import SearchPoweredBy from "./SearchPoweredBy";
import SortBy from "./SortBy";
import Tabs from "./Tabs";
import Topbar from "./Topbar";
import orderBy from "lodash.orderby";
import Advertisement from "./Advertisement";

import logo from "./images/logo.svg";
import logoSmall from "./images/logo-small.svg";

const reactPartsCollections = ["React", "React Native", "React VR"];

const Search = ({ isHome, currentCollection, currentQuery, collectionsOrder, sortOptions }) => (
  <div>
    <Topbar />

    <div
      className={
        isHome ? "flex justify-center items-center" : "bg-grey-lighter overflow-hidden"
      }
      style={isHome ? { minHeight: "calc(100vh - 100px)" } : {}}>
      <div className={isHome ? "text-center m-8 max-w-md w-full select-none" : "relative m-4 mb-1 select-none"}>
        {isHome ? (
          <img
            src={logo}
            width="128"
            height="128"
            className="m-8"
            alt="React.parts logo"
            draggable="false"
          />
        ) : (
          <a href="/">
            <img
              src={logoSmall}
              width="50"
              height="50"
              className="absolute pin-l"
              draggable="false"
              alt="React.parts logo"
            />
          </a>
        )}

        <div className={isHome ? "placeholder-center" : "ml-16 max-w-md"}>
          <SearchBox />
          <div className={isHome ? "mt-4" : "mt-4 ml-1"}>
            <Tabs
              attributeName="collections"
              defaultRefinement="React"
              transformItems={items =>
                items.sort(
                  (a, b) => collectionsOrder.indexOf(a.label) > collectionsOrder.indexOf(b.label)
                ).filter((item) => reactPartsCollections.includes(item.label))
              }
            />
            {!isHome && <ClearAll transformItems={items => items.filter((item) => item.attributeName !== "collections")} />}
          </div>
        </div>
      </div>
    </div>

    {!isHome && (
      <div className="flex p-4 pt-3">
        <div className="ml-16 max-w-md w-full">
          <SortBy
            items={sortOptions}
            defaultRefinement={
              // Sort by relevance by default if it's a search, or updated at if browsing
              // Make sure the default matches the indexName prop on the InstantSearch component
              sortOptions[currentQuery ? 0 : 1].value
            }
          />
          <Hits />
          <SearchPoweredBy />
        </div>

        <div className="ml-8 pl-4 pt-2 flex-none">
          {!isHome && <Advertisement />}

          {currentCollection === "React" && (
            <div className="mb-8">
              <Panel title="Styling">
                <CheckboxList
                  attributeName="styling"
                  operator="and"
                  transformItems={items => orderBy(items, ["label", "count"], ["asc", "desc"])}
                />
              </Panel>
            </div>
          )}

          {currentCollection === "React Native" && (
            <div className="mb-8">
              <Panel title="Compatibility">
                <CheckboxList
                  attributeName="compatibility"
                  transformItems={items =>
                    orderBy(items, [item => item.label.toLowerCase()], ["asc"])
                  }
                />
              </Panel>
            </div>
          )}

          <div className="mb-8">
            <Panel title="Categories">
              <Menu
                attributeName="categories"
                showMore
                limitMax={25}
                transformItems={items => orderBy(items, ["label", "count"], ["asc", "desc"])}
              />
            </Panel>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Search;
