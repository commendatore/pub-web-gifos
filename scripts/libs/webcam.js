class WebcamRecord {
  constructor(playVideo, width, height) {
    this.playVideo = playVideo;
    this.stream;
    this.recorder;
    this.gifData;

    this.constraints = {
      audio: false,
      video: { width, height },
    };

    this.config = {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
    };
  }

  getStreamAndRecord = async () => {
    await this.captureCamera();
    this.startRecording();
  };

  captureCamera = async () => {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    } catch (err) {
      alert("No se puede iniciar la cámara, revise la consola.");
      console.error(err);
    }
  };

  saveGifData = () => {
    const form = new FormData();
    form.append("file", this.recorder.getBlob(), "myGifOS.gif");
    console.log(form.get("file"));
    this.gifData = form;
  };

  startRecording = () => {
    this.playVideo.srcObject = this.stream;
    this.playVideo.play();
    this.recorder = RecordRTC(this.stream, this.config);
    this.recorder.startRecording();
  };

  stopRecording = () => {
    this.recorder.stopRecording(this.saveGifData);
    this.playVideo.srcObject = null;
    this.recorder = null;
  };

  startPlayback = (playGif) => {
    playGif.src = URL.createObjectURL(this.gifData.get("file"));
  };
}

export { WebcamRecord };
