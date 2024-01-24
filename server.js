require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const TwitterStrategy = require("passport-twitter");

const app = express();
const port = 3000;

function connectDB() {
  const url = `mongodb+srv://Jhornan:${process.env.MONGODB_API}@ordo-cluster-1.qvrotwg.mongodb.net/?retryWrites=true&w=majority`;

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}

connectDB();

// Create schema
const userSchema = mongoose.Schema({
  twitterId: String,
  username: String,
  displayName: String,
  image: Array,
});

// Create schema in user collection
const User = mongoose.model("User", userSchema);

// Middleware de sesión
app.use(
  session({
    secret: process.env.TWITTER_API_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware de Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET,
      callbackURL: "http://localhost:3000/auth/twitter/callback",
    },
    async function(_, _, profile, cb) {
      try {
        let user = await User.findOne({ twitterId: profile.id });

        if (user) {
          return cb(null, user);
        } else {
          const newUser = new User({
            twitterId: profile.id,
            username: profile?.username,
            displayName: profile?.displayName,
            image: profile?.photos,
          });
          await newUser.save();
          return cb(null, newUser);
        }
      } catch (err) {
        console.error(err);
        return cb(err);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/* ROUTES */

app.get("/", (_, res) => {
  /* 
    If you don't need this you can just delete this one
  */

  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/success", (_, res) => {
  res.sendFile(path.join(__dirname, "/public/success.html"));
});

app.get("/users/all", (_, res) => {
  User.find().then((response) => res.send({ user: response }));
});

app.get("/users/delete/all", (_, res) => {
  User.deleteMany({})
    .then((res) => ({ message: res }))
    .catch((error) => console.err({ message: error }));
});

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  function(_, res) {
    res.redirect("/success");
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
