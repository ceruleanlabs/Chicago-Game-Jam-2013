# Chicago Game Jam 2013

&lt;it's a metaphor for death&gt;

**Playable URL:** https://ceruleanlabs.github.io/Chicago-Game-Jam-2013/

**Created By:** This game was made by Thomas Jacobs, Kevin Folk, Tom Berg and Dan Bergren

**Technologies Used:** [Crafty.js](http://craftyjs.com/), [CodeIgniter](http://ellislab.com/codeigniter)

## Prereqs

- [Node](https://nodejs.org/en/)
- [nodenv](https://github.com/nodenv/nodenv)
  - `$ nodenv install`

## Setup

    $ nodenv install
    $ npm install

## Development

    $ gulp server

Then head to [localhost:8080](http://localhost:8080). Magic!

## Build

This will create a production-ready static site in the `dist` directory.

    $ gulp build

## Deploy

Deploys will always try to `build` first.

    $ gulp deploy
