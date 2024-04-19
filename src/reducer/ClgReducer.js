export const myState = {};

export const clgreducer = (clgstate,action)=>{
    if( action.type === "CLG"){
        return action.payload;
    }
    return clgstate;
}

// export const myState = () => {

//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
//     // Initialize state with the token, if available
//     return token ? { token } : null;
//   };
  
//   export const clgreducer = (clgstate, action) => {
//     switch (action.type) {
//       case "CLG":
//         // Save the updated state in local storage
//         localStorage.setItem("userState", JSON.stringify(action.payload));
//         return action.payload; // Assuming your payload is a boolean indicating user status
//       default:
//         return clgstate;
//     }
//   };
  