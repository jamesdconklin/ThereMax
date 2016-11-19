# ThereMax

[Live Site @ GitHub Pages](https://jamesdconklin.github.io/ThereMax)

[Project Site @ GitHub](https://github.com/jamesdconklin/ThereMax)

ThereMax is an engaging in-browser synthesizer inspired by the theremin
and by oscilloscopes. It translates touches or clicks upon a grid to a
multitude of sinusoidal tones and waveforms. The app is developed in
JavaScript, working on a vanilla HTML5 canvas, in a minimal HTML/CSS
structure.

## Features/"Pages"
 - Landing/Instructions
 - Instrument grid

### Instructions/Welcome

![landing]

The landing page is a simple div covering the canvas and providing instructions on how to use the interface. Pressing space or clicking or
tapping the high-tech power button on the panel below the screen toggles
a class to toggle whether or not the instruction screen renders. Nothing
fancy.

### Synthesizer Interface

Clicking or touching on the synthesizer screen generates a tone and
renders an appropriate waveform. The x axis controls pitch, from about
100 Hz on the left to 1600Hz on the right, increasing exponentially.

#### Rendering the Wave.

Rendering the wave is simple. Each draw cycle, we increment a scroll
value to move the wave along, and add sine function values for each
`Control` node to calculate the summed sine value for each point as
we iterate through the grid's x range. Then we simply call the canvas
`lineTo` method to draw the resulting function.

```js
// drawing the waveform
ctx.beginPath();
ctx.moveTo(0, this.sin(0));

for (var i = 0; i <= this.viewWidth; i += 5) {
  ctx.lineTo(i, this.sin(i));
}
```

```js
// Calculating composite sine function values.
sin(x) {
  let norm = this.allControls().length;
  return this.allControls().reduce(
    (acc, el) => {
      let xMult = 4 * Math.PI * (1 + el.pos[0] * 15) / Math.pow(this.viewWidth, 2);
      let yMult = Math.max(0, 0.5 * (this.viewHeight - el.pos[1])/norm);
      return acc + yMult * Math.sin(this.scroll + xMult * x);
    },
    this.viewHeight/2
  );
}
```

Note: there are some extra multipliers in the composite sine function.
They are largely to make it look better, though the overall frequencies
and amplitudes still closely model the tone played.

The result is simple and beautiful:

![waveform]

#### Interfacing with the App

The basic control mechanism builds a `Control` object on the canvas.
Each `Control` object provides an `isClicked` function to support click
and touch detection, a `draw(ctx)` to render it visually, and a `move`
method to change its position. Each `Control` also contains a `Note`
object encapsulating an AudioContext oscillator whose pitch and volume
`shift` whenever the containing `Control` moves, i.e in response to
`TouchMove` and `MouseMove` events.


#### Touch Support

I built this specific project because I had a touchscreen laptop I was
dying to learn to use, so the screen will detect multiple touches, map a
tone to each, and render a matching composite wave.

![multi]

I had a solid understanding of implementing drag and drop with MouseUp,
-Down, and -Move listeners. Touch events, containing a list of touches
instead of one click position, proved a little trickier. I had to make
a best guess as to which touch corresponded to which element, and
made efforts to reconcile positioning whenever an element or toch became orphaned:

```js
handleTouchMove(e) {
  ...
  let posArray = this.touchMap(e);
  let unmatchedPos = [];
  let matchedEls = [];
  let el;
  for (var i = 0; i < posArray.length; i++) {
    if ((el = this.getClicked(posArray[i], false))) {
      // We're still touching the control. Center it on our current pos.
      matchedEls.push(el);
      el.move(posArray[i]);
    } else {
      // Add unmatched touch position to list of orphans.
      unmatchedPos.push(posArray[i]);
    }
  }
  // create list of orphaned, active controls.
  let unmatchedEls = this.allControls().filter((u) => u.dragged && matchedEls.indexOf(u) < 0);
  // Stop moving orphaned controls and deactivate the ephemeral ones.
  while (unmatchedEls.length > unmatchedPos.length) {
    el = unmatchedEls.shift();
    el.dragged = false;
    (this.controls.indexOf(el) < 0) && el.stop();
  }
  // create new ephemeral touch conctrols for orphaned touch positions.
  while (unmatchedPos.length > unmatchedEls.length) {
    this.touches.push(new Ephemeral({dragged: true, grid: this, pos: unmatchedPos.shift()}));

  }
  // match any remaining orphans with each other.
  for (i = 0; i < unmatchedEls.length; i++) {
    unmatchedEls[i].move(unmatchedPos[i]);
  }
}
```

#### Mouse-Only Support

While the touch support was pretty nifty, not everyone has a touch
screen to muck around with. To address this, I divide `Control`s into
`Ephemeral` touch controls, which only live for as long as they're
matched to continuing `TouchEvent`s, and `Knob`s, permanent
`Control` objects rendered as control knobs on the bottom panel. These
control knobs can be dragged onto the screen, where they will play a
`Note` as usual and contribute to the `drawWave` method.

![drag]

[landing]: ./docs/screens/landing.png
[waveform]: ./docs/screens/waveform.png
[multi]: ./docs/screens/multi.png
[drag]: ./docs/screens/drag.png

## Future Improvements:

First on the table is allowing resizing the window without a reload. 
As it is right now, the layout works for a bevy of window sizes, 
but the canvas size does not readjust on rotate or resize. 

I'd like to figure out how to guarantee proper display on mobile
devices, including smooth handlers for autorotations. As it is,
it displays okay in portrait mode on the phones I've tried, though
those phones' speakers could not play the lower notes on the range. 

I'd like to implement an option for for different sound (and thus 
waveform) shapes. The options supported by `AudioContext`, i.e. 
triangle and square waves, will be easy to do in terms of the 
`Note` and harder to work into the rendering scheme.

Later, I may move beyond `AudioContext` to allow pitch and volume control
of arbitrary base tones. I do not believe the current rendering framework will work for such, and I will need to move from rendering based on a
similar function to rendering based directly on the generated audio, and
I will likely need to employ an external library.
