import { Reducer } from "react";

import { AuthAction } from "./actions";
import { AuthState, AuthActionType } from "./type";

const reducer: Reducer<AuthState, AuthActionType> = (state, action) => {
    switch (action.type) {
        case AuthAction.LOGIN: {
            return { ...state, user: action.payload.user, token: action.payload.token };
        }
        case AuthAction.LOGOUT:
            return { user: undefined, token: undefined };
        default:
            return state;
    }
};

export default reducer;
