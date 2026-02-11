// Copyright (c) Pascal Brand
// MIT License

import { marker as Lmarker, divIcon as LdivIcon } from 'leaflet';
import { getMapOrLayoutGroupFromElement } from '../../index';
import { getAstroLeafletMarkerDefaultIcon } from '../../client';
import type { AstroLeafletCreateIconType, AstroLeafletMarkerType } from '../../index';
import type { Marker, Icon, DivIcon } from 'leaflet';

// custom icons, by their name
const _astroLeafletIcons: { [name: string]: Icon | DivIcon } = {};

// ***                               MANDATORY                                          ***
// *** CustomElementCreateLeafletIcon must be declared before CustomElementMarker       ***
// *** this ensures icons are created before the markers, and so can be displayed       ***
export class CustomElementCreateLeafletIcon extends HTMLElement {
  constructor() {
    super();
    const props: AstroLeafletCreateIconType = JSON.parse(this.dataset.props!);
    _astroLeafletIcons[props.name] = LdivIcon(props.options);
  }
}

export class CustomElementMarker extends HTMLElement {
  leafletElement: Marker | undefined;

  constructor() {
    super();
    const props: AstroLeafletMarkerType = JSON.parse(this.dataset.props!);

    // add the icon marker, if not the default one
    if (!props.options) {
      props.options = {};
    }
    if (props.astroIconName && _astroLeafletIcons[props.astroIconName]) {
      props.options.icon = _astroLeafletIcons[props.astroIconName];
    } else {
      // fix leaflet bug: default icon not displayed in production
      // https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env/76454369#76454369
      props.options.icon = getAstroLeafletMarkerDefaultIcon();
    }
    this.leafletElement = Lmarker(props.latlng, props.options);

    const mapOrLayerGroup = getMapOrLayoutGroupFromElement(this);
    if (mapOrLayerGroup) {
      this.leafletElement!.addTo(mapOrLayerGroup);
    }
  }
}
