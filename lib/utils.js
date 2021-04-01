import { scaleLinear } from 'd3-scale';
import * as shape from 'd3-shape';
import { parse } from 'react-native-redash';
import { SIZE } from './config';
export const buildGraphPath = (axisValues) => {
    const formattedValues = axisValues.map((o) => [o.y, o.x]);
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
        .x(([, x]) => scaleX(x))
        .y(([y]) => scaleY(y))
        .curve(shape.curveBasis)(formattedValues);
    return {
        path: parse(pathString),
        pathString,
        minX,
        maxX,
        minY,
        maxY,
    };
};
//# sourceMappingURL=utils.js.map