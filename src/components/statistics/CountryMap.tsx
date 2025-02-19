import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 6,
        } as any,
      }}
      markersSelectable={true}
      markers={[
        {
          latLng: [26.2833, 50.2],
          name: "Headquarters - Al Jeser, Khobar, Eastern Region SA",
          style: { fill: "#28A745", borderWidth: 1, borderColor: "white" },
        },
        { latLng: [24.7136, 46.6753], name: "Saudi Arabia" },
        { latLng: [31.9522, 35.2332], name: "Palestine" },
        { latLng: [25.276987, 55.296249], name: "United Arab Emirates" },

        { latLng: [30.0444, 31.2357], name: "Egypt" },
        { latLng: [33.8869, 9.5375], name: "Tunisia" },
        { latLng: [36.8065, 10.1815], name: "Algeria" },
      ]}
      zoomOnScroll={true}
      zoomMax={10}
      zoomMin={3}
      zoomAnimate={true}
      zoomStep={2}
      focusOn={{
        x: 0.54,
        y: 0.45,
        scale: 2,
        animate: true,
      }}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#E6B9FE",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
