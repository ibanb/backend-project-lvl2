// import all methods for work with treeNode 

// THIS MAIN func that create diff recursive in obj
// attention SEE in STD task)))

  // Короче всё ясно. 
  // 1) найти ключи которые есть в первом но их нет во втором и добавить их с правильными знаками
  // 2) найти ключи которые есть во втором но их нет в первом и добавить их с правильными знаками
  // 3) Найти ключи которые есть в обоих и они простые
  // 4) Найти ключи которые есть в обоих и они комплексные
  // 5) Провести сортировку ключей на выходе (использовать LODASH)

export default function findDiff(dataOne, dataTwo) {

  const result = {};
  
  const propsDataOne = Object.entries(dataOne);
  const propsDataTwo = Object.entries(dataTwo);
  const uniquePropsDataOne = propsDataOne.filter(prop => {
    const [key, value] = prop;
    const keysOfPropsDataTwo = propsDataTwo.map(item => item[0]);
    return !keysOfPropsDataTwo.includes(key);
  });
  const uniquePropsDataTwo = propsDataTwo.filter(prop => {
    const [key, value] = prop;
    const keysOfPropsDataOne = propsDataOne.map(item => item[0]);
    return !keysOfPropsDataOne.includes(key);
  });
  const commonProps = propsDataOne.filter(prop => {
    const [key, value] = prop;
    const keysOfPropsDataTwo = propsDataTwo.map(item => item[0]);
    return keysOfPropsDataTwo.includes(key);
  });

  uniquePropsDataOne.map(prop => {
    const [key, value] = prop;
    result[`- ${key}`] = value;
  });

  uniquePropsDataTwo.map(prop => {
    const [key, value] = prop;
    result[`+ ${key}`] = value;
  });

  commonProps.map(prop => {
    // first case is prime value
    // 
    const [key, value] = prop;
  })
  

  // lodash method for sort
  return commonPropsDataOne;

};
