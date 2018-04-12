export const on = (node, eventNames, handler) =>
  eventNames.split(' ').forEach(eventName => node.addEventListener(eventName, handler))

export const getCoordsfromEvent = event => {
  const { left, top } = event.target.getBoundingClientRect();
  const ev = event.touches ? event.touches[0] : event;

  return {
    x: ev.clientX - left,
    y: ev.clientY - top,
  }
}

export const getTime = () => {
  const d = new Date();
  return [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  ].join('-');
}
