var express = require('express');
var app = express();
var request = require('request');
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

var url1 = "https://pokeapi.co/api/v2/pokemon/";
app.get("/", function(req, res){
	res.redirect("/pokemons");
});
app.get("/pokemons/:id", function(req, res){
	var id = req.params.id;
	request(url1+id, function(err,  response, body){
		if(err){
			console.log(err);
		}else{
			if(response.statusCode == 200){
				var pokemons = JSON.parse(body);
				var image = pokemons.sprites;
				var img_url = {
					back: image.back_default,
					front: image.front_default
				};
				// id++;
				res.render("pokemons", {pokemons: pokemons, img_url: img_url, id : id	});
			}
		}
	});
});
// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the google web page.
//   }
// });
app.get("*", function(req, res){
	res.send("PAGE NOT FOUND!!");
});
app.listen(3000, function(){
    console.log("Server Connected!!");
});

