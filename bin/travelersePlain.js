import { make, getName, getValue, getType, hasProp, getChild } from '../bin/make.js';

const travelersePlain = (diff) => {


    for (const item of diff) {
        if (item.marker === '+') {
            continue;
        } else {
            const name = getName(item);
            const type = getType(item);
            const value = getValue(item);
            const sign = name[0];
            const pair = `${setSign.sign}${name.slice(1)}`;
            const checkPair = hasProp(diff, pair);
            const getPair = checkPair ? getChild(diff, pair) : null;
            stackPaths.push(name.slice(2));
            if (type === "prime") {
                if (checkPair) {
                    result.push(`Property '${stackPaths.join('.')}' was updated. From ${value} to ${getValue(getPair)}`);
                }
            }
    
            if (type === 'complex') {
                
            }



        }
    }
};