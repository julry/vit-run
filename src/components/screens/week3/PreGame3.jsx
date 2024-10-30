import styled from "styled-components";
import bg from '../../../assets/images/rules3Bg.png';
import lemonade from './assets/food.svg';
import paper from './assets/trash-highlighted.svg';
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { PreGame } from "../../shared/PreGame";
import { motion } from "framer-motion";

const Image = styled.img`
    position: absolute;
    inset: 0;
    height: 100%;
    object-fit: cover;
`;

const LemonadeStyled = styled(motion.img)`
    position: absolute;
    bottom: 11%;
    width: ${({$ratio}) => $ratio * 185}px;
    height: ${({$ratio}) => $ratio * 160}px;
    z-index: 6;
`;

const TrashStyled = styled(motion.img)`
    position: absolute;
    bottom: 6%;
    width: ${({$ratio}) => $ratio * 183}px;
    height: ${({$ratio}) => $ratio * 186}px;
    z-index: 6;
    object-fit: contain;
`;

export const PreGame3 = () => {
    const ratio = useSizeRatio();
    const getContent = (part) => {
        return (
            <>
                {part === 2 && (
                    <TrashStyled 
                        $ratio={ratio} 
                        src={paper} 
                        alt=""
                        initial={{left: '100%'}}
                        animate={{left: -206  * ratio}}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            repeatType: 'loop',
                            repeatDelay: 1,
                            delay: 0.15,
                        }}
                    />
                )}
                {part === 3 && (
                    <LemonadeStyled 
                        $ratio={ratio} 
                        src={lemonade} 
                        alt=""
                        animate={{left: ['100%', '15%'], display: ['block', 'none']}}
                        transition={{
                            repeat: Infinity,
                            duration: 0.8,
                            repeatType: 'loop',
                            repeatDelay: 1,
                        }}
                    />
                )}
                <Image src={bg} alt=""/>
            </>
        )
    }
    return <PreGame level={3} getContent={getContent}/>
}