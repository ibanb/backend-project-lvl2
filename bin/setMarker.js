import { make, getName, getValue, getType, hasProp, getChild } from '../bin/make.js';

function setMarker(diff) {
    if (getType(diff) === 'prime') {
      return {propName: getName(diff), type: 'prime', value: getValue(diff), marker: '-'};
    }
    return {propName: getName(diff), type: 'complex', value: getValue(diff).map(setMarker), marker: '-'};
}

export default setMarker;