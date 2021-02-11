// giphy credentials
import credential from "./config/giphyKey.js";

import { GifosCommons } from "./libs/gifos.js";
import { GiphyAPI } from "./libs/giphy.js";
import { WebcamRecord } from "./libs/webcam.js";

const giphosCommons = new GifosCommons();
const giphy = new GiphyAPI(credential);

// giphy test
// let myQuery = {
//   term: "argentina",
//   limit: 12,
//   offset: 0,
// };

// let resultSearch = giphy.search(myQuery);
// resultSearch.then((data) => console.log("giphy gifs: ", data));
// let resultTrending = giphy.trending();
// resultTrending.then((data) => console.log("giphy trending: ", data));
// let resultSuggestions = giphy.suggestions(myQuery);
// resultSuggestions.then((data) => console.log("giphy suggestions: ", data));

// webcam upload test
const videoWebcamPlayback = document.getElementById("video-webcam__playback");
const videoGifPlayback = document.getElementById("video-gif__playback");

if (videoWebcamPlayback !== null) {
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

const getPage = () => {
  let path = window.location.pathname;
  let page = path.split("/").pop();
  let name = page.split(".").slice(0, -1).join(".");
  return name;
};

console.log(`current page: `, getPage());
