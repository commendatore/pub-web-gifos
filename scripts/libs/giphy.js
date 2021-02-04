class GiphyApi {
  constructor(apiKey) {
    this._apiKey = apiKey.apiKey;
    this._username = apiKey.username;
  }

  search = async (query) => {
    const url = `https://api.giphy.com/v1/gifs/search`;
    const params = `?api_key=${this._apiKey}&q=${query.term}&limit=${query.limit}`;
    const extens = `&offset=0&rating=G&lang=en`;

    const res = await fetch(url + params + extens);
    const json = await res.json();
    return json.data.map((arr) => {
      return {
        fullsize: arr.images.downsized_large,
        preview: arr.images.preview,
        title: arr.title,
        username: arr.username,
      };
    });
  };

  suggestions = async (query) => {
    const url = `https://api.giphy.com/v1/tags/related/`;
    const params = `${query.term}?api_key=${this._apiKey}`;

    const res = await fetch(url + params);
    const json = await res.json();
    return json.data;
  };

  trending = async () => {
    const url = `https://api.giphy.com/v1/trending/searches`;
    const params = `?api_key=${this._apiKey}`;

    const res = await fetch(url + params);
    const json = await res.json();
    return json.data;
  };

  upload = async (gifFile) => {
    const url = `https://upload.giphy.com/v1/gifs`;
    const params = `?api_key=${this._apiKey}&username=${this._username}&file=${gifFile}`;
    const extens = `&tags=gifos&source_post_url=https://hiwi.io/`;

    let options = {
      method: "POST",
      mode: "no-cors",
    };

    const res = await fetch(url + params + extens, options);
    const json = await res.json();
    return json.data;
  };
}

export { GiphyApi };
