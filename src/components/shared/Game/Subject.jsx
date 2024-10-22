import {forwardRef} from "react";
import styled from 'styled-components';
import {motion, useTransform} from "framer-motion";
import {useSizeRatio} from "../../../hooks/useSizeRatio";

const ImageStyled = styled(motion.div)`
    position: absolute;
    left: 0;
    width: ${({$ratio, width}) => $ratio * width}px;
    height: ${({$ratio, height}) => $ratio * height}px;
    z-index: 6;

    & svg {
        width: 100%;
        height: 100%;
    }
`;

const SubjectComponent = ({subject, subjectPosition, wrapperRectHeight, characterHeight, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();
    const x = useTransform(subjectPosition, prev => `${prev[subject?.id]?.[0]}px`);
    const bottom = useTransform(subjectPosition, prev => {
        let position = `${prev[subject?.id]?.[1]}%`;
        if (prev[subject?.id]?.[1] * wrapperRectHeight / 100 > (wrapperRectHeight * 0.095 + characterHeight)) {
            position = `${wrapperRectHeight * 0.095 + characterHeight}px`;
        }
        return position;
    });

    if (!subject) {
        return null;
    }

    return (
        <ImageStyled
            {...rest}
            ref={ref}
            height={subject.height}
            width={subject.width}
            $ratio={sizeRatio}
            style={{x, bottom, z: 0}}
            exit={{scale: 0.8, opacity: 0}}
            transition={{type: "spring", velocity: 4}}
        >
            {<subject.image />}
        </ImageStyled>
    );
};

export const Subject = motion(forwardRef(SubjectComponent), {forwardMotionProps: true});