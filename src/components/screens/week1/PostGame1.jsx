import { PostGame } from "../../shared/PostGame";
import { questionsLevel1 } from "./questions";

export const PostGame1 = () => (
    <PostGame
        level={1}
        questions={questionsLevel1}
    />
);