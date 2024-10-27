import { SEX } from "../../../constants/sex";
import rules3 from "../../../assets/images/rules3Bg.png";
import { Game } from "../../shared/Game";

export const Game3 = () => (
   <Game 
        level={3} 
        preloadBg={rules3} 
        customText={(sex) => <p>
                Ура! Ты собрал{sex === SEX.Female ? 'a' : ''} все <b>необходимые товары</b>{' '}
                и помог{sex === SEX.Female ? 'лa ' : ' '}
                Алексею наладить поставки. Теперь все <b>ингредиенты</b> на месте, и мы можем гарантировать <b>качество</b> наших блюд.
        </p>}
   />
)