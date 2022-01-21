import _ from 'lodash';

const first = {
  name: 'Ivan',
  test: 'testing',
  age: 32,
  exp: {
    it: 7,
    bank: 1,
  }
};

const second = {
  name: 'Lev',
  age: 32,
  exp: {
    it: 7,
    bank: 2,
    shmank: {
      balala: 'Loso',
    }
  }
};

function travelerse(valueOne, valueTwo) {
  const result = {};

  const keysOne = Object.keys(valueOne);
  const keysTwo = Object.keys(valueTwo);
  const uniq = _.uniq(keysOne.concat(keysTwo));

  for (const key of uniq) {

    if (valueOne[key] && valueTwo[key] && valueOne[key] === valueTwo[key]) {
      result[`  ${key}`] = valueOne[key]; 
    }
    
    if (valueOne[key] 
      && valueTwo[key] 
      && typeof(valueOne[key]) !== 'object' 
      && typeof(valueTwo[key]) !== 'object' 
      && valueOne[key] !== valueTwo[key]) {

      result[`+ ${key}`] = valueOne[key];
      result[`- ${key}`] = valueTwo[key]; 
    }

    if (!valueOne[key]) {
      result[`- ${key}`] = valueTwo[key];
    }

    if (!valueTwo[key]) {
      result[`+ ${key}`] = valueOne[key];
    }

    if (valueOne[key] 
      && valueTwo[key] 
      && typeof(valueOne[key]) === 'object' 
      && typeof(valueTwo[key]) !== 'object') {

        result[`+ ${key}`] = _.cloneDeep(valueOne[key]);
        result[`- ${key}`] = valueTwo[key];
    }
    
    if (valueOne[key] 
      && valueTwo[key] 
      && typeof(valueOne[key]) !== 'object' 
      && typeof(valueTwo[key]) === 'object') {

        result[`+ ${key}`] = valueOne[key];
        result[`- ${key}`] = _.cloneDeep(valueTwo[key]);
    }

    if (valueOne[key] 
      && valueTwo[key] 
      && typeof(valueOne[key]) === 'object' 
      && typeof(valueTwo[key]) === 'object') {

        result[`  ${key}`] = travelerse(valueOne[key], valueTwo[key]);
    }

  }

  return result;
}


console.log(travelerse(first, second));

