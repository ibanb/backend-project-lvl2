import _ from 'lodash';

export default function(object) {
    
    const result = {};

    _.forEach(Object.keys(object).sort((a, b) => {
        if (b[2] > a[2]) {
            return -1;
        }
        if (b[2] < a[2]) {
            return 1;
        }
        return 0;
    }), function(key) {
        result[key] = object[key];
    });
    return result;
      
}