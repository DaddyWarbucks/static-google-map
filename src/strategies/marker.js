import { urlBuilder, locationBuilder } from './utils';

const markerStrategy = (props, mapProps) => {
  const { size, color, label, anchor, iconURL, location, scale } = props;

  if (!location) {
    throw new Error('Marker expects a valid location prop');
  }

  let urlParts = [];

  urlParts.push(urlBuilder('size', size, ':'));
  urlParts.push(urlBuilder('color', color, ':'));
  urlParts.push(urlBuilder('label', label, ':'));
  urlParts.push(urlBuilder('anchor', anchor, ':'));
  urlParts.push(urlBuilder('scale', scale, ':'));
  urlParts.push(urlBuilder('icon', iconURL, ':'));
  urlParts.push(urlBuilder('', locationBuilder(location), ''));

  const url = urlParts.filter(x => x).join('%7C');

  return `markers=${url}`;
};

export default markerStrategy;
