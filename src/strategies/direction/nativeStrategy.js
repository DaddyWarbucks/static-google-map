function nativeStrategy(data) {
  if (!window || !window.google) {
    throw new Error('The `native` directions strategy can only be used in the browser with the Google Maps API loaded. Set the `requestStrategy` property `fetch` to use standard JS fetch or pass your own promise.');
  }

  const { origin, destination, travelMode } = data;

  let originLocation;
  let destinationLocation;

  if (typeof origin === 'object' && origin.lat && origin.lng) {
    originLocation = new window.google.maps.LatLng(origin);
  } else {
    originLocation = origin;
  }

  if (typeof destination === 'object' && destination.lat && destination.lng) {
    destinationLocation = new window.google.maps.LatLng(destination);
  } else {
    destinationLocation = destination;
  }

  const DirectionsService = new window.google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    DirectionsService.route(
      {
        origin: originLocation,
        destination: destinationLocation,
        travelMode: travelMode.toUpperCase(),
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          resolve(result.routes[0].overview_polyline);
        }

        reject(status);
      }
    );
  });
}

export default nativeStrategy;
