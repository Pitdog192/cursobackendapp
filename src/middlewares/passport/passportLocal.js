import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import userService from "../../services/userservice.js"

const strategyConfig = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}

passport.use('register', new LocalStrategy(strategyConfig, async (req, email, password, done) =>{
    try {
        let user = await userService.searchUser(email)
        if(user) return done(null, false)
        const newUser = await userService.createUser(req.body)
        return done(null, newUser);
    } catch (error) {
        console.log(error)
        return done(null, false)
    }
}))

passport.use('login', new LocalStrategy(strategyConfig, async (req, email, password, done) => {
    try {
        const userLogin = await services.login({ email, password })
        if(!userLogin){
            req.session.destroy()
            return done(null, false, { message: 'Alto ahí Rufián ⛔' })
        } 
        return done(null, userLogin)
    } catch (error) {
        console.log(error)
        return done(error)
    }
}))

passport.serializeUser((user, done)=>{
    done(null, user._id)
});

passport.deserializeUser(async(id, done)=>{
    try {
        const user = await userService.searchUserById(id);
        return done(null, user);
    } catch (error) {
        done(error)
    }
});