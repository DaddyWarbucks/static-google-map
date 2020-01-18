import markerStrategy from '../src/strategies/marker';
import markerGroupStrategy from '../src/strategies/markergroup';
import pathStrategy from '../src/strategies/path';
import pathGroupStrategy from '../src/strategies/pathgroup';
import directionStrategy from '../src/strategies/direction/index';

describe('Marker Strategy', () => {
  test('MarkerStrategy is defined', () => {
    expect(markerStrategy).toBeDefined();

    expect(markerStrategy({ size: "normal", location: "test" })).toBe(
      'markers=size:normal%7Ctest'
    );
  });

  test('location prop is required', () => {
    expect(() => markerStrategy({})).toThrow(
      'Marker expects a valid location'
    );
  });

  test('it parses valid marker props', () => {
    const wrapper = markerStrategy({
      color: "red",
      size: "tiny",
      label: "P",
      iconURL: "testIcon",
      anchor: "topleft",
      location: "testLocation"
    });

    expect(wrapper).toContain('color:red');
    expect(wrapper).toContain('size:tiny');
    expect(wrapper).toContain('label:P');
    expect(wrapper).toContain('anchor:topleft');
    expect(wrapper).toContain('testLocation');
    expect(wrapper).not.toContain('location:testLocation');
    expect(wrapper).toMatchSnapshot();
  });

  test('Marker group passes on all props from children except location', () => {
    const wrapper = markerGroupStrategy(
      {
        size: "tiny",
        color: "blue",
        label: "G",
        iconURL: "testIcon",
        anchor: "topleft",
        markers: [
          {
            color: "green",
            location: "marker1"
          },
          {
            color: "red",
            location: "marker2"
          },
          {
            size: "small",
            color: "brown",
            label: "T",
            iconURL: "testIcon2",
            anchor: "topright",
            location: "marker3"
          }
        ]
      }
    );

    expect(wrapper).toContain('color:blue');
    expect(wrapper).toContain('size:tiny');
    expect(wrapper).toContain('label:G');
    expect(wrapper).toContain('icon:testIcon');
    expect(wrapper).toContain('anchor:topleft');
    expect(wrapper).not.toContain('color:green');
    expect(wrapper).not.toContain('color:red');
    expect(wrapper).not.toContain('color:brown');
    expect(wrapper).not.toContain('size:small');
    expect(wrapper).not.toContain('label:T');
    expect(wrapper).not.toContain('icon:testIcon2');
    expect(wrapper).not.toContain('anchor:topright');
    expect(wrapper).toContain('marker1');
    expect(wrapper).toContain('marker2');
    expect(wrapper).toContain('marker3');
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Path Strategy', () => {
  test('it is defined', () => {
    expect(pathStrategy).toBeDefined();
    expect(pathStrategy({ weight: 5, points: "test" })).toBe('path=weight:5%7Ctest');
  });

  test('points prop is required', () => {
    expect(() => pathStrategy({})).toThrow(
      'Path expects a valid points prop'
    );
  });

  test('it parses valid point props', () => {
    const wrapper = pathStrategy({
      weight: 3,
      color: "blue",
      fillcolor: "red",
      geodesic: true,
      points: "test1"
    });

    expect(wrapper).toContain('weight:3');
    expect(wrapper).toContain('color:blue');
    expect(wrapper).toContain('fillcolor:red');
    expect(wrapper).toContain('geodesic:true');
    expect(wrapper).toContain('test1');
    expect(wrapper).not.toContain('points:test1');
    expect(wrapper).toMatchSnapshot();
  });

  test('Path group passes on all props except points', () => {

    const wrapper = pathGroupStrategy({
      weight: 2,
      color: 'red',
      fillcolor: 'blue',
      paths: [
        { points: 'test1' },
        { points: 'test2', geodesic: true },
        { points: 'test3' },
      ]
    });

    expect(wrapper).toContain('weight:2');
    expect(wrapper).toContain('color:red');
    expect(wrapper).toContain('fillcolor:blue');
    expect(wrapper).not.toContain('geodesic');
    expect(wrapper).toContain('test1');
    expect(wrapper).toContain('test2');
    expect(wrapper).toContain('test3');
  });
});

describe('Directions Strategy', () => {
  test('it is defined', () => {
    expect(directionStrategy).toBeDefined();
  });

  test('origin prop is required', () => {
    expect(() => directionStrategy({})).toThrow(
      'Origin prop is required'
    );
  });

  test('destination prop is required', () => {
    expect(() => directionStrategy({ origin: 'testOrigin' })).toThrow(
      'Destination prop is required'
    );
  });
});
