// hi Jerry!  Have a great day!

$(document).ready(function() {
	// some info for the song happy birthday.  Took me longer to figure out the timing of the notes, than it did to write the code! :)
	var happyBirthday = {
			notes: [ 'C','C','D','C','F','E','C','C','D','C','G','F','C','C','C#','A','F','E','D','C#','C#','A','F','G','F' ],
			// index 0 is wait lenth before first note should be played. index 1 is lenth of first note.  index 2 is wait after first note.  etc...
			times: [ 1800, 400, 30,  400, 30,  800, 30,  800, 30,  800, 30,  1600, 30,  400, 30,  400, 30,  800, 30,  800, 30,  800, 30,  1600, 30,  400, 30,  400, 30,  800, 30,  800, 30,  800, 30,  800, 30,  800, 30,  400, 30,  400, 30,  800, 30,  800, 30,  800, 30,  1600, 0 ]
	};

	var twinkleTwinkle = {
			notes: [ 'C','C','G','G','A','A','G','F','F','E','E','D','D','C','G','G','F','F','E','E','D','G','G','F','F','E','E','D','C','C','G','G','A','A','G','F','F','E','E','D','D','C' ],
			times: [ 1800, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 800, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 800, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 800, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 800, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 800, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 400, 30, 800, 0 ]
	};

	var saintsGoMarchingIn = {
		notes: [ 'C','E','F','G','C','E','F','G','C','E','F','G','E','C','E','D','E','E','D','C','C','E','G','G','G','F','E','F','G','E','C','D','C' ],
		times: [ 1800, 400, 30, 400, 30, 400, 30, 1600, 230, 400, 30, 400, 30, 400, 30, 1600, 230, 400, 30, 400, 30, 400, 30, 800, 30, 800, 30, 800, 30, 800, 30, 1600, 30, 800, 30, 400, 30, 400, 30, 800, 30, 800, 30, 800, 30, 800, 30, 400, 30, 1200, 30, 800, 30, 400, 30, 400, 30, 800, 30, 800, 30, 800, 30, 800, 30, 1600, 30, 400, 0 ]
	}

	// audio processing interface stuff that can play me some beats!
	var context = new AudioContext();
	var oscillator = context.createOscillator();
	oscillator.connect(context.destination);
	oscillator.frequency.value = 0;
	oscillator.start();

	// input : single note, like 'E'
	// output : frequency in Hz near middle C, like 659
	var noteToFreq = function(note) {
		var freq;
		switch (note) {
			case 'C':
				freq = 523;
				break;
			case 'D':
				freq = 587;
				break;
			case 'E':
				freq = 659;
				break;
			case 'F':
				freq = 698;
				break;
			case 'G':
				freq = 785;
				break;
			case 'A':
				freq = 880;
				break;
			case 'B':
				freq = 988;
				break;
			case 'C#':
				freq = 1047;
				break;
			default:
				freq = 0;
				break;
		}
		return freq;
	}

	var setFreq = function(freq) {
		oscillator.frequency.value = freq;
		$("#freqDisplay").val(freq + "Hz");
		$("#freqSlider").val(freq);
	}

	$("#freqSlider").bind("input", function() {
		var freq = $("#freqSlider").val();
		oscillator.frequency.value = freq;
		$("#freqDisplay").val(freq + "Hz");
	});

	$("#freqDisplay").bind("keyup", function() {
		var freq = Math.max(Math.min(parseInt($("#freqDisplay").val(), 0), 2600), 0);
		oscillator.frequency.value = freq;
		$("#freqSlider").val(freq);
	});

	$("#stfu").click(function() {
		oscillator.stop();
	});

	$("#waveType").change(function() {
		oscillator.type = $('#waveType').val();
	});

	var playNote = function(note) {
		setFreq(noteToFreq(note));
	};

	var playSong = function(song) {
		var notes = song.notes;
		var times = song.times;
		var iN = 0;
		var iT = 1;
		function loopWithDelay() {
			if(notes.length > 0) {
				if(iT % 2 == 1) {
					var note = notes[iN];
					playNote(note);
					iN++;
				} else {
					setFreq(0);
				}
				if( iN <= notes.length ){
					setTimeout(loopWithDelay, times[iT++]);
				} else {
					setFreq(0);
				}
			}
		}
		if(times.length > 0) {
			setTimeout(loopWithDelay, times[0]);
		}
	}

	// play happy birthday
	playSong(happyBirthday);
});
