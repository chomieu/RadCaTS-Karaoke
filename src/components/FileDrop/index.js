import React from 'react';
import jDataView from 'jdataview';
// import Main from './js/main';


function FileDrop() {

    // TODO: Play song.
    function fileSelectHandler(e) {
      // cancel event and hover styling
      // fileDragHover(e);
  
      var droppedFiles = e.target.files || e.dataTransfer.files;
      console.log( "droppedFiles", droppedFiles );
  
      var reader = new FileReader();
  
      reader.onload = function(fileEvent) {
        var data = fileEvent.target.result;
        console.log( "data", data );
        initAudio(data);
        // showData(this.result);
      };
  
      // http://ericbidelman.tumblr.com/post/8343485440/reading-mp3-id3-tags-in-javascript
      // https://github.com/jDataView/jDataView/blob/master/src/jDataView.js
  
      reader.readAsArrayBuffer(droppedFiles[0]);
    }

    function initAudio(data) {

      var context = new (window.AudioContext || window.webkitAudioContext)();
      console.log( "context", context );
      var source;
      if (source) source.stop(0);
  
      source = context.createBufferSource();
  
      if (context.decodeAudioData) {
        context.decodeAudioData(data, function (buffer) {
          source.buffer = buffer;
          createAudio( source, context );
        }, function (e) {
          console.error(e);
        });
      } else {
        source.buffer = context.createBuffer(data, false);
        createAudio( source, context );
      }
    }

    function createAudio( source, context ) {
      var processor,
        filterLowPass,
        filterHighPass,
        mix,
        mix2;
      // create low-pass filter
      filterLowPass = context.createBiquadFilter();
      source.connect(filterLowPass);
  
      filterLowPass.type = 'lowpass';
      filterLowPass.frequency.value = 120;
  
      // create high-pass filter
      filterHighPass = context.createBiquadFilter();
      source.connect(filterHighPass);
      filterHighPass.type = 'highpass';
      filterHighPass.frequency.value = 120;
  
      // create the gain node
      mix = context.createGain();
  
      mix2 = context.createGain();
      source.connect(mix2);
      mix2.connect(context.destination);
  
      mix.gain.value = 1;
      mix2.gain.value = 0;
  
      // create the processor
      processor = context.createScriptProcessor(2048 /*bufferSize*/ , 2 /*num inputs*/ , 1 /*num outputs*/);
  
      // connect everything
      filterHighPass.connect(processor);
      filterLowPass.connect(mix);
      processor.connect(mix);
      mix.connect(context.destination);
  
      // connect with the karaoke filter
      processor.onaudioprocess = karaoke;
  
      // playback the sound
      source.start(0);
  
      // setTimeout(disconnect, source.buffer.duration * 1000 + 1000);
    }

    function karaoke(evt) {
      var inputL = evt.inputBuffer.getChannelData(0),
        inputR = evt.inputBuffer.getChannelData(1),
        output = evt.outputBuffer.getChannelData(0),
        len = inputL.length,
        i = 0;
      for (; i < len; i++) {
        output[i] = inputL[i] - inputR[i];
      }
    }

    console.log( "jDataView", !!jDataView );
    console.log( "FileReader", !!FileReader );

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "/path/to/resource.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //   return () => {
    //       document.body.removeChild(script);
    //     }
    // }, []);

    return (
        <div className="main">
        <p>Do you like Karaoke? Take a music file and drag it here. If you are lucky, you will listen the song without vocals.</p>
  
        <div id="filedrag">Drop your MP3 file here (also .ogg or .wav)</div>
        <div id="fileselect-container">
          <label htmlFor="fileselect">Or select a file:</label>
          <input onChange={ fileSelectHandler } type="file" id="fileselect" name="fileselect[]"/>
        </div>
  
        <div id="current-song"></div>
        <div id="options">
          Options:
          <button id="disable-filter">Disable karaoke</button>
        </div>
  
        <p>If you don't have any file at hand, <a id="demo-audio" href="#"><strong>click here for a demo</strong></a> of <a href="http://www.jamendo.com/en/track/1074874/happy">Happy by MMO</a>.</p>
  
        <h2>How it works</h2>
        <p>By using the Web Audio Javascript API, the file is processed locally in your browser and voice is removed. Check out the <a href="https://github.com/JMPerez/karaoke">project on Github</a> for more information. No Flash was used to develop this.</p>
      </div>
    )
}

export default FileDrop;