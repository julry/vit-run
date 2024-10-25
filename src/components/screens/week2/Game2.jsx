import { SEX } from "../../../constants/sex";
import rules2 from "../../../assets/images/rules2Bg.png";
import { Game } from "../../shared/Game";

export const Game2 = () => (
   <Game 
        level={2} 
        preloadBg={rules2} 
        customText={(sex) => <p>
                Ты молодец! Ты собрал{sex === SEX.Female ? 'a' : ''} все необходимые материалы{' '}
                и помог{sex === SEX.Female ? 'лa ' : ' '}
                Ивану придумать новый комбо-набор. Теперь наша реклама готова, и мы можем привлекать новых гостей.
        </p>}
   />
)