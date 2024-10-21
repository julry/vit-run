import styled from 'styled-components';
import { motion } from "framer-motion";
import {forwardRef} from "react";
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import { WIDTH } from './Board';

const WrapperStyled = styled(motion.div)`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
`;

const BackgroundStyled = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({$ratio}) => $ratio * WIDTH}px;
    height: 100%;
    z-index: 3;
`;

const BoardComponent = ({imageProps, children, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();

    return (
        <WrapperStyled ref={ref} {...rest}>
            <BackgroundStyled $ratio={sizeRatio} {...imageProps}>
                {children}
            </BackgroundStyled>
        </WrapperStyled>
    );
}

export const ItemsBoard = motion(forwardRef(BoardComponent));