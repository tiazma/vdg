VDG
===

Vent de Guitare / Full HTML5 CSS3 Dual Tracks Player

Summary
-------

This application is a HTML5 dual audio tracks player. It's designed to work 
out-of-the-box, without integration in some CMS. 

Concept
-------

The player.xml provides the basic structure. When loaded with `song_id` GET 
variable, `vdg_player.js` takes care of building the two decks (tracks, 
pictures, titles, descriptions, etc) based on the `song_id` value JSON file.

Let's picture it with an exemple :

  1 - The user types this url in his browser::

      http://www.domain.tld/blablala/vdg_player.xml?song_id=WINDYWORLD

  2 - While the page is loading, the JSON data file is downloaded from the media 
  folder, with this url : http://www.domain.tld/blablala/media/WINDYWORLD.json

  3 - The javascript parses the data from the JSON file, replaces it in the 
  player and triggers some logic.


JSON data structure
-------------------

There shound be one JSON file for each song you want mix. Each JSON file should
respect the following structure::

    {
        // Used for page's title. Not mandatory.
        "song_title": "Windy world",
        // Used for meta `description`. Not mandatory.
        "song_description": "Une description",
        // Data for deck A
        "A": {
            // Base file name, will be used with .mp3 and .ogg to recover the tracks
            "filename": "WINDYWORLD_VDG_LOW",
            // Track's title
            "title": "Instruments played by the wind",
            // Track's descritption
            "description": "Alors lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, vero, rem, nesciunt, praesentium corporis saepe enim nihil aperiam et quidem eveniet libero consectetur repudiandae vel quisquam tempora iure laborum quibusdam.",
            // Track's picture : leave the value empty if you want use the fallback one
            "picture": "WINDYWORLD_VDG.png"
        },
        // Data for deck B
        "B": {
            // Base file name, will be used with .mp3 and .ogg to recover the tracks
            "filename": "WINDYWORLD_RY_LOW",
            // Track's title
            "title": "Composition",
            // Track's descritption  
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, vero, rem, nesciunt, praesentium corporis saepe enim nihil aperiam et quidem eveniet libero consectetur repudiandae vel quisquam tempora iure laborum quibusdam.",
            // Track's picture : leave the value empty if you want use the fallback one
            "picture": "WINDYWORLD_RY.png"

        }

    }

Media files
-----------

For each song, both of the tracks should be in MP3 and OGG format, for 
compatibility reasons. You have to provide a picture for each of your track. If
you don't, the fallback picture will be used. The recommended format is PNG, 
with a ratio of 380x285.
Your `media` folder should look like this:: 

    [...]
    ├── media
    │   ├── WINDYWORLD.json
    │   ├── WINDYWORLD_VDG.mp3
    │   ├── WINDYWORLD_VDG.ogg
    │   ├── WINDYWORLD_VDG.png
    │   ├── WINDYWORLD_RY.mp3
    │   ├── WINDYWORLD_RY.ogg
    │   └── WINDYWORLD_RY.png
    [...]
