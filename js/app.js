const app = {}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.background = "url('../resources/background-480.png') no-repeat center center fixed"
    // document.body.style.height = "100vh"
    document.getElementById("under-construction").innerHTML = "Thanks for visiting from a mobile browser!"
}
app.description = 'Jason and Kathleen\'s Wedding Site!'