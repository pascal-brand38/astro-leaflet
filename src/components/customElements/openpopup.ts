// Copyright (c) Pascal Brand
// MIT License

import { getMapFromElement } from '../../index';
import type { CustomElementLeafletGeneric } from './generic';

export class CustomElementOpenPopup extends HTMLElement {
  constructor() {
    super();
    // take the parent. cast to a CustomElementLeafletGeneric, even if not, just to check access to leafletElement
    const parent = this.parentElement as CustomElementLeafletGeneric | undefined;
    if (parent && parent.leafletElement) {
      parent.leafletElement.openPopup();
    } else {
      console.error('astro-leaflet <OpenPopup/>: no openPopup in parent');
    }
  }
}
