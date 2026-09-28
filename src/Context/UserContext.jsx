import { createContext, useState } from "react";

const UserContext = createContext()
function UserProvider({children}){
    const[users,setUsers]=useState(()=>{
        const savedUsers = localStorage.getItem("vaasi-users")

        return savedUsers ? JSON.parse(savedUsers):[]

    })
    const[currentUser,setCurrentUser]=useState(()=>{
        const savedUser = localStorage.getItem("vaasi-current-user")

        return savedUser ? JSON.parse(savedUser):null
    })
    const requireLogin = () => {
    if (!currentUser) {
        alert("Please login to continue")
        return false
    }

    return true
}
    
    return(
        <UserContext.Provider value={
            {users,setUsers,currentUser,setCurrentUser,requireLogin}
            }>
            {children}
        </UserContext.Provider>
    )
 
}
export {UserProvider}
export default UserContext