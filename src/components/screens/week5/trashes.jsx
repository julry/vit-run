import {ReactComponent as Paper} from '../week2/assets/paper.svg';

const paperSize = [161, 96];

export const trashes4 = [
    {
        id: 'trash_1',
        position: [1041, 50],
    },
    {
        id: 'trash_2',
        position: [2703, 50],
    },
    {
        id: 'trash_3',
        position: [3993, 50],
    },
    {
        id: 'trash_4',
        position: [5110, 50],
    },
    {
        id: 'trash_5',
        position: [6362, 50],
    },
].map(tr => ({
    ...tr,  
    image: () => <Paper />,
    width: paperSize[0],
    height: paperSize[1]
}))