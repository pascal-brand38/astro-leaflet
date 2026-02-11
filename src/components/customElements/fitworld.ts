// Copyright (c) Pascal Brand
// MIT License

import { getMapFromElement } from '../../index';

export class CustomElementFitWorld extends HTMLElement {
  constructor() {
    super();
    const map = getMapFromElement(this);
    if (map) {
      map.fitWorld();
    } else {
      console.error('astro-leaflet <FitWorld/>: no map in parent');
    }
  }
}
