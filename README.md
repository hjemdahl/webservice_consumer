#webservice_consumer

Webbplats som konsumerar REST webbtjänst uppbyggd med en HTML sida och Sass konverterat till CSS med gulpdesignad automatiseringsprocess. JavaScript hämtar med metoden fetch(), genom REST webbtjänsten, och metoden GET i fuktionen getCourses() kurser i JSON format från en databas och skriver ut dem en och en i en forEach loop till en tabell. Nya kurser kan också läggas till genom ett formulär. JavaScript fuktionen addCourse hämtar införda värden, omvandlar dem till JSON format och med metoderna fetch() och POST, genom REST webbtjänsten, lägger till kursen i databasen.

Publicerad webbplats: http://studenter.miun.se/~mohj1800/web3/pub/index.html
