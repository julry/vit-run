import styled from "styled-components";
import { SCREENS } from "../../../constants/screens";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Button } from "../Button";
import { Modal } from "./Modal";

const Content = styled(Block)`
    margin-top: var(--spacing_x5);

    & button {
        width: calc(100% - 2 * var(--spacing_x5));
        margin-top: var(--spacing_x4);
    }
`;

export const ErrorModal = ({ onRetry, isShown, isPassed }) => {
    const {next} = useProgress();

    const handleClick = () => {
        if (isPassed) {
            next(SCREENS.LOBBY);

            return;
        }

        onRetry();
    }

    return (
        <Modal isShown={isShown} isDarken>
            <Content>
                <p>Ой, {isPassed ? 'похоже этот уровень был пройден ранее' : 'произошла ошибка'}, твои баллы не сохранились.</p>
                <Button onClick={handleClick}>{isPassed ? 'в лобби' : 'попробовать ещё раз'}</Button>
            </Content>
        </Modal>
    )
}