import { useMemo, useState } from "react";
import styled from "styled-components"
import { SCREENS } from "../../constants/screens";
import { SEX } from "../../constants/sex";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { Button } from "./Button";
import { FlexWrapper } from "./FlexWrapper";
import { ErrorModal } from "./modals/ErrorModal";
import { RadioInput } from "./RadioInput";

const Wrapper = styled(FlexWrapper)`
   padding: var(--spacing_x4);
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

const ImageStyled = styled.img`
    margin-top: var(--spacing_x3);
    width: ${({$ratio}) => $ratio * 120}px;
    height: ${({$ratio}) => $ratio * 80}px;
`;

const RadioInputStyled = styled(RadioInput)`
    font-size: var(--font_md);

    & p {
        margin-top: calc(0px - var(--spacing_x1) / 2);
    }

    &:first-child {
        margin-top: 0;
    }
`;

const DoneBlock = styled.div`
    width: 100%;
    padding: var(--spacing_x2) var(--spacing_x3);
    border-radius: var(--spacing_x4);
    border: 1px solid white;
    margin: var(--spacing_x2) 0;
    margin: auto;
`;

const ButtonWrapper = styled(FlexWrapper)`
    flex-grow: 1;
    height: auto;

    & button {
        margin-top: auto;
        margin-bottom: calc(var(--spacing_x4) * 4);
    }
`;

export const PostGame = ({level, questions}) => {
    const ratio = useSizeRatio();
    const { next, user, endQuestions, getUserInfo, setUserInfo } = useProgress();
    const [currentId, setCurrentId] = useState(0);
    const [chosen, setChosen] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isIdError, setIdError] = useState(false);
    const [isFirstTimeError, setIsFirstTimeError] = useState(false);
    const [isAlreadyPassed, setIsAlreadyPassed] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState(false);
    const [questionsPoints, setQuestionsPoints] = useState(0);
    const { questionsAmount = 0 } = useProgress();
    const amount = (user.weekQuestions[level] ?? questionsAmount);
    const shownQuestions = useMemo(() => questions.sort(() => Math.random() * 2 - 1).slice(0, (amount + 3)), [questions]);
    const currentQuestion = useMemo(() => shownQuestions[currentId], [shownQuestions, currentId]);

    const handleUpdate = async () => {
        if (isUpdating) return;

        setIsUpdating(true);

        let infoRes = {};

        if (isIdError) {
            infoRes = await getUserInfo(user.email, true);
            if (!infoRes?.isError) {
                await setUserInfo({recordId: infoRes.id});
                setIdError(false);
            }
        } 

        const endGameRes = await endQuestions(level, questionsPoints, infoRes?.id);

        if (!endGameRes.isError) setIsDone(true);

        setIsUpdating(false);

        return endGameRes.isError;
    }

    const handleNextQuestion = async () => {
        if (isDone) {
            if (isUpdating) return;

            if (isFirstTimeError) {
                const updateError = await handleUpdate();

                if (updateError) {
                    setIsErrorModal(true);
                    return;
                }
            }

            reachMetrikaGoal(`finish-${level}`);
            next(SCREENS.LOBBY);
            
            return;
        }
        let correctAmount = 0;
        let answerPoints = questionsPoints;
        
        chosen.forEach((ans) => {
            if (currentQuestion.answers.find(({id}) => ans === id)?.isCorrect) {
                correctAmount = correctAmount + 1;
            }
        })

        let allCorrectAmount = currentQuestion.answers.filter(({isCorrect}) => isCorrect).length;

        if (allCorrectAmount === currentQuestion.answers.length) {
            allCorrectAmount = 1;
        }

        if (correctAmount === allCorrectAmount) {
            answerPoints = answerPoints + 1;
            setQuestionsPoints(prev => prev + 1);
        }

        if (currentId === (shownQuestions.length - 1)){ 
            setIsDone(true);
            setIsUpdating(true);
            const endRes = await endQuestions(level, answerPoints);
            setIsUpdating(false);
            if (endRes?.isError) setIsFirstTimeError(true);
            if (endRes?.isAlreadyPassedError) setIsAlreadyPassed(true);
            return;
        }

        setChosen([]);
        setCurrentId(prev => prev + 1);
    }

    const pickAnswer = (answer) => {
        const amount = currentQuestion.amount ?? 1;
        if (amount > 1 && (chosen.length + 1 > amount)) return;
        if (amount === 1) {
            setChosen([answer]);
        } else setChosen((prev) => [...prev, answer]);
    }

    const removeAnswer = (answer) => {
        setChosen((prev) => prev.filter((id) => id !== answer));
    }

    const handleChange = (answer) => {
        if (chosen.includes(answer)) removeAnswer(answer);
        else pickAnswer(answer);
    }

    return (
       <>
             <Wrapper>
                <p>
                    <b>
                        {(typeof currentQuestion?.text === 'function') ? currentQuestion?.text(user.sex) : currentQuestion?.text}
                    </b>
                </p>
                <AnswersBlock>
                    {currentQuestion?.answers?.map((answer) => (
                        <RadioInputStyled key={answer.id} checked={chosen?.includes(answer?.id)} onChange={() => handleChange(answer.id)}>
                            <FlexWrapper>
                                <p>{answer.text}</p>
                                {answer.image && <ImageStyled $ratio={ratio} src={answer.image} alt="" />}
                            </FlexWrapper>
                        </RadioInputStyled>
                    ))}
                </AnswersBlock>
                <ButtonWrapper>
                    {isDone && (
                        <DoneBlock>
                            <p>
                                Ура! Ты набрал{user.sex === SEX.Female ? 'а': ''} {questionsPoints} балл{questionsPoints === 1 ? '' : questionsPoints > 1 && questionsPoints < 5 ? 'a' : 'ов'}.{'\n'}
                                Верные ответы ты узнаешь в конце марафона.
                            </p>
                        </DoneBlock>
                    )}
                    <Button disabled={!isDone && !chosen.length || isDone && isUpdating} onClick={handleNextQuestion}>
                        Далее
                    </Button>
                </ButtonWrapper>
            </Wrapper>
            <ErrorModal isShown={isErrorModal} onRetry={handleUpdate} isPassed={isAlreadyPassed}/>
       </>
    )
}