
export default function normalize(diff) {
    const signs = ['-', '+', ' '];

    const iter = (value) => {
        const result = {};

        if(typeof value !== 'object' || value === null) {
            return value;
        }

        Object.entries(value).map(([key, value]) => {

            const typeOfValue = typeof value === 'object' && value !== null ? 'complex' : 'prime';

            // prime
            if(typeOfValue === 'prime' && signs.includes(key.slice(0, 1))) {
                result[key] = value;
            }
            if(typeOfValue === 'prime' && !signs.includes(key.slice(0, 1))) {
                result[`  ${key}`] = value;
            }
            

            // complex

            if(typeOfValue === 'complex' && signs.includes(key.slice(0, 1))) {
                result[key] = iter(value);
            }

            if(typeOfValue === 'complex' && !signs.includes(key.slice(0, 1))) {
                result[`  ${key}`] = iter(value);
            }
        });

        return result;
    }


    return iter(diff);
}