// Copyright (c) Pascal Brand
// MIT License

import { marker as Lmarker, icon as Licon, divIcon as LdivIcon } from "leaflet/dist/leaflet-src.esm"
import { getMapFromElement } from '../../index'
import type { AstroLeafletCreateIconType, AstroLeafletMarkerType } from '../../index'
import type { Marker, Icon, DivIcon } from 'leaflet'

// custom icons, by their name
const _astroLeafletIcons: { [name: string]: Icon | DivIcon } = {}

// fix leaflet bug: default icon not displayed in production
// https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env/76454369#76454369
const _astroLeafletMarkerDefaultIcon = Licon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [2, -40],
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.0/dist/images/marker-shadow.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.0/dist/images/marker-shadow.png',
})

// ***                               MANDATORY                                          ***
// *** CustomElementCreateLeafletIcon must be declared before CustomElementMarker       ***
// *** this ensures icons are created before the markers, and so can be displayed       ***
export class CustomElementCreateLeafletIcon extends HTMLElement {
  constructor() {
    super()
    const props: AstroLeafletCreateIconType = JSON.parse(this.dataset.props!)
    _astroLeafletIcons[props.name] = LdivIcon(props.options);
  }
}

export class CustomElementMarker extends HTMLElement {
  leafletElement: Marker | undefined

  constructor() {
    super()
    const props: AstroLeafletMarkerType = JSON.parse(this.dataset.props!)

    // add the icon marker, if not the default one
    if (!props.options) {
      props.options = {}
    }
    props.options.icon = _astroLeafletMarkerDefaultIcon
    if (props.astroIconName) {
      if (_astroLeafletIcons[props.astroIconName]) {
        props.options.icon = _astroLeafletIcons[props.astroIconName]
      }
    }
    this.leafletElement = Lmarker(props.latlng, props.options)

    const mapOrLayerGroup = getMapFromElement(this)
    if (mapOrLayerGroup) {
      this.leafletElement!.addTo(mapOrLayerGroup);
    }
  }
}
