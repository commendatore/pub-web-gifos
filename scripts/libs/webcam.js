class WebcamRecord {
  constructor(playvideo, width, height) {
    this.playvideo = playvideo;
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
    this.playvideo.srcObject = this.stream;
    this.recorder = RecordRTC(this.stream, this.config);
    this.recorder.startRecording();
  };

  stopRecording = () => {
    this.recorder.stopRecording(this.saveGifData);
    this.playvideo.srcObject = null;
    this.recorder = null;
  };

  startPlayback = (playgif) => {
    playgif.src = URL.createObjectURL(this.gifData.get("file"));
  };
}

export { WebcamRecord };
