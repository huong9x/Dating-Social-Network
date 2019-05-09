const logginRequiredMiddleware = async (ctx, next) => {
    if (ctx.authenticator.check()) {
        await next();
    } else {
        ctx.redirect('/login')
    }
}

module.exports = logginRequiredMiddleware;