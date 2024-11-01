import {ReactComponent as Plant} from '../week2/assets/plant.svg';

const plantSize = [86, 129];

export const trashes4 = [
    {
        id: 'trash_1',
        position: [1041, 45],
    },
    {
        id: 'trash_2',
        position: [2703, 45],
    },
    {
        id: 'trash_3',
        position: [3993, 45],
    },
    {
        id: 'trash_4',
        position: [5110, 45],
    },
    {
        id: 'trash_5',
        position: [6362, 45],
    },
].map(tr => ({
    ...tr,  
    image: () => <Plant />,
    width: plantSize[0],
    height: plantSize[1]
}))