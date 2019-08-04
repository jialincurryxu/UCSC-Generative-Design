function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);
}

function draw() {
    midiPlayer.draw();
}

function onMIDIsLoaded(pianoRolls) {
    let midiAll = new Array;

    //change the munber for the limit of i to use different amount of data
    for (let i=0;i<40;i++){
        midiAll[i] = midiPlayer.pianoRoll2Text(pianoRolls[i]);
    }
    console.log(midiAll)

    let markov = new MarkovChains(midiAll);
    console.log(markov.note);

    let midi = midiPlayer.text2Midi(markov.note);
    let midiData = midiPlayer.parseMidi(midi);
    pianoRoll = midiPlayer.notes2PianoRoll(midiData.duration, midiData.notes);

    midiPlayer.setPianoRoll(pianoRoll, tsCallback);
}


function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}
