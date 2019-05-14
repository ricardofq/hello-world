var express = require("express"),
    app = express(), 
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose"), 
    request = require("request"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds");

seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://photosforclass.com/download/flickr-4812576807",
//         description: "this is a huge camphill, no water, no bathrooms"
//     }, function(err, campground) {
//         if(err) {
//             console.log(err)
//         } else {
//             console.log("Newly created campground:");
//             console.log(campground);
//         }
// });



var campgrounds = [
        {name: "Salmon Creek", image: "https://photosforclass.com/download/flickr-5641024448"},
        {name: "Granite Hill", image: "https://photosforclass.com/download/flickr-4812576807"},
        {name: "Sra da Mó", image: "https://photosforclass.com/download/flickr-1342367857"},
        {name: "Salmon Creek", image: "https://photosforclass.com/download/flickr-5641024448"},
        {name: "Granite Hill", image: "https://photosforclass.com/download/flickr-4812576807"},
        {name: "Sra da Mó", image: "https://photosforclass.com/download/flickr-1342367857"},
        {name: "Salmon Creek", image: "https://photosforclass.com/download/flickr-5641024448"},
        {name: "Granite Hill", image: "https://photosforclass.com/download/flickr-4812576807"},
        {name: "Sra da Mó", image: "https://photosforclass.com/download/flickr-1342367857"}
        ];

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    // 
    Campground.find({}, function(err, allcampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allcampgrounds});
        }
    })
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds", function(req, res) {
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name , image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
       if(err) {
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));
