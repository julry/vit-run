import floor1Lobby from '../assets/images/floor1Lobby.png';
import floor2Lobby from '../assets/images/floor2Lobby.png';
import floor3Lobby from '../assets/images/floor3Lobby.png';
import floor4Lobby from '../assets/images/floor4Lobby.png';
import floor5Lobby from '../assets/images/floor5Lobby.png';

import girl1 from '../assets/images/girl1.png';
import man2 from '../assets/images/man2.png';
import man3 from '../assets/images/man3.png';
import girl4 from '../assets/images/girl4.png';
import girl5 from '../assets/images/girl5.png';

import { items1 } from '../components/screens/week1/items';
import { questionIcons1 } from '../components/screens/week1/questionIcons';
import { trashes1 } from '../components/screens/week1/trashes';

import { items2 } from '../components/screens/week2/items';
import { questionIcons2 } from '../components/screens/week2/questionIcons';
import { trashes2 } from '../components/screens/week2/trashes';

import { items3 } from '../components/screens/week3/items';
import { questionIcons3 } from '../components/screens/week3/questionIcons';
import { trashes3 } from '../components/screens/week3/trashes';

import { trashes4 } from '../components/screens/week4/trashes';
import { items4 } from '../components/screens/week4/items';
import { questionIcons4 } from '../components/screens/week4/questionIcons';

import { trashes5 } from '../components/screens/week5/trashes';
import { items5 } from '../components/screens/week5/items';
import { questionIcons5 } from '../components/screens/week5/questionIcons';

export const subjectK = 677 / 575;
export const SCALE_K = 1.3;
export const LG_KOEF = SCALE_K * subjectK;

export const weeks = [
    {
        id: 5,
        pic: floor5Lobby,
        week: 5,
        isLast: true,
        personTexts: [
            <>
                Привет! Меня зовут Анна, и я наставник стажёров. Моя задача — заботиться{' '}
                о развитии сотрудников и создавать условия для их успеха. К нам можно прийти совершенно{' '}
                без опыта, у нас свой центр обучения и постоянно проводятся тренинги!
            </>,
            <>
               Недавно мы собрали обратную связь от новых сотрудников по их обучению. Теперь{' '}
               нам нужно адаптировать материалы тренингов, чтобы наши сотрудники могли расти и развиваться.{' '}
               Твоя задача — помочь нам собрать и проанализировать всю эту обратную связь.
            </>
        ],
        person: girl5,
        figures: items5,
        trashes: trashes5,
        questions: questionIcons5
    },
    {
        id: 4,
        pic: floor4Lobby,
        week: 4,
        personTexts: [
            <>
                Привет! Я Мария, ИТ-специалист. Я устраняю баги в нашем мобильном приложении,{' '}
                чтобы гости могли заказать комбо в любое время! Мы разрабатываем новую функцию,{' '}
                которая сделает оформление заказов ещё быстрее и проще. Но чтобы запустить её,{' '}
                нам нужно всё протестировать и настроить. Одна я не справлюсь!
            </>,
            <>
                Твоя задача — помочь мне внедрить новую функцию. Пробегись по серверным комнатам и офисам,{' '}
                собери нужные компоненты и устрани ошибки в коде. Если мы справимся, наши гости смогут наслаждаться{' '}
                новыми возможностями приложения!
            </>
        ],
        person: girl4,
        figures: items4,
        trashes: trashes4,
        questions: questionIcons4
    },
    {
        id: 3,
        pic: floor3Lobby,
        week: 3,
        personTexts: [
            <>
                Привет! Меня зовут Алексей, и я специалист по контролю качества.{' '}
                Я слежу за тем, чтобы все наши продукты соответствовали высоким стандартам качества{' '}
                и безопасности. Недавно у нас возникла новая задача с некоторыми поставками,{' '}
                и нам нужно срочно всё наладить.
            </>,
            <>
                Тебе предстоит пробежать по складам, проверить условия хранения и сроки годности,{' '}
                чтобы убедиться, что вся продукция соответствует стандартам и готова к использованию!
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
                Привет! Меня зовут Иван, и я работаю в отделе маркетинга во «Вкусно – и точка».{' '}
                Мы разрабатываем новые акции и продукцию. Сейчас хотим придумать новый комбо для студентов. Поможешь?
            </>,
            <>
                Твоя задача — помочь мне собрать все необходимые ингредиенты для нового супер-комбо!{' '}
                Избегай препятствий, чтобы не терять время. Вместе мы создадим потрясающую кампанию{' '}
                и привлечём новых гостей!
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