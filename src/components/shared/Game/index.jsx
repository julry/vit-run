import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {AnimatePresence, motion, useMotionValue, useAnimationFrame, useTransform} from "framer-motion";
import throttle from "lodash/throttle";
// import random from "lodash/random";
import clamp from "lodash/clamp";
import styled from "styled-components";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Board, WIDTH} from "./Board";
import { Character } from "../Character";
import { useProgress } from "../../../contexts/ProgressContext";
import { weeks } from "../../../constants/weeks";
import { GameHeader } from "../GameHeader";
import { Modal } from "../modals";
import { Block } from "../Block";
import { Button } from "../Button";
import { SEX } from "../../../constants/sex";

const MAX_LIVES = 3;
export const CHARACTER_STEP = 2;

const STARS_BY_LEVEL = {
    1: [],
    2: [],
    3: [],
    4: [],
}

const SNAKES_BY_LEVEL = {
    1: [],
    2: [],
    3: [],
    4: []
}

const STAR_WIDTH = 44;
const STAR_HEIGHT = 47;

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
    /* bottom: 9.5%; */
    left: 0;
    z-index: 3;
`;

const BoardStyled = styled(Board)`
    width: 100%;
    height: 100%;
`;

export function Game({ className, level, isPaused, customText, preloadBg }) {
    const sizeRatio = useSizeRatio();
    const { user, questionsAmount, setQuestionsAmount, setPassedWeeks, setGamePoints, next } = useProgress();
    const { trashes = [], figures = [], questions = [] } = weeks.find(({week}) => week === level) ?? {};

    const [wrapperRect, setWrapperRect] = useState(null);
    const [characterSize, setCharacterSize] = useState([]);
    const [isGamePaused, setIsGamePaused] = useState(isPaused);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isJumping, setIsJumping] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [stars, setStars] = useState(STARS_BY_LEVEL[level]);
    const [shownQuestions, setShownQuestions] = useState(questions);
    const [shownFigures, setShownFigures] = useState(figures);
    const [collidedTrashAmount, setCollidedTrashAmount] = useState(0);
    const [isWinModal, setIsWinModal] = useState(false);
    const [isQuestionPart, setIsQuestionPart] = useState(false);

    const wrapperRef = useRef();
    const collidedStarRef = useRef(null);
    const collidedSnakeRef = useRef(null);
    const collidedTrashRef = useRef(null);
    const characterRef = useRef(null);


    const initialCharacterPosition = useMemo(() => [
        0,
        0 - (wrapperRect?.height ?? 0) * 0.095 ,
    ], [sizeRatio, wrapperRect]);

    const characterPosition = useMotionValue({});
    const trashesPosition = useMotionValue({});
    const figuresPosition = useMotionValue({});
    const questionsPosition = useMotionValue({});

    const initPositions = useCallback(() => {
        trashesPosition.set(
            trashes.reduce((acc, trash) => ({
                ...acc,
                [trash.id]: [trash.position[0] * sizeRatio, trash.position[1] * sizeRatio],
            }), {})
        );
        figuresPosition.set(
            figures.reduce((acc, figure) => ({
                ...acc,
                [figure.id]: [figure.position[0] * sizeRatio, figure.position[1] * sizeRatio],
            }), {})
        );
        questionsPosition.set(
            questions.reduce((acc, question) => ({
                ...acc,
                [question.id]: [question.position[0] * sizeRatio, question.position[1] * sizeRatio],
            }), {})
        );

        characterPosition.set(initialCharacterPosition);
    }, [sizeRatio]);

    const resetGame = useCallback(() => {
        initPositions();
        setShownQuestions(questions);
        setShownFigures(figures);
    }, []);

    useEffect(() => {
        initPositions();
    }, [sizeRatio]);

    const characterDelta = useTransform(
        characterPosition,
        prev => {
            const leftDelta = prev[0] - wrapperRect?.width/2 + characterSize[0]/2 * sizeRatio;
            const rightDelta = prev[0] + wrapperRect?.width/2 + (characterSize[0]/2 - WIDTH) * sizeRatio;
            const bottomDelta = prev[1];

            let x;
            let y = bottomDelta; 

            if (Math.abs(leftDelta) > Math.abs(rightDelta)) {
                x = clamp(
                    rightDelta,
                    0,
                    wrapperRect?.width/2 - characterSize[0]/2 * sizeRatio,
                );
            } else {
                x = clamp(
                    leftDelta,
                    characterSize[0]/2 * sizeRatio - wrapperRect?.width/2,
                    0,
                );
            }

            return [x, y];
        }
    );

    const boardPositionX = useTransform(
        [characterPosition, characterDelta],
        ([prevPosition, prevDelta]) => {
            let position = -prevPosition[0] + wrapperRect?.width/2 - characterSize[0]/2 * sizeRatio + prevDelta[0];

            if (position <= 0 - WIDTH * sizeRatio + wrapperRect?.width) {
                position = 0 - WIDTH * sizeRatio + wrapperRect?.width;
            }

            return `${position}px`
        }
    );

    const characterPositionX = useTransform(
        characterDelta,
        prev => `${wrapperRect?.width/2 - characterSize[0]/2 * sizeRatio + prev[0]}px`,
    );

    const characterPositionY = useTransform(
        characterDelta,
        prev => `${0 - prev[1]}px`,
    );

    const handleTapStart = (event) => {
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
        characterPosition.set([initialCharacterPosition[0], rect?.height * 0.095]);
        setCharacterSize([character.width, character.height])
    };

    useLayoutEffect(() => {
        updateWrapperRect();
    }, [sizeRatio])

    useResizeObserver({ onResize: updateWrapperRect, ref: wrapperRef })

    // useEffect(() => {
    //     if (collidedStarRef.current) {
    //         addGamePoint();
    //         setStarsCollected(prev => prev + 1);
    //         collidedStarRef.current = null;
    //     }
        // if (stars.length === 0) {
        //     const additionalPoints = MAX_LIVES - collidedSnakesAmount > 0 ? MAX_LIVES - collidedSnakesAmount : 0;
        //     endGame(level, additionalPoints);
        //     setPassedWeeks(prev => !prev.includes(level) ? [...prev, level] : prev);
        //     setModal({
        //         visible: true,
        //         type: 'win', 
        //         customText, 
        //         isDarken: true,
        //         level,
        //         additionalPoints: MAX_LIVES - collidedSnakesAmount > 0 ? MAX_LIVES - collidedSnakesAmount : 0
        //     })
        // }
    // }, [stars]);

    useEffect(() => {
        if (!collidedTrashRef.current) return;
        resetGame();
        collidedTrashRef.current = null;
    }, [collidedTrashAmount])

    useAnimationFrame(() => {
        if (!isGameStarted || isGamePaused || isWinModal) {
            return;
        }

        // const prevSnakesDirection = snakesDirection.get();
        // const prevSnakesPosition = snakesPosition.get();
        const [prevX, prevY] = characterPosition.get();

        let nextY = prevY;
        let nextX = clamp(
            prevX + 5,
            0,
            (WIDTH - characterSize[0] - 10) * sizeRatio,
        );

        if (nextX === (WIDTH - characterSize[0] - 10) * sizeRatio) {
            nextY = -initialCharacterPosition[1];
            setIsGamePaused(true);
            setIsWinModal(true);
        }

        if (isJumping) {
            if (isUp) {
                nextY = nextY + 8;
                if (nextY >= ((-initialCharacterPosition[1]) + 180)) {
                    setIsUp(false);
                }
            } else if (nextY > -initialCharacterPosition[1]) {
                nextY = nextY - 8;
            } 

            if (nextY <= -initialCharacterPosition[1] && !isUp) {
                setIsJumping(false);
            }
        }
        

        // const nextSnakesDirection = SNAKES_BY_LEVEL[level].reduce((acc, snake) => {
        //     const prevPosition = prevSnakesPosition[snake.id];
        //     const prevDirection = prevSnakesDirection[snake.id];

        //     if (prevPosition[0] <= 0 || prevPosition[0] + SNAKE_SIZE_BY_LEVEL[level][0] * sizeRatio >= WIDTH * sizeRatio) {
        //         return {
        //             ...prevSnakesDirection,
        //             ...acc,
        //             [snake.id]: [-prevDirection[0], prevDirection[1]],
        //         };
        //     }

        //     if (prevPosition[1] <= 0 || prevPosition[1] + SNAKE_SIZE_BY_LEVEL[level][1] * sizeRatio >= HEIGHT * sizeRatio) {
        //         return {
        //             ...prevSnakesDirection,
        //             ...acc,
        //             [snake.id]: [prevDirection[0], -prevDirection[1]],
        //         };
        //     }

        //     return {
        //         ...acc,
        //         [snake.id]: prevDirection,
        //     };
        // }, {});

        // const nextSnakesPosition = SNAKES_BY_LEVEL[level].reduce((acc, snake) => {
        //     return {
        //         ...prevSnakesPosition,
        //         ...acc,
        //         [snake.id]: [
        //             prevSnakesPosition[snake.id][0] + nextSnakesDirection[snake.id][0],
        //             prevSnakesPosition[snake.id][1] + nextSnakesDirection[snake.id][1],
        //         ],
        //     };
        // }, {});

        characterPosition.set([nextX, nextY]);
        // snakesPosition.set(nextSnakesPosition);
        // snakesDirection.set(nextSnakesDirection);

        if (!collidedStarRef.current) {
            const collidedStar = stars.find(({ position }) => {
                const starData = {
                    x: position[0] * sizeRatio + STAR_WIDTH * sizeRatio /2 ,
                    // y: position[1] * sizeRatio + STAR_HEIGHT * sizeRatio/2 ,
                    r: STAR_WIDTH * sizeRatio /2 ,
                };

                const characterData = {
                    x: nextX + characterSize[0] * sizeRatio / 2,
                    // y: nextY + characterSize[1] * sizeRatio / 2,
                    rx: characterSize[0] * sizeRatio / 2,
                    ry: characterSize[1] * sizeRatio / 2 ,
                };

                return Math.hypot(starData.x - characterData.x, starData.y - characterData.y) <= starData.r + Math.max(characterData.rx, characterData.ry);
            });

            if (collidedStar) {
                collidedStarRef.current = collidedStar;
                setStars(prev => prev.filter(star => star.id !== collidedStar.id))
            }
        }
        
        if (!collidedSnakeRef.current) {
            const collidedSnake = SNAKES_BY_LEVEL[level].find(({ id }) => {
                const snakeData = {
                    // x: nextSnakesPosition[id][0] + SNAKE_SIZE_BY_LEVEL[level][0]/2 * sizeRatio,
                    // y: nextSnakesPosition[id][1] + SNAKE_SIZE_BY_LEVEL[level][1]/2 * sizeRatio,
                    // r: SNAKE_SIZE_BY_LEVEL[level][1]/2 * sizeRatio,
                };
                const characterData = {
                    x: nextX + characterSize[0]/2 * sizeRatio,
                    y: prevY + characterSize[1]/2 * sizeRatio,
                    rx: characterSize[0]/2 * sizeRatio,
                    ry: characterSize[1]/2 * sizeRatio,
                };

                return Math.hypot(snakeData.x - characterData.x, snakeData.y - characterData.y) <= snakeData.r + Math.max(characterData.rx, characterData.ry);
            });

            if (collidedSnake) {
                collidedSnakeRef.current = collidedSnake;
                characterPosition.set(initialCharacterPosition);
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
            <GameHeader />
            <BoardStyled
                level={level}
                preloadBg={preloadBg}
                imageProps={{style: {x: boardPositionX}}}
            >
                {/* {stars.map((star) => (
                    <Star 
                        key={star.id}
                        star={star}
                        starsPosition={starsPosition}
                    />
                ))}
                 <AnimatePresence>
                    {SNAKES_BY_LEVEL[level].map((snake) => (
                        <Snake
                            level={level}
                            key={snake.id}
                            snake={snake}
                            snakesPosition={snakesPosition}
                        />
                    ))}
                </AnimatePresence> */}
            </BoardStyled>
            <CharacterStyled
                ref={characterRef}
                level={level}
                isPause={!isGameStarted || isGamePaused}
                ratio={sizeRatio}
                style={{x: characterPositionX, y: characterPositionY}}
            />
        </Wrapper>
        <Modal isShown={isWinModal}>
            <Block>
                {isQuestionPart ? (
                    <>
                        <p>
                            Тебе удалось открыть {questionsAmount ?? 0} вопросов.{'\n'}
                            Помимо них, мы даем тебе 3 бонусных вопроса. За каждый верный ответ ты получишь Виткоины.
                        </p>
                        <Button onClick={() => next()}>К вопросам</Button>
                    </>
                    
                ) : (
                    <>
                        {customText(user.sex)}
                        <Button onClick={() => setIsQuestionPart(true)}>Готов{user.sex === SEX.Female ? 'a' : ''}</Button>
                    </>
                )}
            </Block>
        </Modal>
       </>
    );
}