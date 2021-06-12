import { RouteComponentProps } from "react-router-dom";
export { default } from "./ErrorPage";

export interface ErrorPageProps extends RouteComponentProps<{ code: string}> {}