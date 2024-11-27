import { useMemo, useState } from "react";
import styled from "styled-components"
import { SCREENS } from "../../constants/screens";
import { useProgress } from "../../contexts/ProgressContext";
import { questionsLevel1 } from "./week1/questions";
import { questionsLevel2 } from "./week2/questions";
import { questionsLevel3 } from "./week3/questions";
import { questionsLevel4 } from "./week4/questions";
import { questionsLevel5 } from "./week5/questions";
import { Button, IconButton } from "../shared/Button";
import { FlexWrapper } from "../shared/FlexWrapper";

const Wrapper = styled(FlexWrapper)`
   padding: var(--spacing_x1) var(--spacing_x4) var(--spacing_x4);
   overflow-y: auto;
   background-color: var(--color-green);
   & p {
        width: 100%;
        text-align: left;
    }
`;

const AnswersBlock = styled.div`
    margin-top: var(--spacing_x6);
    width: 100%;
`;

const RadioInputStyled = styled.div`
    display: flex;
    margin-top: var(--spacing_x4);
    font-size: var(--font_md);

    & p {
        margin-top: calc(0px - var(--spacing_x1) / 2);
    }

    &:first-child {
        margin-top: 0;
    }

    & input:checked + div {
        background-color: #31E859 !important;
        border-color: #31E859;
    }
`;

const Point = styled.div`
    flex-shrink: 0;
    width: var(--spacing_x4);
    height: var(--spacing_x4);
    background-color: ${({$isCorrect}) => $isCorrect ? '#31E859' : 'transparent'};
    border: 1px solid  ${({$isCorrect}) => $isCorrect ? '#31E859' : 'var(--color-white)'};
    border-radius: 50%;
    margin-right: var(--spacing_small);
`;

const ButtonWrapper = styled(FlexWrapper)`
    flex-grow: 1;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    transition: opacity 0.3s;
    opacity: ${({$hidden}) => $hidden ? 0 : 1};

    & button {
        margin-top: auto;
        margin-bottom: calc(var(--spacing_x4) * 4);
    }
`;

const HomeButton = styled(IconButton)`
    margin-bottom: var(--spacing_x3);
    margin-left: calc(0px - var(--spacing_x3));
    align-self: flex-start;
`;

const LEVEL_TO_QUESTIONS = {
    1: questionsLevel1,
    2: questionsLevel2,
    3: questionsLevel3,
    4: questionsLevel4,
    5: questionsLevel5,
}

export const AnswersScreen = ({level}) => {
    const { next, user } = useProgress();
    const [currentId, setCurrentId] = useState(0);
    const questions = LEVEL_TO_QUESTIONS[level].filter(({isHidden}) => !isHidden);
    const currentQuestion = useMemo(() => questions[currentId], [questions, currentId]);

    const handleNextQuestion = async () => {
        if (currentId === (questions.length - 1)){ 
            next(SCREENS.LOBBY);
            return;
        }

        setCurrentId(prev => prev + 1);
    }

    const handlePrevQuestion = async () => {
        if (currentId === 0) return;

        setCurrentId(prev => prev - 1);
    }

    return (
        <Wrapper>
            <HomeButton color="green" onPointerDown={() => next(SCREENS.LOBBY)}>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.666748 7.01707L6.99959 2.32688C7.58806 1.89104 8.4121 1.89104 9.00058 2.32688L15.3334 7.01707M3.11119 5.4653V12.4482C3.11119 13.3053 3.8408 14 4.74082 14H11.2593C12.1594 14 12.889 13.3053 12.889 12.4482V5.4653" stroke="white" strokeWidth="1.33333" strokeLinecap="round"/>
                        <path d="M3.11119 12.4482V5.35987C3.11119 5.29649 3.03902 5.26013 2.98809 5.29785L6.99959 2.32688C7.29387 2.10892 7.64708 1.99996 8.00027 2C9.19297 2.29822 10.6364 3.62713 12.2944 4.80056C12.6612 5.06013 12.889 5.47734 12.889 5.92667V12.4482C12.889 13.3053 12.1594 14 11.2593 14H4.74082C3.8408 14 3.11119 13.3053 3.11119 12.4482Z" fill="none"/>
                    </svg>
            </HomeButton>
            <p>
                <b>
                    {(typeof currentQuestion?.text === 'function') ? currentQuestion?.text(user.sex) : currentQuestion?.text}
                </b>
            </p>
            <AnswersBlock>
                {currentQuestion?.answers?.map((answer) => (
                    <RadioInputStyled key={answer.id}>
                        <Point $isCorrect={answer.isCorrect}/>
                        <p>{answer.text}</p>
                    </RadioInputStyled>
                ))}
            </AnswersBlock>
            <ButtonWrapper>
                <Button $hidden={currentId === 0} onClick={handlePrevQuestion}>
                    Назад
                </Button>
                <Button onClick={handleNextQuestion}>
                    {currentId === questions.length - 1 ? 'В лобби' : 'Далее'}
                </Button>
            </ButtonWrapper>
        </Wrapper>
    )
}