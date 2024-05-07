export function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("met-viewed-artworks")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

export function saveToLS(key, value) {
  JSON.stringify({ [key]: value });

  if (global.localStorage) {
    global.localStorage.setItem(
      "met-viewed-artworks",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
