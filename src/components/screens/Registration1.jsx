import styled from "styled-components";
import { useState } from "react";
import { uid } from "uid";
import picture from "../../assets/images/intro-pic.png";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { Block } from "../shared/Block";
import { FlexWrapper } from "../shared/FlexWrapper";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";

const Wrapper = styled(FlexWrapper)`
    background: url(${picture}) no-repeat center 100% / cover;
    padding: calc(3.5 * var(--spacing_x6)) var(--spacing_x4) var(--spacing_x6);
`;

const ButtonBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--spacing_x6);

    & button {
        margin-left: var(--spacing_x2);
    }
`;

const InputRadioButton = styled.input`
    display: none;
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: var(--spacing_x4);
  height: var(--spacing_x4);
  background-color: transparent;
  border: 1px solid var(--color-white);
  border-radius: 50%;
  margin-right: var(--spacing_small);
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: var(--font_xs);
  color: var(--color-white);
  width: 100%;
  text-align: left;
  margin-top: var(--spacing_x4);
  max-width: 300px;

  & ${InputRadioButton}:checked + ${RadioIconStyled} {
    background-color: var(--color-white);
  }
`;

const InputStyled = styled(Input)`
    margin-top: var(--spacing_x4);
`;

const SmallText = styled.p`
    margin-top: var(--spacing_x4);
    color: var(--color-red);
    font-size: var(--font_xs);
`;

const RefText = styled.p`
    font-size: var(--font_xs);
    padding: var(--spacing_x4) var(--spacing_x3) var(--spacing_x2);

    & + input {
        margin-top: 0;
    }
`;

const TextXxs = styled.p`
    font-size: var(--font_xxs);
    margin-top: var(--spacing_x2);
    padding-left: var(--spacing_x3);
`;

const InputId = styled(InputStyled)`
    &::placeholder {
        opacity: 0.5;
    }
`;

export const Registration1 = () => {
    const [university, setUniversity] = useState('');
    const [city, setCity] = useState('');
    const [direction, setDirection] = useState('');
    const [refId, setRefId] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { next, setUserInfo, updateUser } = useProgress();

    const handleNext = async () => {
        if (isSaving) return;

        setIsError(false);
        setIsSaving(true); 

        const id = uid(7).replace('e', 'g');

        setUserInfo({university, city, fieldOfStudy: direction, refID: refId, id});
        const res = await updateUser({university, city, fieldOfStudy: direction, refID: refId, id});
        setIsSaving(false);

        if (res?.isError) {
            setIsError(true);
            return;
        }

        reachMetrikaGoal('data');

        next();
    }

    const btnDisabled = !city || !university || !direction || isSaving;

    return (
        <Wrapper>
            <Block>
                <p><b>Введи дополнительные данные,{'\n'}чтобы начать играть</b></p>
                <InputStyled placeholder="Укажи свой город*" value={city} onChange={(e) => setCity(e.target.value.trim())} />
                <InputStyled placeholder="Укажи свой вуз/ССУЗ*" value={university} onChange={(e) => setUniversity(e.target.value.trim())} />
                <InputStyled placeholder="Укажи свою специализацию*" value={direction} onChange={(e) => setDirection(e.target.value.trim())} />
                <RefText>
                    Введи ID друга, который тебя пригласил 
                </RefText>
                <InputId placeholder="5е32uik" value={refId} onChange={(e) => setRefId(e.target.value.trim())} />
                <TextXxs>
                    После регистрации ты тоже сможешь{'\n'}       
                    пригласить друзей в игру
                </TextXxs>
                {isError && (
                    <SmallText>
                        Что-то пошло не так, попробуй позже
                    </SmallText>
                )}
                <ButtonBlock>
                    <Button color="white" onClick={() => next(SCREENS.LOGIN)}>Назад</Button>
                    <Button onClick={handleNext} disabled={btnDisabled}>Далее</Button>
                </ButtonBlock>
            </Block>
        </Wrapper>
    )
}