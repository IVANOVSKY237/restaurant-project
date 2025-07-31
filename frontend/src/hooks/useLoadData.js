import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../https";
import { setUser, removeUser } from "../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
    const { isAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUserData();
                console.log('User data loaded:', data);

                // Extract user data from response
                const { _id, name, email, phone, role } = data.data;

                // Update Redux state with fresh user data
                dispatch(setUser({ _id, name, email, phone, role }));
            }
            catch (error) {
                console.log('Error fetching user data:', error);

                // Clear authentication state and redirect to login
                dispatch(removeUser());
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userData');
                navigate("/auth", { replace: true });
            }finally{
                setIsLoading(false);
            }
        }

        // Check if user has token and is marked as authenticated
        const accessToken = localStorage.getItem('accessToken');

        if (isAuth && accessToken) {
            // Validate token by fetching user data
            fetchUser();
        } else if (isAuth && !accessToken) {
            // User is marked as authenticated but no token exists - clear state
            dispatch(removeUser());
            navigate("/auth", { replace: true });
            setIsLoading(false);
        } else {
            // User is not authenticated - no loading needed
            setIsLoading(false);
        }
    }, [isAuth, dispatch, navigate]);
    return isLoading;

}
export default useLoadData;