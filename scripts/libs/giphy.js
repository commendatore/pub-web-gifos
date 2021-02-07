class GiphyAPI {
  constructor(apiKey) {
    this.urlAPI = `https://api.giphy.com/v1`;
    this.urlUpload = `https://upload.giphy.com/v1`;
    this.apiKey = `api_key=${apiKey.apiKey}`;
    this.username = `username=${apiKey.username}`;
  }

  search = async (query) => {
    const path = `/gifs/search`;
    const params = `?${this.apiKey}&q=${query.term}&limit=${query.limit}&offset=${query.offset}`;
    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
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
    const path = `/tags/related/${query.term}`;
    const params = `?${this.apiKey}`;
    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    return json.data;
  };

  trending = async () => {
    const path = `/trending/searches`;
    const params = `?${this.apiKey}`;
    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    return json.data;
  };

  upload = async (gifData) => {
    const path = `/gifs`;
    const params = `?${this.apiKey}&${this.username}`;
    const endpoint = this.urlUpload + path + params;
    const options = {
      method: "POST",
      body: gifData,
    };

    try {
      const res = await fetch(endpoint, options);
      try {
        const json = await res.json();
        return json.data.id;
      } catch (err) {
        console.error("upload fetch error: json");
        console.error(err);
      }
    } catch (err) {
      console.error("upload fetch error: endpoint");
      console.error(err);
    }
  };

  getGif = async (gifId) => {
    const path = `/gifs/${gifId}`;
    const params = `?${this.apiKey}`;
    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    return json.data.images.original.url;
  };
}

export { GiphyAPI };
