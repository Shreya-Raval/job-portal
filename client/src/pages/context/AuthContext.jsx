// // import { createContext, useContext, useState, useEffect } from 'react';
// // import apiCall from '../../helpers/api';

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState({ 
// //     id: "6800ff664a81fcf30d972ca6", userName: "Shreya Raval", role: "jobseeker"
// //   }); 
// //   //admin
// //   //recruiter
// //   //jobseeker
  
// //   //const [user, setUser] = useState(null); 


// //   // useEffect(() => {
// //   //   apiCall.get('user/get-user', {
// //   //     withCredentials: true,
// //   //   })
// //   //     .then(
// //   //       res => {setUser(res.data.user);
// //   //         localStorage.setItem('user', JSON.stringify(res.data.user));}

// //   //   )
// //   //     .catch(() => setUser(null));
// //   // }, []);

// //   return (
// //     <AuthContext.Provider value={{ user, setUser }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import { createContext, useContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import apiCall from "../../helpers/api";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); 

//   useEffect(() => {
//     const cookieUser = Cookies.get("userInfo");

//     if (cookieUser) {
//       try {
//         const parsedUser = JSON.parse(cookieUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Failed to parse cookie user", error);
//         setUser(null);
//       }
//     } else {
//       apiCall
//         .get("user/get-user", { withCredentials: true })
//         .then((res) => {
//           setUser(res.data.user);
//           Cookies.set("userInfo", JSON.stringify(res.data.user));
//         })
//         .catch(() => setUser(null));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
