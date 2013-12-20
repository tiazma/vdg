// Copyright (C) 2013  tiazma

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

function $_GET(q, s) {
  s = s ? s : window.location.search;
  var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i');
  return (s=s.replace('\?','&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined;
} 


$(document).ready(
  function() {

    var song_id =  $_GET('song_id');
    $.getJSON( "media/" + song_id + '.json',
      function(json) {

        // Load tracks
        debugger;
        $("#playerA > source").attr('src', './media'+json.track_a_filename);
        // Load images

        alert( "JSON Data: " + json.song_title);
      });
    console.log(song_id);

    // Create buttons
    $( "button#play").button({
      icons: {
          primary: "ui-icon-play"
        },
      text: false
    });
    $( ".mute").button({
      icons: {
          primary: "ui-icon-volume-on"
          },
        text: false
    });

    // Create slider A and related amount
    $( "#volumeA" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 100,
      slide: function( event, ui ) {
        $( "#amountA" ).val( ui.value );
        $("#playerA")[0].volume = (ui.value / 100);
      }
    });
    $( "#amountA" ).val( $( "#volumeA" ).slider( "value" ) );

    // Create slider B and related amount
    $( "#volumeB" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 100,
      slide: function( event, ui ) {
        $( "#amountB" ).val( ui.value );
        $("#playerB")[0].volume = (ui.value / 100);
      }
    });
    $( "#amountB" ).val( $( "#volumeB" ).slider( "value" ) );

    // Activate tooltip on attribute with title element
    // $(document).tooltip(); 

    // Control logic
    $( ".control").click(
      function() {
        var players = $('audio');
        switch(this.id) {

          case "play":
            players[0].play();
            players[1].play();
            $(this).button({
              icons: {
                primary: "ui-icon-pause"
              }
            });
            this.id = "pause";
            break;

          case "pause":
            players[0].pause();
            players[1].pause();
            $(this).button({
              icons: {
                primary: "ui-icon-play"
              }
            });
            this.id = "play";
            break;
        }

      }
    ); 
    
    // Mute logic
    $( ".mute").click(
      function() {
        var player = null;
        switch(this.id) {
          case "muteA":
            player = $('#playerA');
            break;
          case "muteB":
            player = $('#playerB');
            break;
        }
        switch(this.value) {

          case "on":
            player[0].volume = 0;
            $(this).button({
              icons: {
                primary: "ui-icon-volume-off"
              }
            });
            this.value = "off";
            break;

          case "off":
            player[0].volume = 1;
            $(this).button({
              icons: {
                primary: "ui-icon-volume-on"
              }
            });
            this.value = "on";
            break;

        }
      }
    );   

    // Handle deck info display
    $(".deck_info").hover(
      function() {
        $(this).animate({
          margin: 0,
          height: 277,
        });
      },
      function() {
        $(this).animate({
          "margin-top": 227,
          height: 50,
        });
      }
    );
  }
);