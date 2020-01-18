import pathStrategy from '../path';
import nativeStrategy from './nativeStrategy';
import fetchStrategy from './fetchStrategy';

// export const memoizeDirectionStrategy = (directionStrategy, cache = {}) => {
//   return function({ props }, parentProps) {
//     const key = JSON.stringify(props);
//     if (cache[key]){
//       return cache[key];
//     } else {
//       const promise = directionStrategy.apply(null, arguments).then(strat => {
//         // When this finally resolves, set the value of the cache to
//         // the string path result. Subsequent renders will return a string
//         // and use the base component instead of the Async component and
//         // not cause the flash
//         cache[key] = strat;
//         if (parentProps.onCacheUpdate) {
//           parentProps.onCacheUpdate({ ...cache });
//         }
//         return strat;
//       });
//       // Return the pending promise immedietly and the StaticGoogleMap
//       // usage of the Async component will eventually handle it because
//       // this function returned a Promise. This piece of the code prevents
//       // multiple calls to google on each render, but does not solve the
//       // "flash" of the Async component.
//       cache[key] = promise;
//       return promise;
//     }
//   }
// }

const directionStrategy = (props, mapProps, requestStrategy) => {
  const {
    origin,
    destination,
    key,
    waypoints,
    avoid,
    travelMode,
    transitMode,
    transitRoutingPreference,

    weight,
    color,
    fillcolor,
    geodesic,

    ...rest
  } = props;

  if (!origin) {
    throw new Error('Origin prop is required');
  }
  if (!destination) {
    throw new Error('Destination prop is required');
  }

  // Use the parent's API key if one isn't set here.
  const apiKey = key ? key : mapProps ? mapProps.key : '';

  const data = {
    key: apiKey,
    origin,
    destination,
    waypoints,
    avoid,
    travelMode,
    transitMode,
    transitRoutingPreference,
    ...rest,
  };

  let pathPromise;

  if (typeof requestStrategy !== 'string') {
    pathPromise = requestStrategy(data);
  } else {
    switch (requestStrategy) {
      case 'native':
        pathPromise = nativeStrategy(data);
        break;
      case 'fetch':
        pathPromise = fetchStrategy(data);
        break;
      default:
        throw new Error('Specify a Request strategy to get directions from');
    }
  }

  return pathPromise.then(path =>
    pathStrategy({
      weight,
      color,
      fillcolor,
      geodesic,
      points: `enc:${path}`
    }, parentProps)
  );
};

export default directionStrategy;
