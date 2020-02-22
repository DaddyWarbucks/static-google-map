# static google map

A URL builder for Google Maps Static that turns a javascript object into a querystring. Generate complex query strings containing markers, paths, directions and more.

## Overview

```
yarn add static-google-map
```


```js
import { staticMapUrl } from 'static-google-map';

const url = staticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  markers: [
    {
      location: { lat: '28.3125', lng: '-97.6257' },
      color: 'purple',
      size: 'tiny'
    },
    {
      location: 'Memphis,TN',
      color: 'red'
    }
  ],
  markerGroups: [
    {
      color: 'blue',
      label: 'B',
      markers: [
        { location: { lat: '37.2125', lng: '-85.7257' } },
        { location: 'Nashville,TN' }
      ]
    },
    {
      color: 'yellow',
      label: 'Y',
      markers: [
        { location: 'Dallas,TX' },
        { location: 'Los Angeles,CA' }
      ]
    }
  ],
  paths: [
    {
      color: 'green',
      points: ['Denver,CO', 'Kalispell,MT', 'Chicago,IL']
    },
    {
      color: 'red',
      points: ['27.749825, -73.987963', '40.849825, -74.987963']
    },
    {
      color: 'blue',
      points: 'enc:enrjF~blePve|Mwp`T' // be sure to include `enc:`
    }
  ],
  pathGroups: [{
    color: 'brown',
    paths: [
      { points: ['Memphis,Tn', 'Atlanta,Ga'] },
      { points: ['43.749825,-73.987963', '38.849825,-74.987963'] }
    ]
  }]
});

console.log(url);

```
Should render

```
https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&key=YOUR_API_KEY&markers=size:tiny%7Ccolor:purple%7C28.3125,-97.6257&markers=color:red%7CMemphis,TN&markers=color:blue%7Clabel:B%7C37.2125,-85.7257%7CNashville,TN&markers=color:yellow%7Clabel:Y%7CDallas,TX%7CLos%20Angeles,CA&path=color:green%7CDenver,CO%7CKalispell,MT%7CChicago,IL&path=color:red%7C27.749825,%20-73.987963%7C40.849825,%20-74.987963&path=color:brown%7CMemphis,Tn%7CAtlanta,Ga%7C43.749825,-73.987963%7C38.849825,-74.987963
```

## Documentation
 - [Static Map](#static-map)
 - [Markers](#markers)
 - [Paths](#paths)
 - [Directions](#directions)


## Static Map

```js
import { staticMapUrl } from 'static-google-map';

const url = staticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap'
});

console.log(url);

```
Should render

```
https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&key=YOUR_API_KEY
```

The base map takes the following props:

- `size`: (required) defines the rectangular dimensions of the map image. This parameter takes a string of the form `{horizontal_value}x{vertical_value}`. For example, `500x400` defines a map `500 pixels` wide by `400 pixels` high. Maps smaller than 180 pixels in width will display a reduced-size Google logo. This parameter is affected by the `scale` parameter; the final output size is the product of the size and scale values.

- `scale`: (optional) affects the number of pixels that are returned. `scale=2` returns twice as many pixels as `scale=1` while retaining the same coverage area and level of detail (i.e. the contents of the map don't change). This is useful when developing for high-resolution displays, or when generating a map for printing. The default value is `1`. Accepted values are `2` and `4` (`4` is only available to Google Maps APIs Premium Plan customers.)

- `format`: (optional) defines the format of the resulting image. By default, the Google Static Maps API creates `PNG` images. There are several possible formats including `GIF`, `JPEG` and `PNG` types. Which format you use depends on how you intend to present the image. `JPEG` typically provides greater compression, while `GIF` and `PNG` provide greater detail.

- `maptype`: (optional) defines the type of map to construct. There are several possible maptype values, including `roadmap`, `satellite`, `hybrid`, and `terrain`.

- `language`: (optional) defines the language to use for display of labels on map tiles. Note that this parameter is only supported for some country tiles; if the specific language requested is not supported for the tile set, then the default language for that tileset will be used.

- `region`: (optional) defines the appropriate borders to display, based on geo-political sensitivities. Accepts a region code specified as a two-character ccTLD ('top-level domain') value.

- `visible`: (optional) specifies one or more locations that should remain visible on the map, though no markers or other indicators will be displayed. Use this parameter to ensure that certain features or map locations are shown on the Google Static Maps API.

- `style`: (optional) defines a custom style to alter the presentation of a specific feature (roads, parks, and other features) of the map. This parameter takes feature and element arguments identifying the features to style, and a set of style operations to apply to the selected features.

- `center`: (required if markers not present) defines the center of the map, equidistant from all edges of the map. This parameter takes a location as either a comma-separated {latitude,longitude} pair (e.g. "40.714728,-73.998672") or a string address (e.g. "city hall, new york, ny") identifying a unique location on the face of the earth.

- `zoom`: (optional if markers not present) defines the zoom level of the map, which determines the magnification level of the map. This parameter takes a numerical value corresponding to the zoom level of the region desired.

- `key`: (optional) allows you to monitor your application's API usage in the [Google API Console](https://support.google.com/googleapi/#topic=7013279)

- `signature`: (recommended) is a digital signature used to verify that any site generating requests using your API key is authorized to do so.

- `client`: (optional) By using your client ID (instead of an API key) to authenticate requests, you can: Add the channel parameter to requests so you can view more detailed usage reports.

- `channel`: (optional) used to provide additional reporting detail, by grouping different channels separately in your reports. Refer to the [Premium Plan Reporting Overview](https://developers.google.com/maps/premium/reports/) for more information.

## Markers

```js
import { staticMapUrl } from 'static-google-map';

const url = staticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  markers: [
    {
      location: { lat: '28.3125', lng: '-97.6257' },
      color: 'purple',
      size: 'tiny'
    },
    {
      location: 'Memphis,TN',
      color: 'red'
    }
  ]
});

console.log(url);

```
Should render

```
https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&key=YOUR_API_KEY&markers=size:tiny%7Ccolor:purple%7C28.3125,-97.6257&markers=color:red%7CMemphis,TN
```

Adding an array property of `markers` allows you render [markers](https://developers.google.com/maps/documentation/static-maps/intro#Markers) on the image.

Each `marker` in the `markers` array takes the following props:

- `size` - (optional) specifies the size of marker from the set `{tiny, mid, small}`. If no size parameter is set, the marker will appear in its default (normal) size.

- `color` - (optional) specifies a 24-bit color (example: color=0xFFFFCC) or a predefined color from the set `{black, brown, green, purple, yellow, blue, gray, orange, red, white}`

- `label` - (optional) specifies a single uppercase alphanumeric character from the set `{A-Z, 0-9}`. Note that default and mid sized markers are the only markers capable of displaying an alphanumeric-character parameter. `tiny` and `small` sized markers are not capable of displaying an alphanumeric-character.

- `iconURL` - (optional) specifies the icon for the Marker - rather than use Google's marker icons - using a URL (which should be [URL-encoded](https://en.wikipedia.org/wiki/URL-encoding)). You can use URLs created by URL-shortening services such as https://goo.gl. Most URL-shortening services have the advantage of automatically encoding URLs.

- `anchor` - (optional) sets how the icon is placed in relation to the specified markers locations. By default, the anchor point of a custom icon is the `bottom center` of the icon image. You can specify a different anchor point using the anchor descriptor in conjunction with your icon. Set the anchor as an `x,y` point of the icon (such as `10,5`), or as a predefined alignment using one of the following values: `top, bottom, left, right, center, topleft, topright, bottomleft, or bottomright`

- `scale`: (optional) useful when using a custom marker iconURL.  The scale value is multiplied with the marker image size to produce the actual output size of the marker in pixels. Default scale value is 1; accepted values are 1, 2, and 4. Use marker scaling in conjunction with map scaling when displaying higher-resolution maps.

- `location` - (required) defines the marker's location on the map. If the location is off the map, that marker will not appear in the constructed image provided that `center` and `zoom` props on the parent are supplied. However, if these props are not supplied, the Google Static Maps API server will automatically construct an image which contains the supplied markers ala [Implicit Positioning](https://developers.google.com/maps/documentation/static-maps/intro#ImplicitPositioning).


### Marker Groups

There is also a `markerGroups` property that renders markers with the same style in different locations.

This component removes all other props expect `location` from its children markers.

```js
import { staticMapUrl } from 'static-google-map';

const url = staticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  markerGroups: [
    {
      color: 'blue',
      label: 'B',
      markers: [
        { location: { lat: '37.2125', lng: '-85.7257' } },
        { location: 'Nashville,TN' }
      ]
    },
    {
      color: 'yellow',
      label: 'Y',
      markers: [
        { location: 'Dallas,TX' },
        { location: 'Los Angeles,CA' }
      ]
    }
  ]
});

console.log(url);

```
Should render

```
https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&key=YOUR_API_KEY&markers=color:blue%7Clabel:B%7C37.2125,-85.7257%7CNashville,TN&markers=color:yellow%7Clabel:Y%7CDallas,TX%7CLos Angeles,CA
```

## Paths

```js
import { staticMapUrl } from 'static-google-map';

const url = staticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  paths: [
    {
      color: 'green',
      points: ['Denver,CO', 'Kalispell,MT', 'Chicago,IL']
    },
    {
      color: 'red',
      points: ['27.749825, -73.987963', '40.849825, -74.987963']
    },
    {
      color: 'blue',
      points: 'enc:enrjF~blePve|Mwp`T' // be sure to include `enc:`
    }
  ]
});

console.log(url);

```
Should render

```
https://maps.googleapis.com/maps/api/staticmap?size=600x600&scale=1&format=png&maptype=roadmap&key=YOUR_API_KEY&path=color:green%7CDenver,CO%7CKalispell,MT%7CChicago,IL&path=color:red%7C27.749825, -73.987963%7C40.849825, -74.987963
```

The paths property allows you render [paths](https://developers.google.com/maps/documentation/static-maps/intro#Paths) on the image.

Each `path` in the `paths` array takes the following props:

- `weight` - (optional) specifies the thickness of the path in pixels. If no weight parameter is set, the path will appear in its default thickness (5 pixels).

- `color` - (optional) specifies a color either as a 24-bit (example: color=0xFFFFCC) or 32-bit hexadecimal value (example: color=0xFFFFCCFF), or from the set `{black, brown, green, purple, yellow, blue, gray, orange, red, white}`.

- `fillcolor` - (optional) indicates both that the path marks off a polygonal area and specifies the fill color to use as an overlay within that area.

- `geodesic` - (optional) indicates that the requested path should be interpreted as a geodesic line that follows the curvature of the earth. When false, the path is rendered as a straight line in screen space. Defaults to false.

- `points` - (required) Either an encoded polyline string or an array with two or more points. When passing a string polyline, be sure to include the `enc:` such as `{ points: 'points: 'enc:enrjF~blePve|Mwp`T' ' }`. When using an array of points, the Google Static Maps API will connect the path along those points in the specified order.


### Path Groups

There is also a `pathGroups` property that renders different paths with the same style.

This component removes all other props expect `points` from its children paths.

```js
import { staticMapUrl } from 'static-google-map';

const url = staticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  pathGroups: [{
    color: 'brown',
    paths: [
      { points: ['Memphis,Tn', 'Atlanta,Ga'] },
      { points: ['43.749825,-73.987963', '38.849825,-74.987963'] }
    ]
  }]
});

console.log(url);

```

## Directions

```js
import { asyncStaticMapUrl } from 'static-google-map';

// Note in order to use the `directions` prop, you must use the
// `asyncStaticMapUrl` function instead of the `staticMapUrl`
asyncStaticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  directions: [
    {
      origin: { lat: '36.3125', lng: '-86.6257' },
      destination: 'Nashville, TN'
    }
  ]
}).then(console.log).catch(console.log);

```

This is a syntatic sugar around the [Paths](#paths) that uses the [Google Directions API](https://developers.google.com/maps/documentation/directions/intro) to render a Path on the map.

This component by default requires that the [Google Maps JavaScript Client Side API](https://developers.google.com/maps/documentation/javascript/directions) be loaded.

Add `<script src="https://maps.googleapis.com/maps/api/js?key="></script>` to your `index.html`

You may also fallback to a regular JS fetch function or provide your own promise.

```js
import { asyncStaticMapUrl } from 'static-google-map';

// Use the 'native' Google Maps Directions from window.google.maps
asyncStaticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  directions: [
    {
      origin: { lat: '36.3125', lng: '-86.6257' },
      destination: 'Nashville, TN'
    }
  ]
}).then(console.log).catch(console.log);

// Fallback to a regular JS fetch function that calls the Google Maps API
// by passing a second argument string `fetch`
asyncStaticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  directions: [
    {
      origin: { lat: '36.3125', lng: '-86.6257' },
      destination: 'Nashville, TN'
    }
  ]
}, 'fetch')
.then(console.log).catch(console.log);

// Provide your own promise that returns an encoded polystring
// by passing it as the second argument to `asyncStaticMapUrl`
const getPolyString = new Promise(resolve => resolve('...'));

asyncStaticMapUrl({
  key: 'YOUR_API_KEY',
  scale: 1,
  size: '600x600',
  format: 'png',
  maptype: 'roadmap',
  directions: [
    {
      origin: { lat: '36.3125', lng: '-86.6257' },
      destination: 'Nashville, TN'
    }
  ]
}, getPolyString)
.then(console.log).catch(console.log);

```


It takes the following props as well as props from [Paths](#paths)

- `origin` -  (required) specifies the start location from which to calculate directions. This value may be specified as a String (for example, "Chicago, IL"), as a LatLng value

- `destination` - (required) specifies the end location to which to calculate directions. The options are the same as for the origin field described above.

- `travelMode` - (optional) specifies what mode of transport to use when calculating directions. Valid values are `driving (Default), bicycling, transit, and walking`


### URL Size Restriction

Google Static Maps API URLs are restricted to `8192` characters in size. In practice, you will probably not have need for URLs longer than this, unless you produce complicated maps with a high number of markers and paths.

## License

[MIT](LICENSE).
