import pathStrategy from '../path';
import nativeStrategy from './nativeStrategy';
import fetchStrategy from './fetchStrategy';

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
    }, mapProps)
  );
};

export default directionStrategy;
