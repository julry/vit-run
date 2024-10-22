import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useEffect, useState } from "react";

const Content = styled(Block)`
    margin-top: var(--spacing_x5);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: var(--spacing_x4);
    align-items: center;

    & button {
        width: calc((100% - var(--spacing_x3) + (var(--spacing_x1) / 2))/2);
    }
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

export const InfoModal = ({onClose, isShown}) => {
    const [part, setPart] = useState(0);
    const { setUserInfo, updateUser, currentWeek } = useProgress();

    const handleGoLobby = () => {
        updateUser({seenRules: true});
        setUserInfo({seenRules: true});
        onClose();
    }

    useEffect(() => {
        if (!isShown) setPart(0);
    }, [isShown])

    const getContent = () => {
        switch (part) {
            case 0:
                return (
                    <Content onClose={onClose}>
                        <p>
                            Добро пожаловать в команду!{'\n'}
                            В течение <b>пяти недель</b> выполняй задачи вместе с нашими сотрудниками.{' '}
                            Твоя цель — помочь «Вкусно — и точка» достичь <b>новых высот</b> и стать <b>лучшим игроком</b>!
                        </p>
                        <ButtonStyled onClick={() => setPart(prev => prev + 1)}>Далее</ButtonStyled>
                    </Content>
                )
            case 1: 
                return (
                    <Content onClose={onClose}>
                        <p>
                            <b>Каждую неделю</b> мы будем выбирать 10 лучших игроков,{' '}
                            которые получат мерч от «Вкусно — и точка».{'\n'}А ещё 40 участников{' '}
                            выиграют промокоды на продукцию и <b>подарки от партнёров</b>.{'\n\n'}
                            По итогам Марафона 50 лучших участников получат <b>денежный приз</b> в размере 50 000 рублей.
                        </p>
                        <ButtonsWrapper>
                            <Button color="white" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                            <Button onClick={() => currentWeek === 1 ? setPart(prev => prev + 1) : handleGoLobby}>Далее</Button>
                        </ButtonsWrapper>
                    </Content>
                );
            case 2: 
                return (
                    <Content onClose={onClose}>
                        <p>
                            <b>Первая неделя — производство.</b>{'\n\n'}
                            Давай заглянем и узнаем, где нужна твоя помощь!
                        </p>
                        <ButtonsWrapper>
                            <Button color="white" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                            <Button onClick={handleGoLobby}>Далее</Button>
                        </ButtonsWrapper>
                    </Content>
                ) 
            default: break;
        }
    }

    return (
        <Modal isShown={isShown}>
            {getContent()}
        </Modal>
    )
}