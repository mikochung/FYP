export default ({store,route,redirect})=>{
    const user = store.state.users.user;
    const blocked = /\/admin\/*/g;
    
    if( (!user||(user&&!user.admin)) && route.path.match(blocked)){
        redirect('/');
    }
    
}