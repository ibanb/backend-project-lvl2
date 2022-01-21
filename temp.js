for (const key of keysObj1) {
  if (objTwo[key] && objOne[key] === objTwo[key]) {
    result[`  ${key}`] = objOne[key];
  }
  if (objTwo[key] && objOne[key] !== objTwo[key]) {
    result[`- ${key}`] = objOne[key];
    result[`+ ${key}`] = objTwo[key];
  }
  if (!objTwo[key]) {
    result[`- ${key}`] = objOne[key];
  }
}
/* eslint-disable-next-line */
for (const key of keysObj2) {
  if (!objOne[key]) {
    result[`+ ${key}`] = objTwo[key];
  }
}

const unorderedKeys = Object.keys(result);
  const sorted = (arr) => {
    const finalResult = arr.slice();
    const resultFin = {};
    finalResult.sort((a, b) => {
      if (a[2] > b[2]) {
        return 1;
      }
      if (a[2] < b[2]) {
        return -1;
      }
      return 0;
    });
    /* eslint-disable-next-line */
    for (const key of finalResult) {
      resultFin[key] = result[key];
    }
    return resultFin;
  };
  return sorted(unorderedKeys);
};