import pathStrategy from "./path";

const pathGroupStrategy = (props, mapProps) => {
  const { weight, color, fillcolor, geodesic, paths } = props;

  const points = paths.map(path => path.points);

  return pathStrategy({ weight, color, fillcolor, geodesic, points });
};

export default pathGroupStrategy;
