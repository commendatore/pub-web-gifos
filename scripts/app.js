import credential from "./config/giphyKey.js";

import { GifosCommons, GifosSlides, GifosSearch } from "./libs/gifos.js";
import { WebcamRecord } from "./libs/webcam.js";
import { GiphyAPI } from "./libs/giphy.js";

const giphy = new GiphyAPI(credential);

const gifosCommons = new GifosCommons(
  "hamburger-bttn",
  "hamburger-menu",
  "switch-bttn"
);

if (gifosCommons.isNightMode()) {
  gifosCommons.setNightMode();
} else {
  gifosCommons.setLightMode();
}

const gifosSlides = new GifosSlides();
if (gifosCommons.getPage() !== "create") {
  gifosSlides.setSlider(
    "carousel-box",
    "carousel-slider__slide",
    "carousel-backward-bttn",
    "carousel-forward-bttn",
    giphy.trendingGifs
  );
}

const gifosSearchBox = new GifosSearch({ limit: 12, rating: "r" });
if (gifosCommons.getPage() === "home") {
  gifosSearchBox.setSearchBox(
    giphy.search,
    giphy.autocomplete,
    "search-box",
    "search-autocomplete-box",
    "search-submit-bttn",
    "search-clear-bttn",
    "results-box",
    "grid-box",
    "more-bttn",
    "grid__slide",
    giphy.trendingSearch,
    "trending-search-box"
  );
}

// webcam upload test
if (gifosCommons.getPage() === "create") {
  const videoWebcamPlayback = document.getElementById("video-webcam__playback");
  const videoGifPlayback = document.getElementById("video-gif__playback");

  const webcamRecord = new WebcamRecord(videoWebcamPlayback, 360, 240);
  const bttnRec = document.getElementById("rec");
  const bttnStop = document.getElementById("stop");
  const bttnUpload = document.getElementById("upload");

  bttnRec.onclick = async () => {
    videoWebcamPlayback.style.display = "inline-block";
    videoGifPlayback.style.display = "none";
    await webcamRecord.getStreamAndRecord();
  };

  bttnStop.onclick = () => {
    webcamRecord.stopRecording();
    videoWebcamPlayback.style.display = "none";
    videoGifPlayback.style.display = "inline-block";
    webcamRecord.startPlayback(videoGifPlayback);
  };

  bttnUpload.onclick = async () => {
    videoGifPlayback.src = "";
    videoGifPlayback.style.display = "none";

    let gifId = await giphy.upload(webcamRecord.gifData);
    console.log(`gif id: ${gifId}`);
    const gifURL = await giphy.getGif(gifId);
    console.log(gifURL);
  };
}

// giphy tests;
// let myQuery = {
//   term: "argentina",
//   limit: 12,
//   offset: 0,
//   rating: "r",
// };

// giphy.getGif("bstZCRuT1nucE").then((data) => console.log("giphy id:", data));
