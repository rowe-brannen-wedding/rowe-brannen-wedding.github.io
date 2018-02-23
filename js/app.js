function setBg() {

  let win = $(window);
  let win_w = win.width(),
    win_h = win.height(),
    $bg = $("#bg");
  let body = document.getElementById('body')
  let scale = window.devicePixelRatio
  body.width = window.innerWidth * scale
  body.height = window.innerHeight * scale
  // Load narrowest background image based on 
  // viewport width, but never load anything narrower 
  // that what's already loaded if anything.
  let available = [
    480, 960, 1280, 1440, 1920
  ]

  let current = $bg.attr('src').match(/([0-9]+)/) ? RegExp.$1 : null
  let chosen = available[available.length - 1]

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
  self.currentPage = ko.observable()
  self.mobileNavMenuSelection = ko.observable()
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
  self.bridalParty = ko.observableArray([
    {
      title: 'Sam Sox - Matron of Honor',
      img: 'img/sam.png',
      desc: 'Sam and Kathleen have been friends since their days at Lexington Catholic High School. Sam gave Kathleen the infamous KB nickname that has now followed her through high school, college, and beyond. Sam, Kaitlyn, and Kathleen have been the The Three Musketeers since they met 10 years ago (literally, they dressed up as Three Musketeers for Halloween).'
    }, {
      title: 'Kaitlyn Russo (Kurr) - Maid of Honor',
      img: 'img/kurr.jpg',
      desc: 'Kaitlyn is better known by her nicknames of Kurr, Kurdles, or Kurr Kurr. This spunky young woman has had Kathleen laughing ever since they met in the gym of Lexington Catholic High School over 10 years ago. Kurr has always added spice and adventure to the friendship of The Three Musketeers.'
    }, {
      title: 'Maria Tonry',
      img: 'img/maria.png',
      desc: 'Maria and Kathleen met at Butler University and have been friends ever since. They spent many nights at college procrastinating homework by indulging in the infamous “Wine and Artichoke Nights”. Whether it was weekend shenanigans or supporting each other on their much dreaded running workouts, KB and Maria have always been there for each other.'
    }, {
      title: 'Neal Tardy - Best Man',
      img: 'img/neal.jpg',
      desc: 'Neal and Jason grew up playing baseball and soccer together, then cemented their friendship through the trials and tribulations of Boy Scouts and the Firecrafter program. Survivors of many interesting nights in college, Neal and Jason have been there for each other through many of their hardest and finest moments.'
    }, {
      title: 'Ben Rowe',
      img: 'img/ben.jpg',
      desc: 'Ben and Jason\'s relationship has come a long way from the days when Ben would solve the problem of the annoying little brother by sitting on him. Jason has (literally) always looked up to Ben, from baseball to school to scouts, and couldn\'t have asked for a better oldest brother (even if it did mean getting squished sometimes).'
    }, {
      title: 'Andy Rowe',
      img: 'img/andy.png',
      desc: 'Andy and Jason didn\'t seem to have much in common when they were younger, besides a love of soccer. As they\'ve gotten older and started their adult lives, they\'ve grown closer as they\'ve discovered a few more shared insterests; most notably, an affinity for Kentucky\'s bourbon and horse racing.'
    }
  ])
  self.narrow = ko.observable(window.innerWidth < 1280)
  self.mobile = ko.observable(window.innerWidth < 480)

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

  self.mobileNavMenuSelection.subscribe(newValue => {
    self.handleNav(newValue)
  })

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