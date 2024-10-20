import styled from "styled-components";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { useProgress } from "../../contexts/ProgressContext";
import picture from "../../assets/images/intro-pic.png";
import { useState } from "react";
import { emailRegExp } from "../../constants/regexp";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { Block } from "../shared/Block";
import { FlexWrapper } from "../shared/FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    background: url(${picture}) no-repeat center 100% / cover;
    padding: calc(4 * var(--spacing_x6)) var(--spacing_x4) var(--spacing_x6);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
    transition: background 0.3s;
`;

const InputStyled = styled(Input)`
    margin: var(--spacing_x6) 0 var(--spacing_x4);
`;

const SmallText = styled.p`
    color: var(--color-${({$color}) => $color});
    font-size: var(--font_xs);
`;

export const Login = () => {
    const [isWrongEmail, setWrongEmail] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState('');

    const { next, getUserInfo } = useProgress();

    const handleClick = async () => {
        if (isWrongEmail) {
            window.open('/', '_blank');
            return;
        }
        if (isSending) return;
    
        setIsSending(true);

        const info = await getUserInfo(email.trim());

        if (info.isError) {
            setWrongEmail(true);
            return;
        }

        setIsSending(false);

        next();
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
        setWrongEmail(false);
    };

    return (
        <Wrapper>
            <Block>
                <p>
                    <b>Добро пожаловать в мир «Вкусно — и точка!»</b>{'\n\n'}
                    Здесь ты пройдёшь увлекательное приключение. Твоя цель — стать лучшим игроком и помочь коллегам! Заходи скорее!
                </p>
                <InputStyled placeholder="Укажи свою почту*" value={email} onChange={handleChange}/>
                <SmallText $color={isWrongEmail ? 'red' : 'white'}>
                    {isWrongEmail ? 
                        'Кажется, такой почты нет. Перепроверь или зарегистрируйся.' : 
                        '*Введи ту же почту, что и при регистрации на Марафон «PROДВИЖЕНИЕ И ТОЧКА»'}
                </SmallText>
                
                <ButtonStyled color={isWrongEmail ? 'white' : 'orange'} onClick={handleClick} disabled={!email || !email.trim().match(emailRegExp)}>
                    {isWrongEmail ? 'зарегистрироваться' : 'войти'}
                </ButtonStyled>
            </Block>
        </Wrapper>
    )
}