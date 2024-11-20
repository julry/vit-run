import styled from "styled-components";
import bg from '../../assets/images/rules5Bg.png';
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { Block } from "../shared/Block";
import { SEX } from "../../constants/sex";
import { Character } from "../shared/Character";
import { FlexWrapper } from "../shared/FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    padding: var(--spacing_x4);
`;

const Image = styled.img`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 2;
    filter: blur(3.5px);
    transform: scale(1.05);
`;

const CharacterWrapper = styled.div`
    position: absolute;
    bottom: 9.2%;
    left: 0;
    z-index: 3;
    filter: blur(3.5px);
`;

const Content = styled(Block)`
    position: relative;
    z-index: 6;

    & button { 
        margin-top: var(--spacing_x3);
    }
`;

export const Finish = () => {
    const {next, user} = useProgress();
    return (
        <Wrapper>
            <Image src={bg} alt=""/>
            <CharacterWrapper>
                <Character level={5} isPause/>
            </CharacterWrapper>
            <Content>
                <p>
                    Поздравляем! Ты познакомил{user.sex === SEX.Female ? 'лась' : 'лся'} с работой пяти{' '}
                    отделов «Вкусно – и точка» и помог{user.sex === SEX.Female ? 'ла' : ''} каждому из них справиться{' '}
                    с задачами. Благодаря твоей помощи наша команда достигла отличных результатов.{'\n\n'}
                    Информация о победителях будет размещена в <a href="https://t.me/vitmarathon_bot" target="_blank" rel="noreferrer">чат-боте</a>.{'\n\n'}
                    Ты можешь узнать верные ответы на все вопросы 2 декабря.
                </p>
                <Button onClick={() => next(SCREENS.LOBBY)}>В лобби</Button>
            </Content>
        </Wrapper>
    )
};
