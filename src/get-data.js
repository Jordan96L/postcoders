let cache = {};
export default async function getData(url) {
  let result = "";
  if (cache[url] !== undefined) return cache[url].value;

  await fetch(url)
    .then((response) => response.json())
    .then((json) => (cache[url] = { time: new Date(), value: json }));
  return cache[url].value.places;
}

// Interval to clear cache;
setInterval(function () {
  if (Object.keys(cache).length > 0) {
    let currentTime = new Date();
    Object.keys(cache).forEach((key) => {
      let seconds = currentTime - cache[key].time;

      if (seconds > 10000) {
        delete cache[key];
        console.log(`${key}'s cache deleted`);
      }
    });
  }
}, 3000);
