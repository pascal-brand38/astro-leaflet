// Copyright (c) Pascal Brand
// MIT License
//
// Function accessible from client-only
// this is because leaflet must be run on client as
// it manipulates 'window' browser variable which is not
// available on server side

import L from 'leaflet'
import type { Icon } from 'leaflet'

// fix leaflet bug: default icon not displayed in production
// https://stackoverflow.com/questions/41144319/leaflet-marker-not-found-production-env/76454369#76454369
let _astroLeafletMarkerDefaultIcon: Icon | undefined
export function getAstroLeafletMarkerDefaultIcon() {
  if (!_astroLeafletMarkerDefaultIcon) {
    _astroLeafletMarkerDefaultIcon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [2, -40],
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.0/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.0/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.0/dist/images/marker-shadow.png',
    })
  }

  return _astroLeafletMarkerDefaultIcon
}

