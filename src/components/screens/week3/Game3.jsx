import { SEX } from "../../../constants/sex";
import rules3 from "../../../assets/images/rules3Bg.png";
import { Game } from "../../shared/Game";

export const Game3 = () => (
   <Game 
        level={3} 
        preloadBg={rules3} 
        customText={(sex) => <p>
                Ура! Ты собрал{sex === SEX.Female ? 'a' : ''} все необходимые товары{' '}
                и помог{sex === SEX.Female ? 'лa ' : ' '}
                Алексею наладить поставки. Теперь все ингредиенты на месте, и мы можем гарантировать высокое качество нашей продукции.
        </p>}
   />
)