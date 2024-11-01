import  { ReactComponent as Phone} from './assets/form.svg';

const phoneSize = [121, 135];

export const items5 = [
    {
        id: '5-1',
        position: [722, 305],
    },
    {
        id: '5-2',
        position: [1214, 210],
    },
    {
        id: '5-3',
        position: [2377, 364],
    },
    {
        id: '5-4',
        position: [2766, 240],
    },
    {
        id: '5-5',
        position: [4137, 305],
    },
    {
        id: '5-6',
        position: [4865, 240],
    },
    {
        id: '5-7',
        position: [5497, 245],
    },
    {
        id: '5-8',
        position: [6275, 295],
    },
    {
        id: '5-9',
        position: [6720, 220],
    },
    {
        id: '5-10',
        position: [7195, 220],
    },
].map(tr => ({
    ...tr,  
    image: () => <Phone />,
    width: phoneSize[0],
    height: phoneSize[1]
}))