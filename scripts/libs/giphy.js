class GiphyAPI {
  constructor(apiKey) {
    this.urlAPI = `https://api.giphy.com/v1`;
    this.urlUpload = `https://upload.giphy.com/v1`;
    this.apiKey = `api_key=${apiKey.apiKey}`;
    this.username = `username=${apiKey.username}`;
  }

  search = async (query) => {
    const path = `/gifs/search`;
    const params = `
?${this.apiKey}
&q=${query.term}
&limit=${query.limit}
&offset=${query.offset}
&rating=${query.rating}`;

    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    const images = json.data.map((arr) => {
      return {
        id: arr.id,
        url: arr.images.original.url,
        title: arr.title,
        username: arr.username,
      };
    });

    return {
      images: images,
      total: json.pagination.total_count,
    };
  };

  suggestions = async (query) => {
    const path = `/tags/related/${query.term}`;
    const params = `
?${this.apiKey}
&limit=${query.limit}`;

    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    return json.data;
  };

  trendingSearch = async () => {
    const path = `/trending/searches`;
    const params = `?${this.apiKey}`;
    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    return json.data;
  };

  trendingGifs = async (query) => {
    const path = `/gifs/trending`;
    const params = `
?${this.apiKey}
&limit=${query.limit}
&offset=${query.offset}
&rating=${query.rating}`;

    const endpoint = this.urlAPI + path + params;

    const res = await fetch(endpoint);
    const json = await res.json();
    return json.data.map((arr) => {
      return {
        id: arr.id,
        url: arr.images.original.url,
        title: arr.title,
        username: arr.username,
      };
    });
  };

  upload = async (gifData) => {
    const path = `/gifs`;
    const params = `
?${this.apiKey}
&${this.username}`;
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
    return {
      id: json.data.id,
      url: json.data.images.original.url,
      title: json.data.title,
      username: json.data.username,
    };
  };
}

export { GiphyAPI };
