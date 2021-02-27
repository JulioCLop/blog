const express = require('express');
const bodyParser = require('body-parser');
const _ = require("lodash");
const ejs = require('ejs');

const homeStartingContent = "  ipsum dolor sit amet, consectetur adipisicing elit. Natus inventore sed quisquam, nemo quidem rem. Maiores facere neque odit exercitationem? Totam mollitia aperiam, adipisci debitis excepturi molestiae quidem magni facilis dolor deserunt ducimus deleniti, nihil aliquid tempore. Pariatur, dolores soluta necessitatibus beatae dolore consequuntur dignissimos natus accusamus eveniet provident iure.s"
const aboutContent = " consectetur adipisicing elit. Natus inventore sed quisquam, nemo quidem rem. Maiores facere neque odit exercitationem? Totam mollitia aperiam, adipisci debitis excepturi molestiae quidem magni facilis dolor deserunt ducimus deleniti, nihil aliquid tempore. Pariatur, dolores soluta necessitatibus beatae dolore consequuntur dignissimos natus accusamus eveniet provident iure."
const contactContent = "dolor sit amet, consectetur adipisicing elit. Natus inventore sed quisquam, nemo quidem rem. Maiores facere neque odit exercitationem? Totam mollitia aperiam, adipisci debitis excepturi molestiae quidem magni facilis dolor deserunt ducimus deleniti, nihil aliquid tempore. Pariatur, dolores soluta necessitatibus beatae dolore consequuntur dignissimos natus accusamus eveniet provident iure."
let  posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

// Home 
app.get("/", (req , res )=> {

res.render("home", {
    headContent: homeStartingContent,
    posts: posts
  });
});

// About
app.get("/about", (req, res)=>{
  res.render("about", {headAboutUs: aboutContent})
});

// Contact 
app.get("/contact", (req, res)=>{
   res.render("contact", {headerContact: contactContent});
});

// Compose
app.get("/compose", (req, res)=>{
    res.render("compose");
});

app.post("/compose", (req,res)=>{

    const post = {
        title: req.body.postTitle,
        content:  req.body.postBody 
    };

   posts.push(post);

   res.redirect("/")
    
});

// Search specific post 

app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
  
    posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      }
    });
  
  });

app.listen(3000, ()=>{
    console.log(`Server is on port 3000`);
});