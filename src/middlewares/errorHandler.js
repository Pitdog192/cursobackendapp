export const errorHandler = (error, req, res, next) => {
    console.log(`Error: ${error.message}`);
    const status = error.status || 400;
    res.status(status).send(error.message);
    next()
}

export const validateRole = (req, res, next) => {
    if(req.session.role === 'admin'){
        req.session.userRole = 'Usuario administrador'
    }else {
        req.session.userRole = 'Usuario común'
    }
    next()
}

export const validateAdmin = (req, res, next) => {
    if(req.session.role === 'admin'){
        next()
    }else {
        res.redirect('/views/login?message=No es usuario administrador')
    }
}

export const validateAuth = (req, res, next) => {
    if(req.session.email){
        next()
    }else {
        res.redirect('/views/login')
    }
}