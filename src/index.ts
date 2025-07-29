// Copyright (c) Pascal Brand
// MIT License

import type { LatLngExpression, MarkerOptions, DivIconOptions, Map, TileLayerOptions, ZoomPanOptions, PolylineOptions, } from 'leaflet'
import type { HTMLAttributes } from 'astro/types'

/** Type to create an icon to be used in leaflet markers.
 * This type is used in ```<CreateLeafletIcon .../>```
 * Current limitation: only divIcon can be created directly
 */
export interface AstroLeafletCreateIconType {
  /** Name of the created icon. Used to refer the icon in markers as ```astroIconName``` */
  name: string,

  /** leaflet options to create the icon */
  options: DivIconOptions,
}

/** Marker type, as provided in ```<Leaflet ... markers=...>``` */
export interface AstroLeafletMarkerType {
  /** position of the marker */
  latlng: LatLngExpression,

  /** leaflet options of the marker (title,...) */
  options?: Omit<MarkerOptions, 'icon'>,

  /** name of the icon to be used, as created by ```<CreateLeafletIcon name='myicon-name'..../>```.
   * When not provided, use the leaflet default icon
   */
  astroIconName?: string,
}

/** options to be provided in ```<Leaflet options=.../>``` */
export interface AstroLeafletOptionsType {
  /** center of the created map */
  center?: LatLngExpression,

  /** zoom */
  zoom?: number,

  /** tile url to be used. When not provided, uses ```https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png``` */
  tileLayer?: string,

  /** ```<Leaflet...>``` is calling leaflet ```setView()``` function with options ```setViewOptions``` */
  setViewOptions?: ZoomPanOptions,

  /** ```<Leaflet...>``` is calling leaflet ```tileLayer()``` function with options ```tileLayerOptions``` */
  tileLayerOptions?: TileLayerOptions,

  /** array of markers to be displayed on the map */
  markers?: AstroLeafletMarkerType[]
}

/** arguments provided in ```<Leaflet .../>```.
 * Note that ```<Leaflet...>``` inherits from a ```div``` options (id, class,...).
 * Note that when neither class nor style is provided, a default style is applied
 * in order to give a size to the map to display
 */
export interface AstroLeafletType extends HTMLAttributes<"div"> {
  options?: AstroLeafletOptionsType
}

/** arguments provided in ```<Polyline .../>```. */
export interface AstroLeafletPolylineType {
  /** list of positions, to draw the polyline */
  latlngs: LatLngExpression[] | LatLngExpression[][],
  /** leaflet options of the polyline: color,... */
  options?: PolylineOptions,
}

/** custom element internal declaration of the custom element created by ```<Leaflet ...>```. */
declare class _CustomElementAstroLeaflet extends HTMLElement {
  /** leaflet map. undefined till the html is loaded */
  map: Map | undefined
}

/** get leaflet map associated with an id.
 *  Available once the document is loaded */
export function getMap(id: string): Map |undefined {
  let el = document.getElementById(id)
  console.error(`astro-leaflet::getMap: id ${id} does not exist`)
  if (!el || !el.parentElement) {
    return undefined
  } else {
    const customElementLeafletMap: _CustomElementAstroLeaflet = (el.parentElement as _CustomElementAstroLeaflet)
    if (!customElementLeafletMap.map) {
      console.error(`astro-leaflet::getMap: id ${id} does not have a leaflet map associated with`)
    }
    return customElementLeafletMap.map
  }
}

/** export astro components */
export { default as Leaflet } from './components/Leaflet.astro'
export { default as CreateLeafletIcon } from './components/CreateLeafletIcon.astro'
export { default as Polyline } from './components/Polyline.astro'
