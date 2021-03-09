# RadCaTS Karaoke

## Table of Contents
1. [Description](#description)
2. [Authors](#authors)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Deployed](#deployed)
7. [Contributing](#contributing)
8. [Tests](#tests)
9. [License](#license)
## Description
A full-featured social karaoke app that dynamically loads content using the YouTube Music API, allows for custom lyric file generation, provides a hub for group sessions, and incorporates 3D elements. Built for the University of Washington's Winter 2020/21 Coding Bootcamp.

## Authors

| Name | Email  | Github  | LinkedIn |
| :--: | :----: | :-----: | :------: |
| Samuel Fox | samueljasonfox@gmail.com | [![Github](./assets/github.png)](https://github.com/samuelfox1) | [![LinkedIn](./assets/linkedin.png)](https://www.linkedin.com/in/samuel-fox-tacoma/) |
| Timothy M. Keller | timothy.m.keller@gmail.com | [![Github](./assets/github.png)](https://github.com/tmkeller) | [![LinkedIn](./assets/linkedin.png)](https://linkedin.com/in/tim-keller-3ab55bb1/) |
| Chomie Usaneerungrueng | chomieu@gmail.com | [![Github](./assets/github.png)](https://github.com/chomieu) | [![LinkedIn](./assets/linkedin.png)](https://www.linkedin.com/in/chomieu/) |
| Rita Zhu | xiaoyz28@uw.edu | [![Github](./assets/github.png)](https://github.com/zhuxiaoyu1019) | [![LinkedIn](./assets/linkedin.png)](https://www.linkedin.com/in/rita-z-2495b01a1//) |
<br>

## Technologies
![javascript](https://img.shields.io/badge/javascript-85%25-yellow)
![css](https://img.shields.io/badge/css-11%25-purple)
![html](https://img.shields.io/badge/html-3.9%25-orange)

### Notable Dependencies
- Axios: For querying the API backend.
- Express: Runs the group session server.
- jDataView: Simplifies binary file reading for audio signal processing.
- Materialize: Front-end CSS framework.
- Moment: For date and time objects.
- React: Front-end framework/library
- React Speech Recognition: Speech recognition API for scoring singer accuracy.
- React Three Fiber: A rendering library to simplify React integration with 3D elements built with Three.js.
- RXJS: Provides async functionality for the useMousePosition utility.
- Three: NPM package for Three.js, a 3D graphics library for WebGL.

## Installation
This is the frontend repository. Clone from git into your chosen directory and install dependencies with npm i. Frontend, backend, and session server are located in separate repositories and should be run on separate servers. The backend requires a local MongoDB installation. All can be run with npm start.
- [Frontend Repository](https://github.com/chomieu/RadCaTS-Karaoke) 
- [Backend Repository](https://github.com/chomieu/RadCaTS-Karaoke-API)
- [Server Repository](https://github.com/chomieu/RadCaTS-Karaoke-Server)

## Usage
The landing page will prompt the user to create or sign in with login credentials. 

![screenshot1](./assets/screen1.png)

Next you will be prompted to find a song. This page searches our Cloudinary storage for matches to the user input, then loads it or attempts to download it if not there. 

![screenshot2](./assets/screen2.png)

Next you will be prompted to choose a lyrics file...

![screenshot3](./assets/screen3.png)

...or generate one if there is none present.

![screenshot4](./assets/screen4.png)

Finally, the user moves to the actual session where the play button controls music playback and lyrics are displayed onscreen.

![screenshot5](./assets/screen5.png)

Other users can join this session by entering the session URL, and the site provides functionality to share URLs with other users through email.

## Deployed
- [Frontend (user) site](https://radcats-karaoke.herokuapp.com) 
- * username: radcat
- * password: password
- [Backend API routes](https://radcats-karaoke-api.herokuapp.com)
- [Socket.io server](http://radcats-karaoke-server.herokuapp.com/)

## Contributing
Fork our git, and contact the repository owner about pull requests.

## Tests
No testing suite is designated at this time.

## License
No license is provided for this software
