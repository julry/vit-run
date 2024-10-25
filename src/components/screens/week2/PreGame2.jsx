import styled from "styled-components";
import bg from '../../../assets/images/rules1Bg.png';
import lemonade from '../week1/assets/lemonade.svg';
import paper from './assets/paper.svg';
import question from '../../../assets/images/question.svg';
import { subjectK } from "../../../constants/weeks";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { PreGame } from "../../shared/PreGame";

const Image = styled.img`
    position: absolute;
    inset: 0;
    height: 100%;
    object-fit: cover;
`;

const LemonadeStyled = styled.img`
    position: absolute;
    bottom: 37%;
    left: ${({$ratio}) => $ratio * 153}px;
    width: ${({$ratio}) => $ratio * 128}px;
    height: ${({$ratio}) => $ratio * 181}px;
    z-index: 6;
`;

const TrashStyled = styled.img`
    position: absolute;
    bottom: 9%;
    left: ${({$ratio}) => $ratio * 158}px;
    width: ${({$ratio}) => $ratio * 161}px;
    height: ${({$ratio}) => $ratio * 96}px;
    z-index: 6;
`;

const QuestionStyled = styled.img`
    position: absolute;
    bottom: 48%;
    left: ${({$ratio}) => $ratio * 158}px;
    width: ${({$ratio}) => $ratio * 128}px;
    height: ${({$ratio}) => $ratio * 129}px;
    z-index: 6;
`;

export const PreGame2 = () => {
    const ratio = useSizeRatio();
    const getContent = (part) => {
        return (
            <>
                {part === 2 && <TrashStyled $ratio={ratio * subjectK} src={paper} alt=""/>}
                {part === 3 && <LemonadeStyled $ratio={ratio * subjectK} src={lemonade} alt=""/>}
                {part === 4 && <QuestionStyled $ratio={ratio * subjectK} src={question} alt=""/>}
                <Image src={bg} alt=""/>
            </>
        )
    }
    return <PreGame level={2} getContent={getContent}/>
}