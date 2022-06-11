const make = (obj) => {
    const struct = [];
    const entries = Object.entries(obj);
    for(const [key, value] of entries) {
        if (typeof value !== 'object') {
            struct.push({propName: key, type: 'prime', value});
        } else {
            struct.push({propName: key, type: 'complex', value: [...make(value)]});
        }
    }
    return struct;
};

const getName = (prop) => {
    return prop.propName;
}

const getType = (prop) => {
    return prop.type;
};

const getChildren = (prop) => {
    return prop.children;
};

const getValue = (prop) => {
    return prop.value;
};

const hasProp = (data, name) => {
    return data.map(getName).includes(name) ? true : false;
};

const getChild = (data, name) => {
    const [value] = data.filter(item => getName(item) === name);
    return value;
};


export { make, getName, getChildren, getValue, getType, hasProp, getChild };