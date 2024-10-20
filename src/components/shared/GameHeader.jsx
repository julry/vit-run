import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { CurButton, IconButton } from "./Button";
import { FlexWrapper } from "./FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    position: fixed;
    top: var(--spacing_x5);
    left: var(--spacing_x5);
    right: var(--spacing_x5);
    bottom: auto;
    justify-content: space-between;
    flex-direction: row;
    height: auto;
    width: auto;
    z-index: 5;
`;

const FlexContainer = styled(FlexWrapper)`
    flex-direction: row;
    width: auto;

    & button + button {
        margin-left: var(--spacing_x2);
    }
`;

const CurrencyButton = styled(CurButton)`
    & svg {
        width: ${({$ratio}) => $ratio * 18}px;
        height: ${({$ratio}) => $ratio * 18}px;
    }
`;


export const GameHeader = ({onHomeClick, onRulesClick}) => {
    const ratio = useSizeRatio();
    const {gamePoints, questionsAmount} = useProgress();

    const handleHomeClick = (e) => {
        e.stopPropagation();

        onHomeClick?.();
    }

    const handleRulesClick = (e) => {
        e.stopPropagation();

        onRulesClick?.();
    }
    
    return (
        <Wrapper onPointerDown={(e) => e.stopPropagation()}>
            <FlexContainer>
                <IconButton color="green" onPointerDown={handleHomeClick}>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.666748 7.01707L6.99959 2.32688C7.58806 1.89104 8.4121 1.89104 9.00058 2.32688L15.3334 7.01707M3.11119 5.4653V12.4482C3.11119 13.3053 3.8408 14 4.74082 14H11.2593C12.1594 14 12.889 13.3053 12.889 12.4482V5.4653" stroke="white" strokeWidth="1.33333" strokeLinecap="round"/>
                        <path d="M3.11119 12.4482V5.35987C3.11119 5.29649 3.03902 5.26013 2.98809 5.29785L6.99959 2.32688C7.29387 2.10892 7.64708 1.99996 8.00027 2C9.19297 2.29822 10.6364 3.62713 12.2944 4.80056C12.6612 5.06013 12.889 5.47734 12.889 5.92667V12.4482C12.889 13.3053 12.1594 14 11.2593 14H4.74082C3.8408 14 3.11119 13.3053 3.11119 12.4482Z" fill="none"/>
                    </svg>
                </IconButton>
                <CurButton color="green" $ratio={ratio}>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00008 11.9998V12.0065M5.33341 6.6665C5.33341 5.19374 6.52732 3.99984 8.00008 3.99984C9.47284 3.99984 10.6667 5.19374 10.6667 6.6665C10.6667 7.91149 9.81358 8.95721 8.66 9.25089C8.30319 9.34172 8.00008 9.63165 8.00008 9.99984M15.3334 7.99984C15.3334 12.0499 12.0502 15.3332 8.00008 15.3332C3.94999 15.3332 0.666748 12.0499 0.666748 7.99984C0.666748 3.94975 3.94999 0.666504 8.00008 0.666504C12.0502 0.666504 15.3334 3.94975 15.3334 7.99984Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round"/>
                    </svg>
                    <p>{questionsAmount ?? 0}/7</p>
                </CurButton>
            </FlexContainer>
            <FlexContainer>
                <CurrencyButton color="red" $ratio={ratio}>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50685 7.3923C7.50685 7.96113 7.92505 8.34295 9.22369 8.6936C10.515 9.05204 11.9017 9.64425 11.909 11.3585C11.9017 12.6131 11.0212 13.291 9.90602 13.517V14.8183H8.18918V13.4936C7.08864 13.252 6.16419 12.504 6.09082 11.1793H7.35277C7.4188 11.8962 7.88103 12.4572 9.05494 12.4572C10.3096 12.4572 10.5957 11.7871 10.5957 11.3741C10.5957 10.8131 10.3096 10.2754 8.87885 9.91697C7.28674 9.51178 6.19354 8.81048 6.19354 7.41567C6.19354 6.23905 7.08131 5.47541 8.18918 5.22606V3.90918H9.89868V5.24165C11.0873 5.55334 11.6889 6.51178 11.7256 7.55593H10.471C10.4416 6.7923 10.0601 6.27801 9.0476 6.27801C8.08646 6.27801 7.50685 6.73775 7.50685 7.3923Z" fill="white"/>
                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="white" strokeWidth="1.45455" strokeLinecap="round"/>
                    </svg>
                    <p>{gamePoints ?? 0}/10</p>
                </CurrencyButton>
                <IconButton color="red" onPointerDown={handleRulesClick}>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.00009 11.3332V7.33318M8.00009 5.33318V5.32651M15.3334 7.99985C15.3334 12.0499 12.0502 15.3332 8.00009 15.3332C3.95 15.3332 0.666748 12.0499 0.666748 7.99985C0.666748 3.94975 3.95 0.666504 8.00009 0.666504C12.0502 0.666504 15.3334 3.94975 15.3334 7.99985Z" stroke="white" strokeWidth="1.33334" strokeLinecap="round"/>
                    </svg>
                </IconButton>
            </FlexContainer>
        </Wrapper>
    )
}