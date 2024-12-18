import { SEX } from "../../../constants/sex";
import rules1 from "../../../assets/images/rules1Bg.png";
import { Game } from "../../shared/Game";

export const Game1 = () => (
   <Game 
        level={1} 
        preloadBg={rules1} 
        customText={(sex) => <p>
                <b>Отличная работа!</b>{'\n\n'}
                Ты собрал{sex === SEX.Female ? 'a' : ''} весь заказ правильно и помог{sex === SEX.Female ? 'лa ' : ' '}
                Оле быстро обслужить гостей.
        </p>}
   />
)