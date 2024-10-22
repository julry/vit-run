import { PostGame } from "../../shared/PostGame";
import { questionsLevel2 } from "./questions";

export const PostGame2 = () => (
    <PostGame
        level={2}
        questions={questionsLevel2}
    />
);