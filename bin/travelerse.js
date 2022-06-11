import { make, getName, getChildren, getValue, getType, hasProp, getChild } from './make.js';

function travelerse(first, second) {
    const struct = [];
    // если имена и значения свойств одинаковые или разные но простые
    for (const item of first) {

        if (hasProp(second, getName(item))) {
      
            const valueOne = getValue(item);
            const valueTwo = getValue(getChild(second, getName(item)));
            const typeOne = getType(item);
            const typeTwo = getType(getChild(second, getName(item)));

            if (typeOne === typeTwo && typeOne === 'prime') {
                if (valueOne === valueTwo) {
                    struct.push({propName: `  ${getName(item)}`, type: 'prime', value: valueOne});
                } else {
                    struct.push({propName: `- ${getName(item)}`, type: 'prime', value: valueOne});
                    struct.push({propName: `+ ${getName(item)}`, type: 'prime', value: valueTwo});
                }
            }

            // если типы одинаковые и сложные запускаем РЕКУСИЮ
            if (typeOne === typeTwo && typeOne === 'complex') {
                struct.push({propName: `  ${getName(item)}`, type: 'complex', value: [...travelerse(valueOne, valueTwo)]});
            }
        }

        if (!hasProp(second, getName(item))) {
            struct.push({propName: `- ${getName(item)}`, type: getType(item), value: getValue(item)});
        }
    }
    // если имя есть только во втором объекте
    for (const item of second) {
        if (!hasProp(first, getName(item))) {
            struct.push({propName: `- ${getName(item)}`, type: getType(item), value: getValue(item)});
        }
    }

    return struct;
}

export default travelerse;