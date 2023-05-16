import _ from 'lodash';

export default function sorted(object) {

    const ordered = Object.keys(object).sort((a, b) => {
        if (a.slice(2) > b.slice(2)) {
            return 1;
        }
        if (a.slice(2) < b.slice(2)) {
            return -1;
        } else {
            return 0;
        }
    }).reduce(
        (obj, key) => { 
          obj[key] = object[key]; 
          return obj;
        }, 
        {}
      );

    return ordered

};
