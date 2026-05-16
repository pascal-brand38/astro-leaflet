// Copyright (c) Pascal Brand
// MIT License

import { tooltip as Ltooltip } from 'leaflet';
import type { AstroLeafletTooltipType } from '../../index';
import type { Tooltip, } from 'leaflet';
import { getMapFromElement } from '../../index';
import type { CustomElementLeafletGeneric } from './generic';

export class CustomElementTooltip extends HTMLElement {
  leafletElement: Tooltip | undefined;

  constructor() {
    super();
    const props: AstroLeafletTooltipType = JSON.parse(this.dataset.props!);

    if (props.latlng) {
      // this tooltip is not bind to an element.
      const map = getMapFromElement(this);
      if (map) {
        this.leafletElement = Ltooltip(props.latlng, props.options)
          .setContent(props.content)
          .openOn(map);
      }
    } else {
      // no position, so bind it to the parent element
      const parent = this.parentElement as CustomElementLeafletGeneric | undefined;
      if (parent && parent.leafletElement && parent.leafletElement.bindTooltip) {
        this.leafletElement = parent.leafletElement.bindTooltip(props.content);
      }
    }

    if (props.open && this.leafletElement) {
      this.leafletElement.openTooltip();
    }
  }
}
