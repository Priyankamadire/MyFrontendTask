// export const initialState = () => {
//     // Retrieve the token from the cookie
//     const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
//     // Initialize state with the token, if available
//     return token ? { token } : null;
//   };
  
//   export const reducer = (state, action) => {
//     switch (action.type) {
//       case "USER":
//         // Save the updated state in local storage
//         localStorage.setItem("userState", JSON.stringify(action.payload));
//         return action.payload; // Assuming your payload is a boolean indicating user status
//       default:
//         return state;
//     }
//   }; 
// export const initialState = {
//     isAuthenticated: false
//   };
  
//   export const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case "USER":
//         return {
//           ...state,
//           isAuthenticated: action.payload
//         };
//       default:
//         return state;
//     }
//   };
  

export const initialState = {}; // Updated initial state to an empty string

export const reducer = (state, action) => {
    switch (action.type) {
        case "USER":
            return action.payload;
        default:
            return state;
    }
};


// reducer.js

// export const initialState = {
//     isAuthenticated: false
//   };
  
//   export const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case "USER":
//         return {
//           ...state,
//           isAuthenticated: action.payload
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default reducer;
  