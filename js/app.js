function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}


function setBg() {

  let win = $(window);
  let win_w = win.width(),
    win_h = win.height(),
    $bg = $("#bg");

  // Load narrowest background image based on 
  // viewport width, but never load anything narrower 
  // that what's already loaded if anything.
  let available = [
    480, 960, 1280, 1440, 1920
  ]

  let current = $bg.attr('src').match(/([0-9]+)/) ? RegExp.$1 : null
  let chosen

  chosen = available[available.length - 1]

  for (let i = 0; i < available.length; i++) {
    if (available[i] >= win_w) {
      chosen = available[i]
      break
    }
  }

  // Set the new image
  $bg.attr('src', '../resources/background-' + chosen + '.jpg')

  // for testing...
  // document.getElementById("under-construction").innerHTML = 'Chosen background: ' + chosen;

  let adjustedImageWidth = ((win_h + 180) * 16) / 10
  let sideAdjustment = Math.abs((adjustedImageWidth - window.innerWidth) / 2)

  $bg.css({
    minHeight: win_h + 180,
    // position: 'absolute',
    margin: 'auto',
    left: -sideAdjustment + 'px',
    right: -sideAdjustment + 'px',
    top: 0,
  })

}



if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  // document.getElementById("under-construction").innerHTML = "Thanks for visiting from a mobile browser!"
  setBg()
} else {
  setBg()
}

$(window).resize(() => {
  setBg()
})
screen.onorientationchange = () => {
  setBg()
}

appViewModel = function () {
  const self = this
  self.description = 'Jason and Kathleen\'s Wedding Site!'
  self.currentPage = ko.observable('HOME')
  self.content = ko.observable()
  self.photoGallery = ko.observableArray([
    {
      src: 'img/DSC03048e.jpg',
      w: 1024,
      h: 1536
    },
    {
      src: 'img/DSC03057e.jpg',
      w: 1024,
      h: 683
    },
    {
      src: 'img/DSC03061e.jpg',
      w: 1024,
      h: 683
    },
    {
      src: 'img/DSC03064e.jpg',
      w: 1024,
      h: 683
    },
    {
      src: 'img/DSC03066e.jpg',
      w: 1024,
      h: 683
    },
    {
      src: 'img/DSC03073e.jpg',
      w: 1024,
      h: 683
    },
    {
      src: 'img/DSC03078e.jpg',
      w: 1024,
      h: 1536
    },
    {
      src: 'img/DSC03155e.jpg',
      w: 1024,
      h: 1536
    },
    {
      src: 'img/DSC03167e.jpg',
      w: 1024,
      h: 819
    },
    {
      src: 'img/DSC03196e.jpg',
      w: 1024,
      h: 819
    },
    {
      src: 'img/DSC03229e.jpg',
      w: 1024,
      h: 1280
    },
    {
      src: 'img/DSC03254e.jpg',
      w: 1024,
      h: 1536
    },
    {
      src: 'img/DSC03280e.jpg',
      w: 1024,
      h: 1536
    },
    {
      src: 'img/DSC03313e.jpg',
      w: 1024,
      h: 819
    },
    {
      src: '/img/fb1.jpg',
      w: 720,
      h: 960
    },
    {
      src: '/img/fb2.jpg',
      w: 1632,
      h: 920
    },
    {
      src: '/img/fb3.jpg',
      w: 852,
      h: 1136
    },
    {
      src: '/img/fb4.jpg',
      w: 720,
      h: 960
    },
    {
      src: '/img/fb5.jpg',
      w: 960,
      h: 640
    },
    {
      src: '/img/fb6.jpg',
      w: 960,
      h: 720
    },
    {
      src: '/img/fb7.jpg',
      w: 2048,
      h: 1365
    },
    {
      src: '/img/fb8.jpg',
      w: 1536,
      h: 2048
    },
    {
      src: '/img/fb9.jpg',
      w: 1080,
      h: 1080
    },
    {
      src: '/img/fb10.jpg',
      w: 1080,
      h: 1350
    },
    {
      src: '/img/fb11.jpg',
      w: 720,
      h: 960
    },
    {
      src: '/img/fb12.jpg',
      w: 1004,
      h: 1504
    }
  ])
  self.narrow = ko.observable(window.innerWidth < 1280)
  self.badBrowser = ko.observable(detectIE())
  // if (self.badBrowser()) {
  //   console.log('bad browser')
  //   $('.bad-browser-message').css('display', 'block')
  // }

  self.links = ko.observableArray([
    'HOME',
    'WELCOME',
    'OUR STORY',
    'WEDDING PARTY',
    'VENUES',
    'ACCOMODATIONS',
    'THINGS TO DO',
    'REGISTRY',
    'PHOTOS'
  ])

  self.handleNav = function (target) {
    self.currentPage(target)
    target = target.toLowerCase().replace(/ /g, '')
    jQuery.get(`pages/${target}.html`).then(data => {
      self.content(data)
      if (target === 'photos') {
        [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
          img.setAttribute('src', img.getAttribute('data-src'))
          img.onload = function () {
            img.removeAttribute('data-src')
          }
        })
      }
    })
  }

  self.initializePswipe = function (data, event) {
    const context = ko.contextFor(event.target)
    const index = context.$index()
    const root = document.querySelectorAll('.pswp')[0]
    const options = {
      index: index,
      captionEl: false
    }
    const gallery = new PhotoSwipe(root, PhotoSwipeUI_Default, self.photoGallery(), options)
    gallery.init()
  }

}

ko.bindingHandlers.dynamicHtml = {
  'init': function () {
    return {
      controlsDescendantBindings: true
    }
  },
  'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    let value = ko.utils.unwrapObservable(valueAccessor())
    ko.applyBindingsToNode(element, {
      html: value
    })
    ko.applyBindingsToDescendants(bindingContext, element)
  }
}