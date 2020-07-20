function map(array, callback) {
  const resultArray = [];

  for(let i = 0; i < array.length; i++) {
    const result = callback(array[i], i, array);
    resultArray.push(result);
  }

  return resultArray;
}

function filter(array, callback) {
  const resultArray = [];

  for(let i = 0; i < array.length; i++) {
    const condition = callback(array[i], i, array);

    if(condition) resultArray.push(array[i]);
  }

  return resultArray;
}

function getMessagesByDate(notifacations) {
  const messagesByDate = notifacations.reduce((prev, item, index, arr) => {
    if(!prev[item.date]) {
      prev[item.date] = [];
    }
    prev[item.date].push(item.msg);

    return prev;
  }, {});

  return messagesByDate;
}

module.exports = { map, filter, getMessagesByDate };