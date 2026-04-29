// Copyright (c) Pascal Brand
// MIT License
//
// export leaflet API
// to be used with
//   import L from "astro-leaflet/leaflet";
//   import types { LatLngTuple } from "astro-leaflet/leaflet";

export type * from 'leaflet';

// Exporting the default Leaflet export, so that it can be used in the script part of the component
import L from 'leaflet';
export default L;
