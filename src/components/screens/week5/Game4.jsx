import { SEX } from "../../../constants/sex";
import rules5 from "../../../assets/images/rules5Bg.png";
import { Game } from "../../shared/Game";

export const Game5 = () => (
   <Game 
        level={5} 
        preloadBg={rules5} 
        customText={(sex) => <p>
                Отличная работа! Ты собрал{sex === SEX.Female ? 'a' : ''} всё необходимое и помог{sex === SEX.Female ? 'лa' : ''} Анне подготовить материалы!
        </p>}
   />
)