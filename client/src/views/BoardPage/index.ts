import { Location } from "history";
import { RouteComponentProps, match } from "react-router-dom";

export { default } from "./BoardPage";

export interface BoardPageProps extends RouteComponentProps<{ id: string }> {}
