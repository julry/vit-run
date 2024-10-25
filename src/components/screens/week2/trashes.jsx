import {ReactComponent as Plant} from './assets/plant.svg';
import { ReactComponent as Paper} from './assets/paper.svg';

const plantSize = [86, 129];
const paperSize = [161, 96];

export const trashes2 = [
    {
        id: 'trash_1',
        position: [1153, 8.5],
        image: () => <Paper />,
        width: paperSize[0],
        height: paperSize[1],
    },
    {
        id: 'trash_2',
        position: [3070, 7.5],
        image: () => <Plant />,
        width: plantSize[0],
        height: plantSize[1],
    },
    {
        id: 'trash_3',
        position: [4204, 8.5],
        image: () => <Paper />,
        width: paperSize[0],
        height: paperSize[1],
    },
    {
        id: 'trash_4',
        position: [6604, 7.5],
        image: () => <Plant />,
        width: plantSize[0],
        height: plantSize[1],
    },
]