import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {motion, useMotionValue, useAnimationFrame, useTransform} from "framer-motion";
import throttle from "lodash/throttle";
// import random from "lodash/random";
import clamp from "lodash/clamp";
import styled from "styled-components";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Board, WIDTH} from "./Board";
import { Character } from "../Character";
import { useProgress } from "../../../contexts/ProgressContext";
import { SCALE_K, subjectK, weeks } from "../../../constants/weeks";
import { GameHeader } from "../GameHeader";
import { Modal } from "../modals";
import { Block } from "../Block";
import { Button } from "../Button";
import { Subject } from "./Subject";
import { QuestionSubject, QUESTION_HEIGHT, QUESTION_WIDTH } from "./QuestionSubject";
import { ItemsBoard } from "./ItemsBoard";
import { SCREENS } from "../../../constants/screens";

const Wrapper = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    touch-action: none;

    ${({$isOver}) => $isOver ? 'filter: blur(5px)' : ''};
`;

const CharacterStyled = styled(Character)`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 3;
`;

const BoardStyled = styled(Board)`
    width: 100%;
    height: 100%;
`;

const ModalBlock = styled(Block)`
    margin: var(--spacing_small);
    text-align: left;

    & button {
        margin-top: var(--spacing_x4);
    }
`;

const ExitBlock = styled(Block)`
    border: 1px solid #254F36;
    border-radius: var(--spacing_x2);
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
    margin-top: calc(3 * var(--spacing_x6));

    & svg path{
        stroke: #254F36
    }
`;

const ButtonsBlock = styled.div`
    display: flex;
    margin-top: var(--spacing_x4);
    justify-content: space-between;
    width: 100%;

    & button + button {
        margin-left: var(--spacing_x2);
    }
`;

const INITIAL_Y = 54.5;

export function Game({ className, level, isPaused, customText, preloadBg }) {
    const sizeRatio = useSizeRatio();
    const { user, questionsAmount, setQuestionsAmount, endGame, setGamePoints, next } = useProgress();
    const { trashes = [], figures = [], questions = [] } = weeks.find(({week}) => week === level) ?? {};
    const [wrapperRect, setWrapperRect] = useState(null);

    const initialFigures = useMemo(() => {
        const isScaling = wrapperRect?.width <= 450 && wrapperRect?.height >= 750;
        const scale = isScaling ? SCALE_K : 1;

        if (scale > 1) {
            return figures.map((figure) => ({...figure, position: [figure.position[0], figure.position[1] * scale]}));
        }

        return figures;
    }, [wrapperRect]);
    
    const initialQuestions = useMemo(() => {
        const isScaling = wrapperRect?.width <= 450 && wrapperRect?.height >= 750;
        const scale = isScaling ? SCALE_K : 1;

        if (scale > 1) {
            return questions.map((question) => ({...question, position: [question.position[0], question.position[1] * scale]}));
        }

        return questions;
    }, [wrapperRect]);

    const initialTrashes = useMemo(() => {
        const isScaling = wrapperRect?.width <= 450 && wrapperRect?.height >= 750;
        const scale = isScaling ? SCALE_K : 1;

        if (scale > 1) {
            return trashes.map((trash) => ({...trash, position: [trash.position[0], trash.position[1] * scale]}));
        }

        return trashes;
    }, [wrapperRect]);

    const [characterSize, setCharacterSize] = useState([]);
    const [isPauseModal, setIsPauseModal] = useState(false);
    const [rulesModal, setRulesModal] = useState({visible: false, part: 0});
    const [isGamePaused, setIsGamePaused] = useState(isPaused);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [shownQuestions, setShownQuestions] = useState(initialQuestions);
    const [shownFigures, setShownFigures] = useState(initialFigures);
    const [collidedTrashAmount, setCollidedTrashAmount] = useState(0);
    const [isWinModal, setIsWinModal] = useState(false);
    const [isQuestionPart, setIsQuestionPart] = useState(false);

    const wrapperRef = useRef();
    const collidedFigureRef = useRef(null);
    const collidedQuestionRef = useRef(null);
    const collidedTrashRef = useRef(null);
    const characterRef = useRef(null);

    const initialCharacterPosition = useMemo(() => [0,0], []);

    const characterPosition = useMotionValue({});
    const trashesPosition = useMotionValue({});
    const figuresPosition = useMotionValue({});
    const questionsPosition = useMotionValue({});

    const initPositions = useCallback(() => {
        trashesPosition.set(
            initialTrashes.reduce((acc, trash) => ({
                ...acc,
                [trash.id]: [trash.position[0] * sizeRatio, trash.position[1] * sizeRatio],
            }), {})
        );
        figuresPosition.set(
            initialFigures.reduce((acc, figure) => ({
                ...acc,
                [figure.id]: [figure.position[0] * sizeRatio, figure.position[1] * sizeRatio],
            }), {})
        );
        questionsPosition.set(
            initialQuestions.reduce((acc, question) => ({
                ...acc,
                [question.id]: [question.position[0] * sizeRatio, question.position[1] * sizeRatio],
            }), {})
        );

        characterPosition.set(initialCharacterPosition);

    }, [sizeRatio, wrapperRect]);

    const resetGame = useCallback(() => {
        initPositions();
        setShownQuestions(initialQuestions);
        setShownFigures(initialFigures);
        setIsGameStarted(false);
        setQuestionsAmount(0);
        setGamePoints(0);
    }, [sizeRatio, wrapperRect]);

    useEffect(() => {
        initPositions();
    }, [sizeRatio, wrapperRect]);

    const characterDelta = useTransform(
        characterPosition,
        prev => {
            const leftDelta = prev[0] - wrapperRect?.width/2 + 4 * characterSize[0]/ 5 * sizeRatio;
            const rightDelta = prev[0] + wrapperRect?.width/2 + (4 * characterSize[0]/ 5 - WIDTH) * sizeRatio;
            const bottomDelta = prev[1];

            let x;
            let y = bottomDelta; 

            if (Math.abs(leftDelta) > Math.abs(rightDelta)) {
                x = clamp(
                    rightDelta,
                    0,
                    wrapperRect?.width/2 - characterSize[0] / 5 * sizeRatio,
                );
            } else {
                x = clamp(
                    leftDelta,
                    characterSize[0] / 5 * sizeRatio - wrapperRect?.width/2,
                    0,
                );
            }

            return [x, y];
        }
    );

    const boardPositionX = useTransform(
        [characterPosition, characterDelta],
        ([prevPosition, prevDelta]) => {
            let position = -prevPosition[0] + wrapperRect?.width/2 - 4 * characterSize[0]/ 5 * sizeRatio + prevDelta[0];

            if (position <= 0 - WIDTH * sizeRatio + wrapperRect?.width) {
                position = 0 - WIDTH * sizeRatio + wrapperRect?.width;
            }

            return `${position}px`
        }
    );

    const characterPositionX = useTransform(
        characterDelta,
        (prev) => {
            const position = wrapperRect?.width/2 - 4 * characterSize[0] / 5 * sizeRatio + prev[0] - 30 * sizeRatio;

            return (position > 0 ? `${position}px` : '10px');
        }
    );

    const characterPositionY = useTransform(
        characterDelta,
        prev => `${prev[1] - INITIAL_Y * sizeRatio * subjectK}px`
    );

    const handleTapStart = () => {
        if (isGamePaused) return;

        if (!isGameStarted) {
            setIsGameStarted(true);
        } else if (!isJumping) {
            setIsJumping(true);
            setIsUp(true);
        }
    };

    const updateWrapperRect = () => {
        const rect = wrapperRef.current?.getBoundingClientRect?.();
        const character = characterRef.current?.getBoundingClientRect?.();
        setWrapperRect(rect);
        setCharacterSize([character.width, character.height]);
        setShownQuestions(prev => prev.map(q => initialQuestions.find(initial => initial.id === q.id)));
        setShownFigures(prev => prev.map(q => initialFigures.find(initial => initial.id === q.id)));
    };

    useLayoutEffect(() => {
        updateWrapperRect();
    }, [sizeRatio])

    useResizeObserver({ onResize: updateWrapperRect, ref: wrapperRef })

    useEffect(() => {
        if (collidedFigureRef.current) {
            setGamePoints(prev => prev + 1);
            collidedFigureRef.current = null;
        }
    }, [shownFigures]);

    useEffect(() => {
        if (collidedQuestionRef.current) {
            setQuestionsAmount(prev => prev + 1);
            collidedQuestionRef.current = null;
        }
    }, [shownQuestions]);

    useEffect(() => {
        if (!collidedTrashRef.current) return;
        resetGame();
        collidedTrashRef.current = null;
    }, [collidedTrashAmount]);

    const handleHouseClick = () => {
        setIsPauseModal(true);
        setIsGamePaused(true);
    }
    
    const handleCloseExit = () => {
        setIsPauseModal(false);
        setIsGamePaused(false);
    }

    const handleRulesClick = () => {
        setRulesModal({visible: true, part: 0});
        setIsGamePaused(true);
    }
    
    const handleCloseRules = () => {
        setRulesModal({visible: false, part: 0});
        setIsGamePaused(false);
    }

    useAnimationFrame(() => {
        if (!isGameStarted || isGamePaused || isWinModal) {
            return;
        }

        const [prevX, prevY] = characterPosition.get();

        let nextY = prevY;
        let nextX = clamp(
            prevX + (5 * subjectK * sizeRatio),
            0,
            (WIDTH + 2 * characterSize[0]) * sizeRatio,
        );

        if (isJumping) {
            if (isUp) {
                nextY = nextY - (4 * subjectK * sizeRatio);
                if (nextY <= (initialCharacterPosition[1] - (160 * subjectK * sizeRatio))) {
                    setIsUp(false);
                }
            } else if (nextY < initialCharacterPosition[1]) {
                nextY = nextY + (4 * subjectK * sizeRatio);
            } 

            if (nextY >= initialCharacterPosition[1] && !isUp) {
                setIsJumping(false);
            }
        }
        
        if (nextX >= WIDTH * sizeRatio - wrapperRect?.width / 2 + 2 * characterSize[0] / 3) {
            nextY = initialCharacterPosition[1];
            setIsGamePaused(true);
            setIsWinModal(true);
            endGame();
        }

        characterPosition.set([nextX, nextY]);

        if (!collidedFigureRef.current) {
            const collidedFigure = shownFigures.find(({width, height, id, position}) => {
                const figureData = {
                    x1: (position[0] + width * 0.6) * sizeRatio,
                    x2: (position[0] + width) * sizeRatio,
                    y1: (position[1] + height * 0.2) * sizeRatio * subjectK,
                    y2: (position[1] * subjectK + height) * sizeRatio,
                };
                const characterData = {
                    x1: nextX,
                    x2: nextX + characterSize[0],
                    y1: -nextY + INITIAL_Y * subjectK * sizeRatio,
                    y2: -nextY + characterSize[1] + INITIAL_Y * subjectK * sizeRatio,
                };

                const isX = characterData.x2 >= figureData.x1 && characterData.x1 <= figureData.x2;
                const isY = characterData.y2 >= figureData.y1 && characterData.y1 <= figureData.y2;

                return isX && isY;
            });

            if (collidedFigure) {
                collidedFigureRef.current = collidedFigure;
                setShownFigures(prev => prev.filter(fig => fig.id !== collidedFigure.id))
            }
        }


        if (!collidedQuestionRef.current) {
            const collidedQuestion = shownQuestions.find(({position}) => {
                const figureData = {
                    x1: (position[0] + QUESTION_WIDTH * 0.6) * sizeRatio,
                    x2: (position[0] + QUESTION_WIDTH) * sizeRatio,
                    y1: (position[1] + QUESTION_HEIGHT * 0.3) * sizeRatio * subjectK,
                    y2: (position[1] * subjectK + QUESTION_HEIGHT) * sizeRatio,
                };
                const characterData = {
                    x1: nextX,
                    x2: nextX + characterSize[0],
                    y1: -nextY + INITIAL_Y * subjectK * sizeRatio,
                    y2: -nextY + characterSize[1] + INITIAL_Y * subjectK * sizeRatio,
                };

                const isX = characterData.x2 >= figureData.x1 && characterData.x1 <= figureData.x2;
                const isY = characterData.y2 >= figureData.y1 && characterData.y1 <= figureData.y2;

                return isX && isY;
            });
            
            if (collidedQuestion) {
                collidedQuestionRef.current = collidedQuestion;
                setShownQuestions(prev => prev.filter(fig => fig.id !== collidedQuestion.id))
            }
        }

        if (!collidedTrashRef.current) {
            const collidedTrash = initialTrashes.find(({width, height, id, position}) => {
                const figureData = {
                    x1: (position[0] + width * 0.45) * sizeRatio,
                    x2: (position[0] + width * 0.55) * sizeRatio,
                    y1: (position[1] + height / 3) * sizeRatio * subjectK,
                    y2: (position[1] + height * 2 / 3) * sizeRatio,
                };
                const characterData = {
                    x1: nextX,
                    x2: nextX + characterSize[0],
                    y1: -nextY + INITIAL_Y * subjectK * sizeRatio,
                    y2: -nextY + characterSize[1] + INITIAL_Y * subjectK * sizeRatio,
                };

                const isX = characterData.x2 >= figureData.x1 && characterData.x1 <= figureData.x2;
                const isY = characterData.y1 <= figureData.y2;

                return isX && isY;
            });

            if (collidedTrash) {
                collidedTrashRef.current = collidedTrash;
                setCollidedTrashAmount(prev => prev + 1);
            }
        }
    });

    return (
       <>
        <Wrapper
            ref={wrapperRef}
            className={className}
            ratio={sizeRatio}
            onPointerDown={handleTapStart}
            $isOver={isWinModal}
        >
            <GameHeader onHomeClick={handleHouseClick} onRulesClick={handleRulesClick}/>
            <BoardStyled
                level={level}
                preloadBg={preloadBg}
                imageProps={{style: {x: boardPositionX}}}
            />
            <ItemsBoard
                imageProps={{style: {x: boardPositionX}}}
            >
                {
                    shownFigures.map((figure) => (
                         <Subject 
                            key={figure.id}
                            subject={figure}
                            subjectPosition={figuresPosition}
                         />
                    ))
                }
                {
                    initialTrashes.map((trash) => (
                         <Subject
                            key={trash.id}
                            subject={trash}
                            subjectPosition={trashesPosition}
                         />
                    ))
                }
                {
                    shownQuestions.map((question) => (
                         <QuestionSubject 
                            key={question.id}
                            question={question}
                            questionsPosition={questionsPosition}
                         />
                    ))
                }
            </ItemsBoard>
            <CharacterStyled
                ref={characterRef}
                level={level}
                isPause={!isGameStarted || isGamePaused}
                ratio={sizeRatio}
                style={{x: characterPositionX, y: characterPositionY}}
            />
        </Wrapper>
        <Modal isShown={isWinModal}>
            <ModalBlock>
                {isQuestionPart ? (
                    <>
                        <p>
                            Тебе удалось открыть <b>{questionsAmount ?? 0} вопросов</b>.{'\n'}
                            Помимо них, мы даем тебе <b>3 бонусных вопроса</b>. За каждый верный ответ ты получишь Виткоины.
                        </p>
                        <Button onClick={() => next()}>К вопросам</Button>
                    </>
                    
                ) : (
                    <>
                        {customText(user.sex)}
                        <Button onClick={() => setIsQuestionPart(true)}>ДАЛЕЕ</Button>
                    </>
                )}
            </ModalBlock>
        </Modal>
        <Modal isShown={isPauseModal}>
            <ExitBlock onClose={handleCloseExit}>
                <p>
                    Если ты перейдёшь в лобби,{'\n'}твой прогресс не сохранится.
                </p>
                <ButtonsBlock>
                    <Button color="green" onClick={() => next(SCREENS.LOBBY)}>ЛОББИ</Button>
                    <Button onClick={handleCloseExit}>остаться</Button>
                </ButtonsBlock>
            </ExitBlock>
        </Modal>
        <Modal isShown={rulesModal.visible} isDarken>
            <ModalBlock onClose={handleCloseRules}>
                {rulesModal.part === 0 ? (
                    <>
                        <p>
                            Твой персонаж всегда бежит вперёд.{'\n'}
                            <b>Собирай предметы и знаки вопроса</b>, но <b>избегай препятствий</b>!{' '}
                            Если столкнёшься с ними — начнёшь заново. Кликни на экран, чтобы перепрыгнуть препятствие.{' '}
                            У тебя есть одна попытка на прохождение уровня.
                        </p>
                        <ButtonsBlock>
                            <Button color="white" onClick={handleCloseRules}>НАЗАД</Button>
                            <Button onClick={() => setRulesModal({visible: true, part: 1})}>ДАЛЕЕ</Button>
                        </ButtonsBlock>
                    </>
                ) : (
                    <>
                        <p>
                            В игре нужно <b>собирать полезные предметы</b>: продукты, анкеты, телефоны, термометры.{' '}
                            Они конвертируются в Виткоины. Всего на уровень их 10. <b>Старайся избегать препятствий:</b> {' '}
                            сломанных объектов, пустых коробок и упаковок. Также <b>не пропускай вопросы</b>, после забега ты{' '}
                            можешь <b>получить Виткоины за правильные ответы</b>! Чем больше Виткоинов, тем выше твоё положение{' '}
                            в рейтинге и возможность выиграть призы!
                        </p>
                        <ButtonsBlock>
                            <Button color="white" onClick={() => setRulesModal({visible: true, part: 1})}>НАЗАД</Button>
                            <Button onClick={handleCloseRules}>ДАЛЕЕ</Button>
                        </ButtonsBlock>
                    </>
                )}
            </ModalBlock>
        </Modal>
       </>
    );
}