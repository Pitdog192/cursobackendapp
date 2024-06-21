import { Strategy as GithubStrategy } from "passport-github2"
import passport from "passport"
import userService from "../../services/userservice.js"

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}

passport.use('github', new GithubStrategy(strategyConfig, async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email
    const user = await userService.searchUser(email)
    if (user) return done(null, user)
    const newUser = await userService.createUser({
        email: email,
        first_name : profile._json.name,
        password: profile._json.node_id
    })
    return done(null, newUser)
    }
))