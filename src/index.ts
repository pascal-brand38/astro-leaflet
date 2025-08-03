// Copyright (c) Pascal Brand
// MIT License

import type {
  LatLngExpression,
  MarkerOptions,
  DivIconOptions,
  Map,
  MapOptions,
  TileLayerOptions,
  ZoomPanOptions,
  PolylineOptions,
} from 'leaflet'
import type { HTMLAttributes } from 'astro/types'

import type { LayerNamesType } from './layerFromName'

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

  /** friendly name of the lyer, such as Google&type=satellite */
  tileByName?: LayerNamesType,

  /** ```<Leaflet...>``` is calling leaflet ```map()``` function with options ```mapOptions``` */
  mapOptions?: MapOptions,

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


interface _AstroLeafletTileLayerOptionsType {
  /** leaflet options of the tilelayer: opacity,... */
  options?: TileLayerOptions,
}

interface _AstroLeafletTileLayerByNameType extends _AstroLeafletTileLayerOptionsType {
  /** name of the tile to display, as used by getLayerOptionsFromName() */
  tileByName: LayerNamesType,

  /** urlTemplate or tileByName, but not both */
  urlTemplate?: never,
}

interface _AstroLeafletTileLayerByUrlType extends _AstroLeafletTileLayerOptionsType {
  /** url of the tiles, such as 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' */
  urlTemplate: string,

  /** urlTemplate or tileByName, but not both */
  tileByName?: never,
}

/** arguments provided in ```<TileLayer .../>```. */
export type AstroLeafletTileLayerType = _AstroLeafletTileLayerByNameType | _AstroLeafletTileLayerByUrlType


/** custom element internal declaration of the custom element created by ```<Leaflet ...>```. */
declare class _CustomElementAstroLeaflet extends HTMLElement {
  /** leaflet map. undefined till the html is loaded */
  map: Map | undefined
}

/** get leaflet map associated with an id.
 *  Available once the document is loaded */
export function getMapFromId(id: string): Map | undefined {
  let el = document.getElementById(id)
  if (!el || !el.parentElement) {
    console.error(`astro-leaflet::getMap: id ${id} does not exist`)
    return undefined
  } else {
    const customElementLeafletMap: _CustomElementAstroLeaflet = (el.parentElement as _CustomElementAstroLeaflet)
    if (!customElementLeafletMap.map) {
      console.error(`astro-leaflet::getMap: id ${id} does not have a leaflet map associated with`)
    }
    return customElementLeafletMap.map
  }
}

/** get leaflet map, whose element is inside this <astro-leaflet> */
export function getMapFromElement(el: HTMLElement): Map | undefined {
  let parent: HTMLElement | null = el
  while (parent) {
    if (parent.tagName === 'ASTRO-LEAFLET') {
      const customElementLeafletMap: _CustomElementAstroLeaflet = (parent as _CustomElementAstroLeaflet)
      if (!customElementLeafletMap.map) {
        console.error(`astro-leaflet::getMapFromElement(): no leaflet map associated with`)
        return undefined
      }
      return customElementLeafletMap.map
    }
    parent = parent.parentElement
  }
  console.error('astro-leaflet::getMapFromElement() failed - cannot find ASTRO-LEAFLET custom element')
  return undefined
}

/** export astro components */
export { default as Leaflet } from './components/Leaflet.astro'
export { default as CreateLeafletIcon } from './components/CreateLeafletIcon.astro'
export { default as Polyline } from './components/Polyline.astro'
export { default as FitBounds } from './components/FitBounds.astro'
export { default as TileLayer } from './components/TileLayer.astro'
