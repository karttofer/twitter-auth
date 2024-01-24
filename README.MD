## Twitter Auth -

Hi, this is a simple Twitter authentication login; there isn't more than that. Additionally, there are some routes that you can use, but I think you will need to input your own credentials.

So, if you encounter an error related to credentials, you will need to create an `.env` file inside the project folder by following these steps:

- First, you will need to create a Twitter application to obtain KEY and SECRET credentials.
- This project also uses MongoDB, so you will need MongoDB credentials as well.
- Once you have everything, you will need to create a `.env` file following this structure:

```js
TWITTER_API_KEY=<credentials>
TWITTER_API_SECRET=<credentials>
MONGODB_API=<credentials>
```js

Finally, you will be able to run:
```js
node server.js
```js

## Tech Stack

Simple tech stack to create this simple nodejs app

- Node
- Expresss
- Mongodb
- Mongoose
- express-session
- Passport.js / Passport-Twitter
