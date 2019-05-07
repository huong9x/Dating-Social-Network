exports.showUsers = async context => {
    context.body = await context.database.from('users').select('*');
};
