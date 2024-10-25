import styled from "styled-components";
import bg from '../../../assets/images/rules1Bg.png';
import burger from './assets/burger.svg';
import trash from './assets/trash-highlighted.svg';
import question from '../../../assets/images/question.svg';
import { subjectK } from "../../../constants/weeks";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { PreGame } from "../../shared/PreGame";
import { motion } from "framer-motion";

const Image = styled.img`
    position: absolute;
    inset: 0;
    height: 100%;
    object-fit: cover;
`;

const BurgerStyled = styled(motion.img)`
    position: absolute;
    bottom: 37%;
    width: ${({$ratio}) => $ratio * 145}px;
    height: ${({$ratio}) => $ratio * 132}px;
    z-index: ${({$isActive}) => $isActive ? 6 : 1};
    ${({$isActive, $ratio}) => !$isActive ? 'left:' + 153 * $ratio + 'px' : ''};
`;

const TrashStyled = styled(motion.img)`
    position: absolute;
    bottom: 2%;
    width: ${({$ratio}) => $ratio * 150}px;
    height: ${({$ratio}) => $ratio * 174}px;
    z-index: 6;
`;

const QuestionStyled = styled(motion.img)`
    position: absolute;
    bottom: 48%;
    width: ${({$ratio}) => $ratio * 128}px;
    height: ${({$ratio}) => $ratio * 129}px;
    z-index: 6;
`;

export const PreGame1 = () => {
    const ratio = useSizeRatio();
    const getContent = (part) => {
        return (
            <>
                {part !== 3 && (
                    <BurgerStyled 
                        $ratio={ratio * subjectK} 
                        src={burger} 
                        alt=""
                    />
                )
                }
                {part === 3 && (<BurgerStyled 
                    $ratio={ratio * subjectK} 
                    src={burger} 
                    $isActive 
                    alt=""
                    animate={{left: ['100%', '15%'], display: ['block', 'none']}}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        repeatType: 'loop',
                        repeatDelay: 1,
                    }}
                />)
                }
                {part === 2 && <TrashStyled 
                    $ratio={ratio * subjectK} 
                    src={trash} 
                    alt=""
                    initial={{left: '100%'}}
                    animate={{left: -150 * ratio}}
                    transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        repeatType: 'loop',
                        repeatDelay: 1,
                    }}
                />}
                {part === 4 && (
                    <QuestionStyled 
                        $ratio={ratio * subjectK} 
                        src={question} 
                        alt=""
                        animate={{left: ['100%', '5%'], display: ['block', 'none']}}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            repeatType: 'loop',
                            repeatDelay: 1.2,
                        }}
                    />
                )}
                <Image src={bg} alt=""/>
            </>
        )
    }
    return <PreGame level={1} getContent={getContent}/>
}