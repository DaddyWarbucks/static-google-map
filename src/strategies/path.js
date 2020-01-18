import { urlBuilder, locationBuilder } from './utils';

const pathStrategy = (props, mapProps) => {
  const { weight, color, fillcolor, geodesic, points } = props;

  if (!points) {
    throw new Error('Path expects a valid points prop');
  }

  const urlParts = [];
  // Todo: Remove the property if the defaultProp and Prop value is the same

  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('weight', weight, ':'));
  urlParts.push(urlBuilder('fillcolor', fillcolor, ':'));
  urlParts.push(urlBuilder('geodesic', geodesic, ':'));
  urlParts.push(urlBuilder('', locationBuilder(points), ''));

  const url = urlParts.filter(x => x).join('%7C'); //|

  return `path=${url}`;
};

export default pathStrategy;
