import styled from 'styled-components';
import {motion, useMotionValue} from "framer-motion";
import {forwardRef, useEffect} from "react";
import game1bg from "../../../assets/images/game1Bg.png";
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import { Subject } from './Subject';
// import { subjects1, subjects2, subjects3, subjects4 } from '../../../constants/subjects';

export const WIDTH = 3804;

const WrapperStyled = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${({$preloadBg}) => $preloadBg}) no-repeat 0 0 / cover;
`;

const LEVEL_TO_BOARD = {
    1: game1bg,
    2: game1bg,
    3: game1bg,
    4: game1bg,
    5: game1bg,
};

const LEVEL_TO_BOARD_COLOR = {
    1: '#E6DDE3',
    2: game1bg,
    3: game1bg,
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
    background-repeat: no-repeat;
    background-size: cover;
`;

// const SUBJECTS_TO_LEVEL = {
//     1: subjects1,
//     2: subjects2,
//     3: subjects3,
//     4: subjects4
// }

const BoardComponent = ({level, imageProps, preloadBg, children, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();

    // const subjectPosition = useMotionValue({});

    // useEffect(() => {
    //     subjectPosition.set(SUBJECTS_TO_LEVEL[level].reduce((acc, subject) => {
    //         return ({
    //             ...acc,
    //             [subject.id]: [subject.position[0] * sizeRatio, subject.position[1] * sizeRatio],
    //         })
    //     }, {}));
    // }, [sizeRatio])

    return (
        <WrapperStyled ref={ref} $preloadBg={preloadBg} {...rest}>
            <BackgroundStyled level={level} $ratio={sizeRatio} {...imageProps}>
                {children}
            </BackgroundStyled>
        </WrapperStyled>
    );
}

export const Board = motion(forwardRef(BoardComponent));