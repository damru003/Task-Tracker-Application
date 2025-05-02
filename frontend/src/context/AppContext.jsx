import axios from "axios";
import { createContext, useState } from "react";

export const AppContent = createContext()

export const AppContentProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [isLoggedIn, setisLoggedin] = useState(false);

    const [userData, setuserData] = useState(null);

    const getUserData = async () => {

        const token = localStorage.getItem('token');

        try {
            const { data } = await axios.get(backendUrl + '/api/user/data' , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                setuserData(data.userData);
                console.log(data.userData)
            } else {
                console.error(data.message || 'Failed to load user data');
            }
        }
        catch (error) {
            console.error('User data fetch error:', error);
        }
    }


    const value = {
        backendUrl,
        isLoggedIn, setisLoggedin,
        userData, setuserData,
        getUserData
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}