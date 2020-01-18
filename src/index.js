import mapStrategy from './strategies/map';
import markerStrategy from './strategies/marker';
import markerGroupStrategy from './strategies/markergroup';
import pathStrategy from './strategies/path';
import pathGroupStrategy from './strategies/pathgroup';
import directionStrategy from './strategies/direction/index';

export const staticMapUrl = props => {
  const {
    markers,
    markerGroups,
    paths,
    pathGroups,
    directions,
    ...mapProps
  } = props;

  if (directions) {
    throw new Error('Use the `asyncStaticMapUrl` function when using directions');
  }

  const mainUrlParts = mapStrategy(mapProps);
  const childrenUrlParts = [];


  if (markers && Array.isArray(markers) && markers.length) {
    const markerUrlParts = markers.map(
      marker => markerStrategy(marker, mapProps)
    );
    childrenUrlParts.push(...markerUrlParts);
  }

  if (markerGroups && Array.isArray(markerGroups) && markerGroups.length) {
    const markerGroupUrlParts = markerGroups.map(
      markerGroup => markerGroupStrategy(markerGroup, mapProps)
    );
    childrenUrlParts.push(...markerGroupUrlParts);
  }

  if (paths && Array.isArray(paths) && paths.length) {
    const pathUrlParts = paths.map(
      path => pathStrategy(path, mapProps)
    );
    childrenUrlParts.push(...pathUrlParts);
  }

  if (pathGroups && Array.isArray(pathGroups) && pathGroups.length) {
    const pathGroupUrlParts = pathGroups.map(
      pathGroup => pathGroupStrategy(pathGroup, mapProps)
    );
    childrenUrlParts.push(...pathGroupUrlParts);
  }

  const childURL = childrenUrlParts.filter(part => part).join('&');

  return `${mainUrlParts}&${childURL}`;
}

export const asyncStaticMapUrl = (props, requestStrategy = 'native') => {
  return new Promise((resolve, reject) => {
    const {
      markers,
      markerGroups,
      paths,
      pathGroups,
      directions,
      ...mapProps
    } = props;

    if (!directions) {
      resolve(staticMapUrl(props));
    }

    const childrenUrlParts = [];

    if (Array.isArray(directions) && directions.length) {
      Promise.all(directions.map(
        direction => directionStrategy(direction, mapProps, requestStrategy)
      ))
      .then(directionUrlParts => {
        childrenUrlParts.push(...directionUrlParts);

        const { directions: dirs, ...synchProps } = props;
        const mainUrlParts = staticMapUrl(synchProps);
        const childURL = childrenUrlParts.filter(part => part).join('&');

        resolve(`${mainUrlParts}&${childURL}`);
      })
      .catch(reject);
    }

  });
}
