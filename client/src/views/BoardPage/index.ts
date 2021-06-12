import { RouteComponentProps } from "react-router-dom";

export interface BoardPageProps extends RouteComponentProps<{ id: string }> {}

export { default } from "./BoardPageWrapper";