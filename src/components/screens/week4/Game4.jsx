import { SEX } from "../../../constants/sex";
import rules4 from "../../../assets/images/rules4Bg.png";
import { Game } from "../../shared/Game";

export const Game4 = () => (
   <Game 
        level={4} 
        preloadBg={rules4} 
        customText={(sex) => <p>
                Здорово! Ты помог{sex === SEX.Female ? 'лa' : ''} Марии внедрить новую функцию в приложении.{' '}
                Теперь оно работает ещё лучше, и гости могут наслаждаться удобными и быстрыми заказами.
        </p>}
   />
)