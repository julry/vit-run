import {ReactComponent as Trash} from './assets/trash.svg';

export const trashes2 = [
    {
        id: 'trash_1',
        position: [485, 9],
    },
    {
        id: 'trash_2',
        position: [992, 9],
    },
    {
        id: 'trash_3',
        position: [1874, 9],
    },
].map(tr => ({...tr, image: () => <Trash />, width: 70, height: 94}));