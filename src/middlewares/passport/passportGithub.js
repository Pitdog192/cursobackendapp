import { Strategy as GithubStrategy } from "passport-github2"
import passport from "passport"
import userService from "../../services/userservice.js"
import { config } from "../../config/config.js"

const strategyConfig = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL
}

passport.use('github', new GithubStrategy(strategyConfig, async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email
    const user = await userService.searchUser(email)
    if (user) return done(null, user)
    const newUser = await userService.createUser({
        email: email,
        first_name : profile._json.name,
        password: null
    })
    return done(null, newUser)
    }
))