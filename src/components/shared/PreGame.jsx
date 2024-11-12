import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import question from '../../assets/images/question.svg';
import { subjectK, weeks } from "../../constants/weeks";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Block } from "./Block";
import { Button, CurButton } from "./Button";
import { Character } from "./Character";
import { FlexWrapper } from "./FlexWrapper";
import { GameHeader } from "./GameHeader";

const Wrapper = styled(FlexWrapper)`
    padding: var(--spacing_x6);
    padding-bottom: 0;
    background: var(--color-green);
`;

const RulesWrapper = styled(FlexWrapper)`
    padding: var(--spacing_x4);
    padding-top: ${({$bigTopMargin}) => $bigTopMargin ? 'calc(4.8 * var(--spacing_x4))' : 'var(--spacing_x4)'};
`;

const Person = styled.img`
    height: ${({$ratio}) => $ratio * 339}px;
    width: auto;
    object-fit: contain;
    margin-top: auto;
`;

const BlockStyled = styled(Block)`
    position: relative;
    z-index: 8;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--spacing_x6);
    width: 100%;

    & button + button {
        margin-left:  var(--spacing_x2);
    }
`;

const QuestionStyled = styled(motion.img)`
    position: absolute;
    bottom: 48%;
    width: ${({$ratio}) => $ratio * 128}px;
    height: ${({$ratio}) => $ratio * 129}px;
    z-index: 6;
`;

const trashAnim = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
`;

const CharacterWrapper = styled(motion.div)`
    position: absolute;
    bottom: 9.5%;
    left: 0;
    z-index: 7;
    animation: ${({$isAnimate}) => $isAnimate ? trashAnim : ''} infinite 300ms backwards;
`;

const Darken = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2;
`;

const CurrencyButton = styled(CurButton)`
    position: absolute;
    top: var(--spacing_x5);
    right: ${({$ratio}) => $ratio * 71}px;
    z-index: 6;
    box-shadow: 0px 0px 40px #FFF501;

    & svg {
        width: ${({$ratio}) => $ratio * 18}px;
        height: ${({$ratio}) => $ratio * 18}px;
    }
`;

const RULES_TEXTS = {
    2: <>
        <b>Нажми на экран</b>, чтобы перепрыгнуть препятствие, если столкнёшься — начнёшь заново.
    </>,
    3: <>
        <b>Собирай предметы</b>, их количество влияет на твой рейтинг. За каждый собранный предмет ты получаешь виткоин.
    </>,
    4: <>
        <b>Не пропускай знаки вопроса</b>. После игры они превратятся в настоящие вопросы. За правильные ответы ты получишь виткоины.
    </>,
    5: <>
        <b>Виткоины</b> за собранные <b>предметы</b> и правильные <b>ответы</b> отображаются тут.
    </>
}

const RULES_TEXTS_HARD = {
    2: <>
        <b>Нажми на экран</b>, чтобы перепрыгнуть препятствие.
    </>,
    3: <>
        <b>Старайся не сталкиваться</b> с препятствиями. За каждое столкновение ты <b>теряешь 1 виткоин</b>.
    </>,
    4: <>
        <b>Собирай предметы</b>, их количество влияет на твой рейтинг. За каждый собранный предмет ты получаешь виткоин.
    </>,
    5: <>
        <b>Не пропускай знаки вопроса</b>. После игры они превратятся в настоящие вопросы. За правильные ответы ты получишь виткоины.
    </>,
    6: <>
        <b>Виткоины</b> за собранные <b>предметы</b> и правильные <b>ответы</b> отображаются тут.
    </>
};

export const PreGame = ({level, getContent, isHarder = false}) => {
    const ratio = useSizeRatio();
    const {next} = useProgress();
    const [part, setPart] = useState(0);
    const [isAnimate, setIsAnimate] = useState(false);
    const visibleWeek = weeks.find(({week}) => week === level) ?? {};
    const {personTexts, person} = visibleWeek;
    const lastPart = 5 + +isHarder;
    const trashPart = 2;
    const questionPart = 4 + +isHarder;
    const subjPart = 3 + +isHarder;
    const trashBlock = isHarder ? 3 : -1;
    const rulesText = isHarder ? RULES_TEXTS_HARD : RULES_TEXTS;
    const blinkRef = useRef(null);
    const animateRef = useRef(false);

    const blink = () => {
        setIsAnimate(true);

        animateRef.current = setTimeout(() => {
            setIsAnimate(false);
        }, 600);
    };

    useEffect(() => {
        if (part !== trashBlock) {
            setIsAnimate(false);
            if (blinkRef.current) {
                clearInterval(blinkRef.current);
                blinkRef.current = null;
            }
            if (animateRef.current) {
                clearTimeout(animateRef.current);
                animateRef.current = null;
            }

            return;
        }

        setTimeout(() => {
            blink();
            blinkRef.current = setInterval(blink, 1700);
        }, 700);

        return () => {
            if (blinkRef.current) {
                clearTimeout(blinkRef.current);
                blinkRef.current = null;
            }
        }
    }, [part])

    if (part < 2) return (
            <Wrapper>
                <p>{personTexts?.[part]}</p>
                <ButtonsWrapper>
                    {part !== 0 && (<Button color="white" onClick={() => setPart(prev => prev - 1)}>НАЗАД</Button>)}
                    <Button onClick={() => setPart(prev => prev + 1)}>{part < 1 ? 'ДАЛЕЕ' : 'ЗА ДЕЛО!'}</Button>
                </ButtonsWrapper>
                <Person src={person} alt="" $ratio={ratio}/>
            </Wrapper>
    );
    
    const jumpAnimation = {
        y: [0, -155 * ratio, 0]
    };

    console.log(lastPart);
    console.log(part);
    return (
        <RulesWrapper $bigTopMargin={part === lastPart}>
            <Darken />
            <BlockStyled onClose={() => next()}>
                <p>
                    {rulesText[part]}
                </p>
                <ButtonsWrapper>
                    {part !== 0 && (<Button color="white" onClick={() => setPart(prev => prev - 1)}>НАЗАД</Button>)}
                    <Button onClick={() => part === lastPart ? next() : setPart(prev => prev + 1)}>ДАЛЕЕ</Button>
                </ButtonsWrapper>
            </BlockStyled>
            {getContent?.(part)}
            {part === questionPart && (
                <QuestionStyled 
                    $ratio={ratio * subjectK} 
                    src={question} 
                    alt=""
                    animate={{left: ['100%', '10%'], display: ['block', 'none']}}
                    transition={{
                        repeat: Infinity,
                        duration: 0.7,
                        repeatType: 'loop',
                        repeatDelay: 1.5,
                    }}
                />
            )}
            {part === lastPart && (
                <>
                    <GameHeader />
                    <CurrencyButton color="red" $ratio={ratio}>
                        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.50685 7.3923C7.50685 7.96113 7.92505 8.34295 9.22369 8.6936C10.515 9.05204 11.9017 9.64425 11.909 11.3585C11.9017 12.6131 11.0212 13.291 9.90602 13.517V14.8183H8.18918V13.4936C7.08864 13.252 6.16419 12.504 6.09082 11.1793H7.35277C7.4188 11.8962 7.88103 12.4572 9.05494 12.4572C10.3096 12.4572 10.5957 11.7871 10.5957 11.3741C10.5957 10.8131 10.3096 10.2754 8.87885 9.91697C7.28674 9.51178 6.19354 8.81048 6.19354 7.41567C6.19354 6.23905 7.08131 5.47541 8.18918 5.22606V3.90918H9.89868V5.24165C11.0873 5.55334 11.6889 6.51178 11.7256 7.55593H10.471C10.4416 6.7923 10.0601 6.27801 9.0476 6.27801C8.08646 6.27801 7.50685 6.73775 7.50685 7.3923Z" fill="white"/>
                            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="white" strokeWidth="1.45455" strokeLinecap="round"/>
                        </svg>
                        <p>0/10</p>
                    </CurrencyButton>
                </>
            )}
            {[trashPart, questionPart].includes(part) && (
                <CharacterWrapper
                    animate={jumpAnimation}
                    transition={{
                        repeat: Infinity,
                        duration: 0.7,
                        repeatType: 'loop',
                        repeatDelay: 1.5,
                        delay: 0.4
                    }}
                >
                    <Character 
                        level={level} 
                    />
                </CharacterWrapper>
            )}
            {![trashPart, questionPart].includes(part) && (
                <CharacterWrapper
                    $isAnimate={isAnimate}
                >
                    <Character 
                        level={level} 
                        isPause={![subjPart, trashBlock].includes(part)}
                    />
                </CharacterWrapper>
            )}
        </RulesWrapper>
    )
} 