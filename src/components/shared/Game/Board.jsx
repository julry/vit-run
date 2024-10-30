import styled from 'styled-components';
import {motion} from "framer-motion";
import {forwardRef} from "react";
import game1bg from "../../../assets/images/game1Bg.png";
import game2bg from "../../../assets/images/game2Bg.png";
import game3bg from "../../../assets/images/game3Bg.png";
import game4bg from "../../../assets/images/game4Bg.png";
import game5bg from "../../../assets/images/game5Bg.png";
import {useSizeRatio} from "../../../hooks/useSizeRatio";

export const WIDTH = 7608;

const WrapperStyled = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${({$preloadBg}) => $preloadBg}) no-repeat 0 0 / cover;
`;

const LEVEL_TO_BOARD = {
    1: game1bg,
    2: game2bg,
    3: game3bg,
    4: game4bg,
    5: game5bg,
};

const LEVEL_TO_BOARD_COLOR = {
    1: '#E6DDE3',
    2: '#f7edeb',
    3: '#65739a',
    4: game1bg,
    5: game1bg,
}

const BackgroundStyled = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({$ratio}) => $ratio * WIDTH}px;
    height: 100%;
    background-color: ${({level}) => LEVEL_TO_BOARD_COLOR[level]};
    background-image: url(${({level}) => LEVEL_TO_BOARD[level]});
    background-size: contain;
    background-repeat: repeat-x;
`;

const BoardComponent = ({level, imageProps, preloadBg, children, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();
    return (
        <WrapperStyled ref={ref} $preloadBg={preloadBg} {...rest}>
            <BackgroundStyled level={level} $ratio={sizeRatio} {...imageProps}>
                {children}
            </BackgroundStyled>
        </WrapperStyled>
    );
}

export const Board = motion(forwardRef(BoardComponent));