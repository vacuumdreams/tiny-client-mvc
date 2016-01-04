#MARFEEL javascript task

to run a dev build, you guys need to have the following tools installed globally:

- node.js & npm
- bower (npm install -g bower)
- karma (npm install -g karma-cli)
- gulp (npm install -g gulp)

## tests

couldn't complete all the test cases unfortunately, never used jasmine (or any other testing framework, for thet matter), so you'll probably meet the lamest test cases ever

tests can be run by the following command:

- npm test

## gulp build

instead of require.js I've used browserify. I belive require.js can be useful with it's async load approach for [R.A.I.L](https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/rail?hl=en) type of projects, but this time we can probably get away with loading a well concatinated and modularized js file instead of making multiple (quite expensive) ajax requests, and I consider browserify's build process is much more easier to work with. here's a really good read about [require.js vs browserify.](http://benmccormick.org/2015/05/28/moving-past-requirejs/)

I've spent quite a while on playing around with babel.js and the es6 syntax, just to combine doing this task and learning something new and interesting.

to run a build, first you'll need to install the bower components:

- bower install

then you can run gulp to wire it all up:

- gulp



