const verifyDatetime = (datetimeObj: unknown) => {
  return datetimeObj instanceof Date && !isNaN(datetimeObj.valueOf());
};

const extractTime = (time : unknown) => {
  if (typeof time == 'string' || typeof time == 'number') {
    const datetimeObj = new Date(time);
    if (verifyDatetime(datetimeObj)) {
      return { hour: datetimeObj.getHours(), minute: datetimeObj.getMinutes() };
    }
  }
  if (typeof time == 'string') {
    const components = time.split(':');
    if (components.length >= 2) {
      const hour = parseInt(components[0]);
      const minute = parseInt(components[1]);
      if (!isNaN(hour) && !isNaN(minute)) {
        return { hour: hour, minute: minute};
      }  
    }
  }
};

export { extractTime,verifyDatetime };