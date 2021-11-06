import React, { memo } from "react";
import { langCodes } from "./constants";

import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
const CountryLanguage = require("country-language");

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }) => {
  function getLanguage(key) {
    let lang;
    CountryLanguage.getCountryLanguages(key, function (err, languages) {
      if (err) {
        console.log(err);
      } else {
        languages.forEach(function (languageCodes) {
          console.log(languageCodes);
          lang = languageCodes?.iso639_1;
        });
      }
    });
    return lang;
  }
  const randomArray = ["#80196D", "#6BAF92", "#FED931"];
  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      console.log(
                        getLanguage(geo?.properties?.ISO_A2),
                        langCodes[getLanguage(geo?.properties?.ISO_A2)]
                      );
                      setTooltipContent(
                        `${NAME} — ${
                          langCodes[getLanguage(geo?.properties?.ISO_A2)]?.name
                        }`
                      );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: `${
                          randomArray[
                            Math.floor(Math.random() * randomArray.length)
                          ]
                        }`,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
