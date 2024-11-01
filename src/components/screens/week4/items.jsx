import  { ReactComponent as Phone} from './assets/phone.svg';

const phoneSize = [154, 181];

export const items4 = [
    {
        id: '4-1',
        position: [571, 225],
    },
    {
        id: '4-2',
        position: [975, 290],
    },
    {
        id: '4-3',
        position: [1967, 225],
    },
    {
        id: '4-4',
        position: [2568, 290],
    },
    {
        id: '4-5',
        position: [3219, 240],
    },
    {
        id: '4-6',
        position: [4472, 225],
    },
    {
        id: '4-7',
        position: [5110, 295],
    },
    {
        id: '4-8',
        position: [5595, 225],
    },
    {
        id: '4-9',
        position: [6316, 295],
    },
    {
        id: '4-10',
        position: [7132, 275],
    },
].map(tr => ({
    ...tr,  
    image: () => <Phone />,
    width: phoneSize[0],
    height: phoneSize[1]
}))