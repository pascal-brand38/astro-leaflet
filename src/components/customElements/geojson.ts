// Copyright (c) Pascal Brand
// MIT License

import L from 'leaflet';
import type { AstroLeafletGeoJsonType } from '../../index';
import type { GeoJSON } from 'leaflet';
import { getMapFromElement } from '../../index';

export class CustomElementGeoJson extends HTMLElement {
  leafletElement: GeoJSON | undefined;

  constructor() {
    super();
    const props: AstroLeafletGeoJsonType = JSON.parse(this.dataset.props!);
    const map = getMapFromElement(this);
    if (map) {
      this.leafletElement = L.geoJSON(props.geojson, props.options).addTo(map!);
    }
  }
}
