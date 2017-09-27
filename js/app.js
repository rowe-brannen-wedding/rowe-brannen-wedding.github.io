const app = {}

app.description = 'Jason and Kathleen\'s Wedding Site!'

app.setBg = function() {
    var win = $(window);
    var win_w = win.width(),
        win_h = win.height(),
        $bg    = $("#bg");

    // Load narrowest background image based on 
    // viewport width, but never load anything narrower 
    // that what's already loaded if anything.
    var available = [
      480, 960, 1280, 1440, 1920
    ];

    var current = $bg.attr('src').match(/([0-9]+)/) ? RegExp.$1 : null;

    if (!current || ((current < win_w) && (current < available[available.length - 1]))) {

      var chosen = available[available.length - 1];

      for (var i=0; i<available.length; i++) {
        if (available[i] >= win_w) {
          chosen = available[i];
          break;
        }
      }

      // Set the new image
      $bg.attr('src', '../resources/background-' + chosen + '.png');

      // for testing...
      setTimeout(() => {document.getElementById("under-construction").innerHTML = 'Chosen background: ' + chosen;},5000)

    }

    // Determine whether width or height should be 100%
    if ((win_h / win_w) > 1) {
      $bg.css({height: win_h + 60, width: 'auto'});
    } else {
      $bg.css({width: win_w + 60, height: 'auto'});
    }

}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
//     document.body.style.background = "url('../resources/background-480.png') no-repeat center center fixed"
    // document.body.style.height = "100vh"
    document.getElementById("under-construction").innerHTML = "Thanks for visiting from a mobile browser!"
    app.setBg()
} else {
    $("#bg").attr('src', '../resources/background-1920.png');
}

$(window).on('resize', app.setBg())
