import {ReactComponent as Trash} from './assets/trash.svg';

export const trashes1 = [
    {
        id: 'trash_1',
        position: [485, 52],
    },
    {
        id: 'trash_2',
        position: [1992, 52],
    },
    {
        id: 'trash_3',
        position: [3874, 52],
    },
].map(tr => ({...tr, image: () => <Trash />, width: 70, height: 94}));