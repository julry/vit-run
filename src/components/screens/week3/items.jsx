import  { ReactComponent as Food} from './assets/food.svg';
import  { ReactComponent as Term} from './assets/term.svg';

const foodSize = [185, 160];
const termSize = [146, 182];

export const items3 = [
    {
        id: '3-1',
        image: () => <Term />,
        width: termSize[0],
        height: termSize[1],
        position: [381, 221],
    },
    {
        id: '3-2',
        image: () => <Food />,
        width: foodSize[0],
        height: foodSize[1],
        position: [719, 240],
    },
    {
        id: '3-3',
        image: () => <Term />,
        width: termSize[0],
        height: termSize[1],
        position: [1385, 239],
    },
    {
        id: '3-4',
        image: () => <Food />,
        width: foodSize[0],
        height: foodSize[1],
        position: [1849, 215],
    },
    {
        id: '3-5',
        image: () => <Food />,
        width: foodSize[0],
        height: foodSize[1],
        position: [2728, 295],
    },
    {
        id: '3-6',
        image: () => <Term />,
        width: termSize[0],
        height: termSize[1],
        position: [3630, 240],
    },
    {
        id: '3-7',
        image: () => <Food />,
        width: foodSize[0],
        height: foodSize[1],
        position: [4422, 220],
    },
    {
        id: '3-8',
        image: () => <Food />,
        width: foodSize[0],
        height: foodSize[1],
        position: [5589, 225],
    },
    {
        id: '3-9',
        image: () => <Term />,
        width: termSize[0],
        height: termSize[1],
        position: [5253, 290],
    },
    {
        id: '3-10',
        image: () => <Food />,
        width: foodSize[0],
        height: foodSize[1],
        position: [7127, 225],
    },
]