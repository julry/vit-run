import styled from 'styled-components';
import {ReactComponent as QuestionIcon} from '../../../assets/images/question.svg';
import { Subject } from './Subject';

const Wrapper = styled(Subject)`
    z-index: 3;
    position: fixed;
`;

export const QUESTION_WIDTH = 128;
export const QUESTION_HEIGHT = 129;

export const QuestionSubject = ({ question, questionsPosition, ...props }) => {
    const questionObject = {
        image: () => <QuestionIcon />,
        width: 128,
        height: 129
    }

    return (
        <Wrapper 
            {...props}
            subjectPosition={questionsPosition}
            subject={{...question, ...questionObject}}
        />
    )
}