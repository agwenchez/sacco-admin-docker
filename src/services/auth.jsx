export function authHeader() {
    // return authorization header with jwt token
    const currentUser = localStorage.getItem('token')
    console.log("Token from Auth Function==>",currentUser)
    if (currentUser) {
        return { Authorization: `Bearer ${currentUser}` };
    }else {
        return {};
    }
}