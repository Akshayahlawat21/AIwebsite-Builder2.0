import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { auth } from "../firebase";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

function useGetCurrentUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleAuth = async (firebaseUser) => {
            if (!firebaseUser) {
                console.log("useGetCurrentUser: No User Found.");
                localStorage.removeItem("token");
                dispatch(setUserData(null));
                return;
            }

            console.log("useGetCurrentUser: Processing User:", firebaseUser.email);
            try {
                // Try session check
                const result = await axios.get(`${serverUrl}/api/user/me`, {
                    withCredentials: true,
                    headers: getAuthHeaders()
                });

                // Crucial check: verify that the backend session matches the current Firebase user!
                if (result.data && result.data._id && result.data.email === firebaseUser.email) {
                    console.log("useGetCurrentUser: Session Alive for:", result.data.email);
                    dispatch(setUserData(result.data));
                } else {
                    console.log("useGetCurrentUser: Session email mismatch or invalid. Creating new session...");
                    throw new Error("Session mismatch");
                }
            } catch (error) {
                console.log("useGetCurrentUser: Syncing backend for:", firebaseUser.email);
                try {
                    const { data } = await axios.post(`${serverUrl}/api/auth/google`, {
                        name: firebaseUser.displayName,
                        email: firebaseUser.email,
                        avatar: firebaseUser.photoURL,
                    }, { withCredentials: true });
                    
                    if (data.token) { localStorage.setItem("token", data.token); }
                    dispatch(setUserData(data));
                } catch (inner) {
                    console.error("useGetCurrentUser: Backend Error:", inner.message);
                }
            }
        };

        // 1. Check for immediate redirect result (Aggressive Check)
        console.log("useGetCurrentUser: Scanning for Redirect Result...");
        getRedirectResult(auth).then((result) => {
            if (result?.user) {
                console.log("useGetCurrentUser: Redirect Payload Found!");
                handleAuth(result.user);
            }
        }).catch(err => console.error("useGetCurrentUser: Redirect Error:", err));

        // 2. Standard State Listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("useGetCurrentUser: State Listener Fired. User:", user?.email || "NULL");
            handleAuth(user);
        });

        return () => unsubscribe();
    }, [dispatch]);
}

export default useGetCurrentUser;