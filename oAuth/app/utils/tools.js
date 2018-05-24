function assertString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}

export function isUUID(str) {
  assertString(str);
  const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
  return pattern && pattern.test(str);
}

export function stringToUUIDArray(string) {
  const regexp = /[^0-9a-zA-Z,-]/ig;
  const UUIDArray = string.replace(regexp, '').split(',').filter(x => x !== '');
  // const memberIdRaw = removeSpace.split(',');
  // const memberId = memberIdRaw.filter(x => x !== '');
  return UUIDArray;
}

export function getDateTime(date, time) {
  let newDate = new Date(date).toISOString();
  newDate = new Date(newDate).setDate(new Date(newDate).getDate() + 1);
  let newTime = new Date(time).toISOString();
  newTime = new Date(newTime).setHours(new Date(newTime).getHours() + 8);

  const sliceDate = new Date(newDate).toISOString().slice(0, -13);
  const sliceTime = new Date(newTime).toISOString().slice(11, 23);
  const datetime = sliceDate + sliceTime;

  return datetime;
}

export function getDefaultTime() {
  const realTime = new Date();
  let realTimeStartFrom = new Date(realTime).toISOString();
  realTimeStartFrom = new Date(realTimeStartFrom).setMonth(new Date(realTimeStartFrom).getMonth() - 1);
  realTimeStartFrom = new Date(realTimeStartFrom).setHours(new Date(realTimeStartFrom).getHours() + 8);

  let realTimeEnd = new Date(realTime).toISOString();
  realTimeEnd = new Date(realTimeEnd).setHours(new Date(realTimeEnd).getHours() + 8);

  const sliceStartDate = new Date(realTimeStartFrom).toISOString().slice(0, -13);
  const sliceStartTime = new Date(realTimeStartFrom).toISOString().slice(11, 23);
  const newStart = sliceStartDate + sliceStartTime;

  const sliceEndDate = new Date(realTimeEnd).toISOString().slice(0, -13);
  const sliceEndTime = new Date(realTimeEnd).toISOString().slice(11, 23);
  const newEnd = sliceEndDate + sliceEndTime;

  const apiTime = { newStart, newEnd };
  return apiTime;
}

export function getRealDateTime() {
  const realTime = new Date();
  let endTime = new Date(realTime).toISOString();
  endTime = new Date(endTime).setHours(new Date(endTime).getHours() + 8);
  const newEnd = new Date(endTime).toISOString().slice(0, 23);

  let startTime = new Date(realTime).toISOString();
  startTime = new Date(startTime).setHours(new Date(startTime).getHours() + 8);
  startTime = new Date(startTime).setDate(new Date(startTime).getDate() - 1);
  const newStart = new Date(startTime).toISOString().slice(0, 23);

  const apiTime = { newStart, newEnd };
  return apiTime;
}

export function getIsoTimeString(date, time) {
  const tzo = date.getTimezoneOffset();
  const dif = tzo >= 0 ? '-' : '+';
  function pad(num) {
    const norm = Math.abs(Math.floor(num));
    return (norm < 10 ? '0' : '') + norm;
  }
  return date.getFullYear().concat(
        '-', pad(date.getMonth() + 1),
        '-', pad(date.getDate()),
        'T', pad(time.getHours()),
        ':', pad(time.getMinutes()),
        ':', pad(time.getSeconds()),
        dif, pad(tzo / 60),
        ':', pad(tzo % 60));
}
