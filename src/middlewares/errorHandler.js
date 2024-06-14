export const errorHandler = (error, req, res, next) => {
    console.log(`Error: ${error.message}`);
    const status = error.status || 400;
    res.status(status).send(error.message);
    next()
}

export const validateRole = (req, res, next) => {
    if(req.session.data.role === 'admin'){
        req.session.data.userRole = 'Usuario administrador'
    }else {
        req.session.data.userRole = 'Usuario común'
    }
    next()
}

export const validateAuth = (req, res, next) => {
    console.log(req.session);
    if(req.session.data && req.session.data){
        next()
    }else {
        res.redirect('/views/login')
    }
}