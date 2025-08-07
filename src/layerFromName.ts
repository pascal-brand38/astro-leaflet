// Copyright (c) Pascal Brand
// MIT License

import type { TileLayerOptions } from "leaflet"

type _layerAllNamesType = {
  [ key: string ]: {
    desc?: string,
    names: {
      name: LayerNamesType,
      desc?: string,
    } []
  }
}

/** list of all friendly name for layer, sorted by their providers */
export const layerAllNames: _layerAllNamesType = {
  "OSM": {
    desc: `Images provided by <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>.`
    ,
    names: [
      {
        name: "OSM",
      },
    ],
  },
  "Google": {
    desc: `Images provided by <a href='https://maps.google.com'>Google</a>. Parameters are type, extra and lang:<br>
          <ul>
            <li> &type= satellite or street or hybrid or terrain
            <li> &extra= transit, bike, or several values separated by a comma
            <li> &lang= 2 letter country code to provide labels in a spcific language
          </ul>`
    ,
    names: [
      {
        name: "Google&type=satellite",
        desc: "Satellite images",
      },
      {
        name: "Google&type=hybrid",
        desc: "Satellite images with labels",
      },
      {
        name: "Google&type=street",
        desc: "Street and road, with flat map",
      },
      {
        name: "Google&type=terrain",
        desc: "Street and road, with terrain map",
      },
      {
        name: "Google&type=street&extra=transit,bike&lang=ko",
        desc: "Streets and labels, along with subways and bike lanes, in Korean language",
      },
    ],
  },
  "Michelin": {
    desc: `Images provided by <a href='https://www.viamichelin.com/'>Michelin</a>. Parameters are type:<br>
          <ul>
            <li> &type= map or label
          </ul>`
    ,
    names: [
      {
        name: "Michelin&type=map",
      },
      {
        name: "Michelin&type=label",
      }
    ],
  },
}

/** type guessed by a layer name of type ```LayerNamesType```,
 * such as ```Google&type=street&lang=en```
 */
export interface LayerFromNameType {
  /** guessed tileayer url */
  tileLayer: string,
  /** guessed tilelayer options (subdomains,...) */
  options: TileLayerOptions,
}

type _char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' |
             'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

type _googleTypeType = '' | `&type=${'satellite' | 'street' | 'hybrid' | 'terrain'}`
type _googleLangType = '' | `&lang=${_char}${_char}`
type _googleExtraValueType = 'transit' | 'bike'
type _googleExtraType = '' | `&extra=${_googleExtraValueType}` | `&extra=${_googleExtraValueType},${_googleExtraValueType}`
type _michelinTypeType = '' | `&type=${'map' | 'label'}`

/** tilelayer name type */
export type LayerNamesType =
  /** openstreetmap */
  'OSM' |
  /** google map */
  `Google${_googleTypeType}${_googleExtraType}${_googleLangType}` |
  /** michelin */
  `Michelin${_michelinTypeType}`

/** return url tile layer and tile layer options related to a layer name,
 * such as ```Google&type=street&lang=en```
 */
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
    const corresp = { 'satellite': 's', 'street': 'm', 'terrain': 'p', 'hybrid': 's,h' }
    let lyrs = '&lyrs=s'    // default is satellite view
    let extra = ''
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
    if (searchParams.has('extra')) {
      lyrs += ',' + searchParams.get('extra')
    }

    return {
      tileLayer: `https://{s}.google.com/vt/x={x}&y={y}&z={z}${lyrs}${lang}`,
      options: {
        subdomains: [ 'mt0', 'mt1', 'mt2', 'mt3' ],
        attribution: '&copy; Google',
      },
    }
  }


  if (name.startsWith('Michelin')) {
    // from https://xyz.michelstuyts.be/service.php?id=620&lang=fr
    let tileLayer = 'https://map1.viamichelin.com/map/mapdirect?map=viamichelin&z={z}&x={x}&y={y}&format=png&version=202505301130&layer=background&protocol=https'
    if (searchParams.has('type') && (searchParams.get('type')==='label')) {
			tileLayer = 'https://{s}.viamichelin.com/map/mapdirect?map=hybrid&z={z}&x={x}&y={y}&format=png&version=202505301130&layer=network'
    }
    return {
      tileLayer,
      options: {
        opacity: 1,
        subdomains:[ 'map1', 'map2', 'map3', 'map4', 'map5', ],
        attribution: '&copy; Michelin',
        minZoom: 5,
        maxZoom: 19,
      },
    }
  }

  return getLayerOptionsFromName('OSM')   // default return
}

/** Merge TileLayer options that are given by the users, with the one guessed by tileByName */
export function mergeTileLayerOptions(
  /** options given by the users */
  providedOptions: TileLayerOptions | undefined,
  /** options guessed by tileByName */
  guessedOptions: TileLayerOptions): TileLayerOptions {
    if (!providedOptions) {
      providedOptions = {}
    }
    Object.keys(guessedOptions).forEach(key =>
      providedOptions[key] = providedOptions[key] || guessedOptions[key]
    )
    return providedOptions
}