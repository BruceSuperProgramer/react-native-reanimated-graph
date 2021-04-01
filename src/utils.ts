import {scaleLinear} from 'd3-scale';
import * as shape from 'd3-shape';
import {parse} from 'react-native-redash';
import {AXIS_DATA, SIZE} from './config';

export const buildGraphPath = (axisValues: [AXIS_DATA]) => {
  const formattedValues = axisValues.map((o) => [o.y, o.x] as [number, number]);

  const xValues = formattedValues.map((o) => o[1]);
  const yValues = formattedValues.map((o) => o[0]);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const scaleX = scaleLinear().domain([minX, maxX]).range([0, SIZE]);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const scaleY = scaleLinear().domain([minY, maxY]).range([SIZE, 0]);

  const pathString = shape
    .line()
    .x(([, x]) => scaleX(x) as number)
    .y(([y]) => scaleY(y) as number)
    .curve(shape.curveBasis)(formattedValues) as string;
  return {
    path: parse(pathString),
    pathString,
    minX,
    maxX,
    minY,
    maxY,
  };
};
