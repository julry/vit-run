import floor1Lobby from '../assets/images/floor1Lobby.png';
import floor2Lobby from '../assets/images/floor2Lobby.png';
import floor3Lobby from '../assets/images/floor3Lobby.png';
import floor4Lobby from '../assets/images/floor4Lobby.png';
import floor5Lobby from '../assets/images/floor5Lobby.png';

import girl1 from '../assets/images/girl1.png';
import man2 from '../assets/images/man2.png';

import { items1 } from '../components/screens/week1/items';
import { questionIcons1 } from '../components/screens/week1/questionIcons';
import { trashes1 } from '../components/screens/week1/trashes';

import { items2 } from '../components/screens/week2/items';
import { questionIcons2 } from '../components/screens/week2/questionIcons';
import { trashes2 } from '../components/screens/week2/trashes';

export const subjectK = 677 / 575;
export const SCALE_K = 1.3;
export const LG_KOEF = SCALE_K * subjectK;

export const weeks = [
    {
        id: 5,
        pic: floor5Lobby,
        week: 5,
        isLast: true,
    },
    {
        id: 4,
        pic: floor4Lobby,
        week: 4,
    },
    {
        id: 3,
        pic: floor3Lobby,
        week: 3,
    },
    {
        id: 2,
        pic: floor2Lobby,
        week: 2,
        personTexts: [
            <>
                Привет! Меня зовут <b>Иван</b>, и я работаю в отделе маркетинга во «Вкусно — и точка».{' '}
                Мы запускаем новые <b>акции</b> и <b>бургеры</b>. Сейчас хотим придумать <b>комбо</b> для студентов! Поможешь?
            </>,
            <>
                Твоя задача — помочь мне собрать все необходимые ингредиенты для нового супер-комбо!{' '}
                Избегай препятствий, чтобы не терять время. Вместе мы создадим потрясающую <b>кампанию</b>{' '}
                и привлечём новых <b>гостей</b>!
            </>
        ],
        person: man2,
        figures: items2,
        trashes: trashes2,
        questions: questionIcons2
    },
    {
        id: 1,
        pic: floor1Lobby,
        week: 1,
        personTexts: [
            <>
                Привет! Меня зовут <b>Ольга</b>, я отвечаю за <b>сборку и упаковку</b> наших заказов,{' '}
                а также дарю улыбку на кассе нашим гостям. Сейчас у нас настоящий <b>раш-тайм</b> — поступил{' '}
                <b>крупный заказ</b> через мобильное приложение, и нам нужно быстро его собрать.{'\n'}
                Поможешь?
            </>,
            <>
                Твоя цель — <b>выполнить заказ</b> и не допустить ошибок.{' '}
                Тебе нужно <b>бежать</b> по производственной линии и <b>собирать</b>{' '}
                необходимые ингредиенты — чем <b>больше</b> соберёшь, тем <b>быстрее</b> мы сможем выполнить заказ.
            </>
        ],
        person: girl1,
        figures: items1,
        trashes: trashes1,
        questions: questionIcons1
    }
]