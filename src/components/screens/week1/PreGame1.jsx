import styled from "styled-components";
import bg from '../../../assets/images/rules1Bg.png';
import burger from './assets/burger.svg';
import trash from './assets/trash-highlighted.svg';
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

const BurgerStyled = styled.img`
    position: absolute;
    bottom: 37%;
    left: ${({$ratio}) => $ratio * 153}px;
    width: ${({$ratio}) => $ratio * 145}px;
    height: ${({$ratio}) => $ratio * 132}px;
    z-index: ${({$isActive}) => $isActive ? 6 : 1};
`;

const TrashStyled = styled.img`
    position: absolute;
    bottom: 9%;
    left: ${({$ratio}) => $ratio * 158}px;
    width: ${({$ratio}) => $ratio * 150}px;
    height: ${({$ratio}) => $ratio * 174}px;
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

export const PreGame1 = () => {
    const ratio = useSizeRatio();
    const getContent = (part) => {
        return (
            <>
                <BurgerStyled $ratio={ratio * subjectK} src={burger} $isActive={part === 3} alt=""/>
                {part === 2 && <TrashStyled $ratio={ratio * subjectK} src={trash} alt=""/>}
                {part === 4 && <QuestionStyled $ratio={ratio * subjectK} src={question} alt=""/>}
                <Image src={bg} alt=""/>
            </>
        )
    }
    return <PreGame level={1} getContent={getContent}/>
}