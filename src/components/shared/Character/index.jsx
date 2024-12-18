import {forwardRef} from "react";
import styled from "styled-components";
import {motion} from "framer-motion"
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import {useAnimate} from "./useAnimate";
import {Image} from "../Image";
import { LG_KOEF, subjectK } from "../../../constants/weeks";

export const CHARACTER_SIZE = [127 * subjectK, 228 * subjectK];
export const CHARACTER_SIZE_LG = [127 * LG_KOEF, 228 * LG_KOEF];

const WrapperStyled = styled(motion.div)`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    min-height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;
    width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;
    z-index: 2;

    @media screen and (min-height: 750px) and (max-width: 450px){
        min-width: ${({$ratio}) => $ratio * CHARACTER_SIZE_LG[0]}px;
        min-height: ${({$ratio}) => $ratio * CHARACTER_SIZE_LG[1]}px;
        width: ${({$ratio}) => $ratio * CHARACTER_SIZE_LG[0]}px;
        height: ${({$ratio}) => $ratio * CHARACTER_SIZE_LG[1]}px;
    }
`;

const ImageStyled = styled(Image)`
    z-index: 3;
    width: 100%;
    height: 100%;
    min-width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    min-height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;
    object-fit: contain;
`;

function CharacterComponent({isPause, children, collectedStars, ...rest}, ref) {
    const sizeRatio = useSizeRatio();
    const source = useAnimate(isPause);

    return (
        <WrapperStyled ref={ref} $ratio={sizeRatio} {...rest}>
            <ImageStyled src={source} $ratio={sizeRatio}/>
        </WrapperStyled>
    );
}

export const Character = motion(forwardRef(CharacterComponent), { forwardMotionProps: true });
