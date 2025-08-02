// Copyright (c) Pascal Brand
// MIT License

import type { TileLayerOptions } from "leaflet"

export interface LayerFromNameType {
  tileLayer: string,
  options: TileLayerOptions,
}

// TODO: types should include lang,... and be as restrictive as possible
export type LayerNamesType =
  'OSM' |
  'Google' |
  `Google&type=${'satellite' | 'street' | 'hybrid' | 'terrain' }`

export function getLayerOptionsFromName(name: LayerNamesType): LayerFromNameType {
  // Iterating the search parameters
  // cf. https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const searchParams = new URLSearchParams(name);

  // Iterating the search parameters
  // for (const p of searchParams) {
  //   console.log(p);
  // }

  if (name.startsWith('OSM')) {
    return {
      tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        subdomains: [ 'a', 'b', 'c' ],
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      },
    }
  }

  if (name.startsWith('Google')) {
    const corresp = { 'satellite': 's', 'street': 'm', 'terrain': 'p', 'hybrid': 'h', }
    let lyrs = '&lyrs=s'    // default is satellite view
    let lang = ''           // default does not define any language

    if (searchParams.has('type')) {
      const v = corresp[searchParams.get('type')!]
      if (v) {
        lyrs = `&lyrs=${v}`
      }
    }
    if (searchParams.has('lang')) {
      lang = '&hl=' + searchParams.get('lang')
    }

    return {
      tileLayer: `https://{s}.google.com/vt/x={x}&y={y}&z={z}${lyrs}${lang}`,
      options: {
        subdomains: [ 'mt0', 'mt1', 'mt2', 'mt3' ],
        attribution: 'Map data &copy; Google',
      },
    }
  }

  return getLayerOptionsFromName('Google&type=street')   // default return
}
