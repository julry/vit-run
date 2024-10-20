import { Login } from "../components/screens/Login";
import { Registration1 } from "../components/screens/Registration1";
import { Registration2 } from "../components/screens/Registration2";
import { Lobby } from "../components/screens/Lobby";
import { PreGame1 } from "../components/screens/week1/PreGame1";
import { Game1 } from "../components/screens/week1/Game1";
// import { PostGame1 } from "../components/screens/PostGame1";
// import { Library } from "../components/screens/Library";
// import { Game2 } from "../components/screens/Game2";
// import { PostGame2 } from "../components/screens/PostGame2";
// import { Game3 } from "../components/screens/Game3";
// import { PostGame3 } from "../components/screens/PostGame3";
// import { Game4 } from "../components/screens/Game4";
// import { PostGame4 } from "../components/screens/PostGame4";
// import { Finish } from "../components/screens/Finish";
// import { Plug } from "../components/screens/Plug";

import { SCREENS } from "./screens";

import startPic from '../assets/images/intro-pic.png';
import game1Bg from '../assets/images/game1Bg.png';
import rules1Bg from '../assets/images/rules1Bg.png';
import floor1Lobby from '../assets/images/floor1Lobby.png';
// import floor2Lobby from '../assets/images/floor2Lobby.png';
// import floor3Lobby from '../assets/images/floor3Lobby.png';
// import floor4Lobby from '../assets/images/floor4Lobby.png';
// import floor5Lobby from '../assets/images/floor5Lobby.png';
import female1 from '../assets/images/female_1.svg';
import female2 from '../assets/images/female_2.svg';
import female3 from '../assets/images/female_3.svg';
import female from '../assets/images/female_start.svg';
import male1 from '../assets/images/male_1.svg';
import male2 from '../assets/images/male_2.svg';
import male3 from '../assets/images/male_3.svg';
import male from '../assets/images/male_start.svg';
import { PostGame1 } from "../components/screens/week1/PostGame1";

export const screens = {
    [SCREENS.REG_1]: Registration1,
    [SCREENS.REG_2]: Registration2,
    [SCREENS.LOGIN]: Login,
    [SCREENS.PREGAME1]: PreGame1,
    [SCREENS.GAME1]: Game1,
    [SCREENS.LOBBY]: Lobby,
    [SCREENS.POST_GAME1]: PostGame1,
    // [SCREENS.LIBRARY]: Library,
    // [SCREENS.GAME2]: Game2,
    // [SCREENS.POST_GAME2]: PostGame2,
    // [SCREENS.GAME3]: Game3,
    // [SCREENS.POST_GAME3]: PostGame3,
    // [SCREENS.GAME4]: Game4,
    // [SCREENS.POST_GAME4]: PostGame4,
    // [SCREENS.FINISH]: Finish,
    // [SCREENS.PLUG]: Plug,
};

export const preloadImages = [ 
    startPic, floor1Lobby, game1Bg, female, female1, female2, 
    female3, male, male1, male2, male3, rules1Bg
];
