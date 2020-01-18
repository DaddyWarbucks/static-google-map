import markerStrategy from "./marker";

const markerGroupStrategy = (props, mapProps) => {
  const { size, color, label, anchor, iconURL, markers, scale } = props;

  const location = markers.map(marker => marker.location);

  return markerStrategy(
    { size, color, label, anchor, iconURL, location, scale },
    mapProps
  );
};

export default markerGroupStrategy;
