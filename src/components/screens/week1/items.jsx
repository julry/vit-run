import  { ReactComponent as Burger} from './assets/burger.svg';
import { ReactComponent as Fries} from './assets/fries.svg';
import { ReactComponent as Coffee} from './assets/coffee.svg';
import { ReactComponent as Lemonade} from './assets/lemonade.svg';

const burgerSize = [145, 132];
const coffeeSize = [130, 146];
const friesSize = [121, 134];
const lemonadeSize = [128, 181];

export const items1 = [
    {
        id: '1-1',
        image: () =>  <Burger />,
        width: burgerSize[0],
        height: burgerSize[1],
        position: [173, 35],
    },
    {
        id: '1-2',
        image: () =>  <Lemonade/>,
        width: lemonadeSize[0],
        height: lemonadeSize[1],
        position: [696, 32],
    },
    {
        id: '1-3',
        image: () =>  <Fries/>,
        width: friesSize[0],
        height: friesSize[1],
        position: [1384, 43],
    },
    {
        id: '1-4',
        image: () =>  <Coffee/>,
        width: coffeeSize[0],
        height: coffeeSize[1],
        position: [2456, 47],
    },
    {
        id: '1-5',
        image: () =>  <Lemonade/>,
        width: lemonadeSize[0],
        height: lemonadeSize[1],
        position: [3100, 50],
    },
    {
        id: '1-6',
        image: () =>  <Burger/>,
        width: burgerSize[0],
        height: burgerSize[1],
        position: [4206, 37],
    },
    {
        id: '1-7',
        image: () =>  <Fries />,
        width: friesSize[0],
        height: friesSize[1],
        position: [5102, 55],
    },
    {
        id: '1-8',
        image: () =>  <Burger />,
        width: burgerSize[0],
        height: burgerSize[1],
        position: [6040, 34],
    },
    {
        id: '1-9',
        image: () =>  <Burger />,
        width: burgerSize[0],
        height: burgerSize[1],
        position: [6654, 50],
    },
    {
        id: '1-10',
        image: () =>  <Fries />,
        width: friesSize[0],
        height: friesSize[1],
        position: [7408, 34],
    },
]