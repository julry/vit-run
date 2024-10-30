import floor1Lobby from '../assets/images/floor1Lobby.png';
import floor2Lobby from '../assets/images/floor2Lobby.png';
import floor3Lobby from '../assets/images/floor3Lobby.png';
import floor4Lobby from '../assets/images/floor4Lobby.png';
import floor5Lobby from '../assets/images/floor5Lobby.png';

import girl1 from '../assets/images/girl1.png';
import man2 from '../assets/images/man2.png';
import man3 from '../assets/images/man3.png';

import { items1 } from '../components/screens/week1/items';
import { questionIcons1 } from '../components/screens/week1/questionIcons';
import { trashes1 } from '../components/screens/week1/trashes';

import { items2 } from '../components/screens/week2/items';
import { questionIcons2 } from '../components/screens/week2/questionIcons';
import { trashes2 } from '../components/screens/week2/trashes';

import { items3 } from '../components/screens/week3/items';
import { questionIcons3 } from '../components/screens/week3/questionIcons';
import { trashes3 } from '../components/screens/week3/trashes';

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
        personTexts: [
            <>
                Привет! Меня зовут <b>Алексей</b>, и я специалист по <b>контролю качества</b>.{' '}
                Я слежу за тем, чтобы все наши продукты соответствовали <b>высоким стандартам качества</b>{' '}
                и безопасности. Недавно у нас возникла новая <b>задача</b> с некоторыми <b>поставками</b>,{' '}
                и нам нужно срочно всё наладить.
            </>,
            <>
                Тебе предстоит <b>пробежать по складам</b>, проверить условия хранения и сроки годности,{' '}
                чтобы убедиться, что вся продукция соответствует <b>стандартам</b> и готова к использованию!
            </>
        ],
        person: man3,
        figures: items3,
        trashes: trashes3,
        questions: questionIcons3
    },
    {
        id: 2,
        pic: floor2Lobby,
        week: 2,
        personTexts: [
            <>
                Привет! Меня зовут <b>Иван</b>, и я работаю в отделе маркетинга во «Вкусно - и точка».{' '}
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
                Привет! Меня зовут Оля, я отвечаю за сборку и упаковку наших заказов,{' '}
                а также дарю улыбку на кассе нашим гостям. Сейчас у нас настоящий раш-тайм — поступил{' '}
                крупный заказ через мобильное приложение, и нам нужно быстро его собрать.{'\n'}
                Поможешь?
            </>,
            <>
                Твоя цель — собрать заказ и не допустить ошибок. Тебе нужно бежать по производственной линии и собирать всю продукцию заказа, при этом не столкнуться с препятствиями. Чем больше соберёшь продуктов, тем быстрее сможем выполнить заказ.
            </>
        ],
        person: girl1,
        figures: items1,
        trashes: trashes1,
        questions: questionIcons1
    }
]