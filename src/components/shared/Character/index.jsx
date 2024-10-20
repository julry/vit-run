import {forwardRef} from "react";
import styled from "styled-components";
import {motion} from "framer-motion"
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import {useAnimate} from "./useAnimate";
import {Image} from "../Image";

export const CHARACTER_SIZE = [150, 264];

const WrapperStyled = styled(motion.div)`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    min-height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;
    height: 46%;
    z-index: 2;
`;

const ImageStyled = styled(Image)`
    z-index: 3;
    width: 100%;
    height: 100%;
    min-width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    min-height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;
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
