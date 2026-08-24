window.addEventListener("load", function () {

    setTimeout(function () {

        var splash = document.getElementById("splashScreen");

        var language = document.getElementById("languageScreen");

        var app = document.getElementById("app");

        if (splash) {
            splash.classList.add("hide");
        }

        if (language) {
            language.classList.remove("hidden");
        }

        console.log("SHE-SHIELD JavaScript is working");

    }, 2500);

});
