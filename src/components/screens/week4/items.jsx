import  { ReactComponent as Phone} from './assets/phone.svg';

const phoneSize = [154, 181];

export const items4 = [
    {
        id: '4-1',
        position: [571, 215],
    },
    {
        id: '4-2',
        position: [975, 290],
    },
    {
        id: '4-3',
        position: [1967, 215],
    },
    {
        id: '4-4',
        position: [2568, 310],
    },
    {
        id: '4-5',
        position: [3219, 220],
    },
    {
        id: '4-6',
        position: [4472, 200],
    },
    {
        id: '4-7',
        position: [5110, 305],
    },
    {
        id: '4-8',
        position: [5595, 200],
    },
    {
        id: '4-9',
        position: [6316, 325],
    },
    {
        id: '4-10',
        position: [7132, 285],
    },
].map(tr => ({
    ...tr,  
    image: () => <Phone />,
    width: phoneSize[0],
    height: phoneSize[1]
}))