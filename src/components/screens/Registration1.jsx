import styled from "styled-components";
import { useState } from "react";
import picture from "../../assets/images/intro-pic.png";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { Block } from "../shared/Block";
import { FlexWrapper } from "../shared/FlexWrapper";
import { uid } from "uid";
import { RadioInput } from "../shared/RadioInput";

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
    const [phone, setPhone] = useState('');
    const [university, setUniversity] = useState('');
    const [city, setCity] = useState('');
    const [direction, setDirection] = useState('');
    const [isEmployee, setIsEmployee] = useState(false);
    const [refId, setRefId] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { next, setUserInfo, registrateUser } = useProgress();

    const handleNext = async () => {
        if (isSaving) return;

        setIsError(false);
        setIsSaving(true); 

        const id = uid(7);

        setUserInfo({phone, city, direction, isEmployee, id});
        const res = await registrateUser({university, city, direction, isEmployee, refId, id});
        setIsSaving(false);

        if (res?.isError) {
            setIsError(true);
            return;
        }

        next();
    }

    const btnDisabled = !isAgreed || !city || !university || !direction || isSaving;

    return (
        <Wrapper>
            <Block>
                <p><b>Введи дополнительные данные,{'\n'}чтобы начать играть</b></p>
                <InputStyled placeholder="Укажи свой город*" value={city} onChange={(e) => setCity(e.target.value)} />
                <InputStyled placeholder="Укажи свой вуз/ССУЗ*" value={university} onChange={(e) => setUniversity(e.target.value)} />
                <InputStyled placeholder="Укажи свою специализацию*" value={direction} onChange={(e) => setDirection(e.target.value)} />
                <RefText>
                    Введи ID друга, который тебя пригласил 
                </RefText>
                <InputId placeholder="5е32uik" value={refId} onChange={(e) => setRefId(e.target.value)} />
                <TextXxs>
                    После регистрации ты тоже сможешь{'\n'}       
                    пригласить друзей в игру
                </TextXxs>
                <RadioInput 
                    checked={isAgreed}
                    onChange={() => setIsAgreed((prevAgreed) => !prevAgreed)}
                >
                    <span>
                        Я согласен(а) на{"\u00A0"}
                        <a
                            href={"https://doc.fut.ru/personal_data_policy.pdf"}
                            target="_blank"
                            rel="noreferrer"
                        >
                        обработку персональных данных
                        </a>{" "}
                        и получение информационных сообщений, а также с{' '} 
                        <a
                            href={''}
                            target="_blank"
                            rel="noreferrer"
                        >
                        правилами проведения акции
                        </a>.
                    </span>
                </RadioInput>
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