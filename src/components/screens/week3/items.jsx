import  { ReactComponent as Ice} from './assets/ice.svg';
import  { ReactComponent as Icecream} from './assets/icecream.svg';
import { ReactComponent as Shake} from './assets/shake.svg';
import { ReactComponent as Water} from './assets/water.svg';
import { ReactComponent as Lemonade} from '../week1/assets/lemonade.svg';

const iceSize = [113, 157];
const iceCreamSize = [124, 160];
const shakeSize = [127, 183];
const waterSize = [117, 173];
const lemonadeSize = [128, 181];

export const items3 = [
    {
        id: '3-1',
        image: () => <Icecream />,
        width: iceCreamSize[0],
        height: iceCreamSize[1],
        position: [442, 180],
    },
    {
        id: '3-2',
        image: () => <Shake />,
        width: shakeSize[0],
        height: shakeSize[1],
        position: [642, 270],
    },
    {
        id: '3-3',
        image: () => <Ice/>,
        width: iceSize[0],
        height: iceSize[1],
        position: [3319, 250],
    },
    {
        id: '3-4',
        image: () => <Lemonade/>,
        width: lemonadeSize[0],
        height: lemonadeSize[1],
        position: [4326, 250],
    },
    {
        id: '3-5',
        image: () => <Ice/>,
        width: iceSize[0],
        height: iceSize[1],
        position: [5421, 230],
    },
    {
        id: '3-6',
        image: () =>  <Icecream/>,
        width: iceCreamSize[0],
        height: iceCreamSize[1],
        position: [5882, 280],
    },
    {
        id: '3-7',
        image: () =>  <Lemonade/>,
        width: lemonadeSize[0],
        height: lemonadeSize[1],
        position: [2173, 270],
    },
    {
        id: '3-8',
        image: () =>  <Water />,
        width: waterSize[0],
        height: waterSize[1],
        position: [3070, 240],
    },
    {
        id: '3-9',
        image: () =>  <Shake />,
        width: shakeSize[0],
        height: shakeSize[1],
        position: [1000, 180],
    },
    {
        id: '3-10',
        image: () =>  <Water />,
        width: waterSize[0],
        height: waterSize[1],
        position: [6750, 175],
    },
]