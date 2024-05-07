export function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("met-artworks")) || {};
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
      "met-artworks",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}
