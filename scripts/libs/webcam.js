class WebcamRecord {
  constructor(playback, width, height) {
    this.playback = playback;
    this.stream;
    this.recorder;
    this.file;

    this.constraints = {
      audio: false,
      video: { width, height },
    };

    this.configuration = {
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
      alert("No se puede iniciar la cámara. Revise la consola");
      console.error(err);
    }
  };

  startRecording = () => {
    this.playback.srcObject = this.stream;
    this.recorder = RecordRTC(this.stream, this.configuration);
    this.recorder.startRecording();
  };

  // FIXME: UNABLE TO SEND BLOB
  stopRecording = () => {
    this.recorder.stopRecording();
    let form = new FormData();
    form.append("file", this.recorder.getBlob(), "myGif.gif");
    this.file = form.get("file");
  };
}

export { WebcamRecord };
