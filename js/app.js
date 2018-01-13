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
    target = target.toLowerCase().replace(/ /g,'')
    jQuery.get(`pages/${target}.html`).then(data => {
      self.content(data)
    })
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
