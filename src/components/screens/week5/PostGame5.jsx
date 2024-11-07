import { SCREENS } from "../../../constants/screens";
import { PostGame } from "../../shared/PostGame";
import { questionsLevel5 } from "./questions";

export const PostGame5 = () => (
    <PostGame
        level={5}
        nextScreen={SCREENS.FINISH}
        questions={questionsLevel5}
    />
);