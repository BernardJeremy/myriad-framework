
module.exports = function(target, begin, end) {
  let startAt = (begin === '' ? 0 : target.indexOf(begin));
  let endAt = (end === '' ? target.length : target.indexOf(end));

  return target.substring(startAt, endAt);
};
