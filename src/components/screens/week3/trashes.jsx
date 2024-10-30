import {ReactComponent as BoxesBig} from './assets/boxes.svg';
import { ReactComponent as Box} from './assets/box.svg';

const boxSize = [80, 61];
const boxesBigSize = [132, 125];

export const trashes3 = [
    {
        id: 'trash_1',
        position: [444, 32],
        image: () => <BoxesBig />,
        width: boxesBigSize[0],
        height: boxesBigSize[1],
    },
    {
        id: 'trash_2',
        position: [1483, 64],
        image: () => <Box />,
        width: boxSize[0],
        height: boxSize[1],
    },
    {
        id: 'trash_3',
        position: [2716, 64],
        image: () => <Box />,
        width: boxSize[0],
        height: boxSize[1],
    },
    {
        id: 'trash_4',
        position: [3414, 32],
        image: () => <BoxesBig />,
        width: boxesBigSize[0],
        height: boxesBigSize[1],
    },
    {
        id: 'trash_5',
        position: [5123, 64],
        image: () => <Box />,
        width: boxSize[0],
        height: boxSize[1],
    },
    {
        id: 'trash_6',
        position: [6373, 32],
        image: () => <BoxesBig />,
        width: boxesBigSize[0],
        height: boxesBigSize[1],
    },
]