import styled from "styled-components";
import { useState } from "react";
import { useProgress } from "../../contexts/ProgressContext";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { FlexWrapper } from "../shared/FlexWrapper";
import { Button } from "../shared/Button";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FemaleStart, MaleStart } from "../shared/svg";
import { SEX } from "../../constants/sex";

const Wrapper = styled(FlexWrapper)`
    padding: var(--spacing_x6) var(--spacing_x4);
`;

const PicBlock = styled.div`
    padding: var(--spacing_small);
    width: 100%;
    text-align: center;
    background: var(--color-green);
`;


const SexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: calc(2 * var(--spacing_x5)) var(--spacing_x7) 0;
    flex-grow: 1;
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

const FemalePic = styled(FemaleStart)`
    cursor: pointer;
    margin-top: calc(var(--spacing_x1) * 1.5);
    width: ${({$ratio}) => $ratio * 166}px;
    height: ${({$ratio}) => $ratio * 420}px;
`;

const MalePic = styled(MaleStart)`
    cursor: pointer;
    width: ${({$ratio}) => $ratio * 179}px;
    height: ${({$ratio}) => $ratio * 430}px;
`;

export const Registration2 = () => {
    const ratio = useSizeRatio();
    const { next, setUserInfo, updateUser } = useProgress();
    const [sex, setSex] = useState();
    const [isSending, setIsSending] = useState(false);

    const handleClick = async () => {
        if (isSending) return;

        setIsSending(true);

        setUserInfo({sex});
        const res = await updateUser({sex});
        
        setIsSending(false);

        if (res?.isError) return;

        next();
    }

    return (
        <Wrapper>
            <PicBlock>
                <p><b>Выбери персонажа</b></p>
            </PicBlock>
            <SexWrapper>
                <FemalePic isPicked={sex === SEX.Female} $ratio={ratio} onClick={() => setSex(SEX.Female)}/>
                <MalePic isPicked={sex === SEX.Male} $ratio={ratio} onClick={() => setSex(SEX.Male)}/>
            </SexWrapper>
            <ButtonStyled onClick={handleClick} disabled={!sex}>Далее</ButtonStyled>
        </Wrapper>
    )
}