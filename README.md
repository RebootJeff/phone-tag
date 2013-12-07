Phone Tag (working title)
=========

Phone Tag is a smartphone geolocation-based game. Players use the game's map to find enemies to tag and power-ups to grab.

# Contents

- [Usage](#usage)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Gameplay](#gameplay)
- [Development](#development)
  - [Repo Organization](#repo-organization)
  - [Technology Used](#the-technology)
  - [Challenges](#challenges)
  - [Authors](#authors)

# Usage

## Requirements

iOS 6+ or Android 4.0+

## Installation

1. Install PhoneGap.
2. Download/install Xcode for iOS phones or Android SDK for Android phones (this can be tough; blog post pending).
3. Clone the [Phone Tag PhoneGap repo](https://github.com/RebootJeff/phone-tag-phonegap): `git clone https://github.com/RebootJeff/phone-tag-phonegap.git`.
4. Use PhoneGap to build the smartphone app from the cloned repo: `phonegap local build ios(or android)`.
5. Install the app compiled by PhoneGap.
  1. iOS -- PhoneGap has built an Xcode project for you. Open it. Use Xcode to load the app onto your iPhone.
  2. Android -- Use Phonegap to install the app: `phonegap local install android`.

WIP: Installation for Android will be made easy when the Phone Tag dev team gets around to providing download link to give you an APK to install via sideloading.

## Starting a game

1. Get friends. Gather them. Hug them.
2. Make sure your phones' GPS is enabled and well-hydrated.
3. Open Phone Tag on your phones.
4. Enter your screen names. If your screen names aren't unique, Phone Tag will implode in disgust.
5. Tap the `Join` button.
6. Wait for players to join.
7. Game will automatically start when minimum number of players is reached.

(WIP: insert Screenshots for README)

## Gameplay

The objective of the game is to tag players while avoiding getting tagged. Games last 10 minutes. There are no teams. Plot twist: those friends I told you to get in step 1 are actually your enemies. The map helps you find your enemies. The power-ups help you in various ways. Your ability to run is crucial, but your knowledge of the real-life play environment could come in handy. Please do not chase/lure players into busy streets. That's frowned upon with much curvature.

**_Note:_ Gameplay mechanics are constantly being tweaked. Most features, rules, values, and morals are subject to change. "Pecans rule!" is the only constant truth in life.**

### Tagging

- **Range:** To tag an enemy you must be within range and tap the `TAG` button. Tagging range is currently set to **10 meters**. Metric, baby.
- **Cooldown:** When you hit the tag button, you will not be able to attempt another tag for 15 gigantic seconds. I suggest you behave accordingly.
- **Broadcast:** Much like how gunfire notifies nearby ears that a gun has been fired, any time someone hits the tag button, other players may notice because the map will show it. When pondering the reasons to hit your own tag button, consider that you will be revealing your location on the map.
- **Death:** If you are tagged by someone, you will be "dead" for 10 seconds. During this time, you can't tag other players nor pick up power-ups. Sucks to be you. Perhaps now is a good time to run to a new location (towards a power-up, towards an enemy) in hopes of reaching your destination after 10 seconds. After your 10-second death, you will be able to resume playing normally. Life is so good.

(WIP: insert Screenshots for README)

### The Map

You thought your dog was awesome, but the map will be your best friend while playing Phone Tag. You must learn to balance looking up to scan your surroundings for enemies within sight ...versus... looking down at your phone for enemies, power-ups, etc. Consider the following personality traits of the map, which has been nicknamed "The Radar of Insurmountable Glory":
- Enemy position data refreshes every 5 seconds.
- Enemy positions are briefly flashed on the map if they are closer to you. This forces players to spot each other in real life after using the map to get somewhat close to one another.
  - If enemies are >= 150 meters away from you, their positions will be shown for the full 5 seconds until the next refresh.
  - If enemies are < 150 meters away from you, their positions will be shown for a fraction of the 5 seconds until the next refresh. The closer the enemies are, the quicker they disappear from your map during each refresh.
- Power-ups are shown (not flashed) on the map.
- When someone hits their tag button, they reveal their position on the map. If you spot a circle on the map that grows rapidly before vanishing, you just spotted the location of someone who is now in cooldown.

(WIP: insert Screenshots for README)

### Power-Ups

Phone Tag is generous and it loves you. Phone Tag demonstrates its affection for you by randomly placing power-ups on the map. If you run to the power-up, you add it to your `Inventory`. You can carry up to 3 power-ups in your inventory. Tap a power-up in your inventory to activate it (if it must be triggered manually).

- **Invisibility:** Hide yourself from everyone else's maps.
  - Triggered: manually
  - Duration: 20 seconds
- **Invincibility:** If no one can tag you, then no one can stop you. Invincibility also makes you immune to environmental threats. Don't let it get to your head. You're still just a human. Although, humans are pretty cool.
  - Triggered: manually
  - Duration: 20 seconds

(WIP: insert Screenshots for README)

### Environmental Threats

Phone Tag is spiteful and it hates you. Phone Tag will randomly activate monsters, bombs, storms, etc. to harm all players that don't run away quickly enough.

- Pac-Man: WIP. Be afraid. Be very afraid.

(WIP: insert Screenshots for README)

# Development

## Repo Organization

There are 2 repos. There is the [phone-tag](https://github.com/RebootJeff/phone-tag) repo and the [phone-tag-phonegap](https://github.com/RebootJeff/phone-tag) repo. The former contains server files and desktop browser client files (which should be generally be ignored). The latter contains files for a PhoneGap-generated client.

### phone-tag repo

- app: (WIP)
  - controllers: (WIP) user authentication
  - models: (WIP) MongoDB schema
  - views: HTML meant for desktop browser client
- config: middleware setup, API, and other server settings
  - socket: server-side game logic and socket 
- public: front-end files for desktop browser client (maintenance of PhoneGap-based client takes priority over maintenance of this folder)
- test: server-side tests
- `server.js`: starts the server
- 
### phone-tag-phonegap repo

- .cordova, platforms, plugins: folders for PhoneGap to munch on
  - platforms/AndroidManifest.xml: most files in the 3 folders listed above don't need tweaking, but this one did (for location-related permissions)
- www: source code/files
  - img: folder for icons
  - js: app source code
    - collections: Backbone collections
    - models: Backbone models (client's game logic)
    - routers: Backbone router
    - templates: HTML templates as js files (to work around an issue of using RequireJS in PhoneGap)
    - views: Backbone views (user interaction via Hammer.js)
    - `main.js`: RequireJS configuration + Backbone app bootstrapper
  - res: app branding
  - spec: default PhoneGap testing files
  - styles: CSS and Stylus source code
  - `config.xml`: PhoneGap smartphone app settings
  - `index.html`: Client starter (open a socket + load code via RequireJS)

## The Technology

### Tech Stack

- **Backbone**: client-side framework
- **jQuery**: DOM manipulator
- **Hammer.js**: touchscreen event library
- **Lodash**: utility library
- **RequireJS**: code/dependency manager
- **Node.js**: server-side app platform
  - **Express**: server-side framework
- **Socket.io**: real-time, event-driven, client-server comms
- **Stylus**: CSS pre-processor

### Dev Tools

- **FRIGGIN' PHONEGAP**: smartphone app builder (so hard to set up; so powerful after setup)
- **git**: version control magician
- **npm**: package commander-in-chief for back-end libraries
- **Bower**: package commander-in-chief for front-end libraries
- **Heroku**: server

## Challenges

- Dev workflow for mobile development is far less straightforward than developing for a desktop browser.
  - Running code in the desktop browser requires running a local server to act like a client proxy (unusual) while running another local server to act as the back-end (per usual).
  - Many things will go wrong when setting up PhoneGap. PhoneGap setup is the counter-balance to the fun experienced for the rest of the dev process.
- Deciding which game logic belongs on the client and which game logic belongs on the server led to many debates within the dev team.
- Making decisions about game mechanics still results in many battles within the dev team, but we keep it civil because we're gentlemen.

## Authors

1. [Leighton Kaina](https://github.com/lkaina)
2. [Ryan Roxas](https://github.com/rohaus)
3. [Ken Huh](https://github.com/Ken123777)
4. [Jeff Lee](https://github.com/RebootJeff)
