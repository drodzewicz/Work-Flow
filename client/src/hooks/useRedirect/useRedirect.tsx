import { NavigateFunction, NavigateOptions, To, useLocation, useNavigate } from "react-router-dom";

const useRedirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const home = () => navigate("/");

    const register = () => navigate("/register");

    const dashboard = () => navigate("/dashboard");

    const profile = () => navigate("/profile");

    const board = (boardId: string) => navigate(`/board/${boardId}`);

    const task = (boardId: string, taskId: string) => navigate(`/board/${boardId}/task/${taskId}`);

    const boardSettings = (boardId: string) => navigate(`/board/${boardId}/settings`);

    const custom: NavigateFunction = (to: To | number, options?: NavigateOptions) => {
        if (typeof to === "number") {
            navigate(to);
        } else {
            navigate(to, options);
        }
    };

    const goTo = {
        custom,
        home,
        register,
        dashboard,
        profile,
        board,
        task,
        boardSettings,
    };

    return {
        goTo,
        location,
    };
};

export default useRedirect;
