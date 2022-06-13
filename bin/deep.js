import { make, getName, getValue, getType, hasProp, getChild } from './make.js';

const deep = (children) => {
    const iter = (data) => {
        if (getType(data) === 'prime') {
            return {propName: `  ${getName(data)}`, type: getType(data), value: getValue(data)};
        } else {
            return {propName: `  ${getName(data)}`, type: getType(data), value: getValue(data).map(iter)};
        }
    };

    return children.map(iter);
};

export default deep;