import styled from "styled-components";
import bg from '../../../assets/images/rules4Bg.png';
import lemonade from './assets/phone.svg';
import paper from './assets/plant-highlighted.svg';
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { PreGame } from "../../shared/PreGame";
import { motion } from "framer-motion";

const Image = styled.img`
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

const LemonadeStyled = styled(motion.img)`
    position: absolute;
    bottom: 37%;
    width: ${({$ratio}) => $ratio * 128}px;
    height: ${({$ratio}) => $ratio * 181}px;
    z-index: 6;
`;

const TrashStyled = styled(motion.img)`
    position: absolute;
    bottom: 6%;
    width: ${({$ratio}) => $ratio * 166}px;
    height: ${({$ratio}) => $ratio * 209}px;
    z-index: 6;
    object-fit: contain;
`;

export const PreGame4 = () => {
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
                            duration: 1.2,
                            repeatType: 'loop',
                            repeatDelay: 1,
                        }}
                    />
                )}
                <Image src={bg} alt=""/>
            </>
        )
    }
    return <PreGame level={4} getContent={getContent}/>
}