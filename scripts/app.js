// giphy credentials
import credential from "./config/giphyKey.js";

import { GifosCommons } from "./libs/gifos.js";
import { GiphyApi } from "./libs/giphy.js";
import { WebcamRecord } from "./libs/webcam.js";

const giphosCommons = new GifosCommons();
const giphy = new GiphyApi(credential);

// giphy test
let myQuery = {
  term: "sol",
  limit: 12,
};

let resultSearch = giphy.search(myQuery);
resultSearch.then((data) => console.log("giphy gifs: ", data));
let resultTrending = giphy.trending();
resultTrending.then((data) => console.log("giphy trending: ", data));
let resultSuggestions = giphy.suggestions(myQuery);
resultSuggestions.then((data) => console.log("giphy suggestions: ", data));

// webcam upload test
const webcamVideoPlayback = document.getElementById("webcam-video__playback");
if (webcamVideoPlayback !== null) {
  const webcamRecord = new WebcamRecord(webcamVideoPlayback, 360, 240);

  webcamRecord.captureCamera();
  document.getElementById("rec").onclick = () => webcamRecord.startRecording();
  document.getElementById("stop").onclick = () => {
    webcamRecord.stopRecording();
    // FIXME: UNABLE TO SEND BLOB
    // giphy.upload(webcamRecord.file);
  };
}
