import styled from "styled-components";
// import close from '../../assets/images/close.svg';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FlexWrapper } from "./FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    position: relative;
    padding: ${({$hasCloseIcon, $ratio}) => $ratio * ($hasCloseIcon ? 40 : 16)}px var(--spacing_x4) var(--spacing_x4);
    background-color: var(--color-green);
    color: var(--color-green-text);
    width: 100%;
    max-width: ${({$ratio}) => $ratio * 343}px;
    height: auto;
    height: fit-content;
    flex-shrink: 1;
    flex-grow: 0;
    
    & p {
        width: 100%;
    }
`;

const CloseIcon = styled.button`
    position: absolute;
    top: var(--spacing_x2);
    right: var(--spacing_x2);
    background: transparent;
    outline: none;
    border: none;
    width: ${({$ratio}) => $ratio * 24}px;
    height: ${({$ratio}) => $ratio * 24}px;
    background-size: cover;
    cursor: pointer;
`;

export const Block = ({onClose, children, ...props}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper {...props} $hasCloseIcon={!!onClose} $ratio={ratio}>
            {children}
            {!!onClose && (
                <CloseIcon $ratio={ratio} onClick={onClose}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M18 18L6 6.00001" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </CloseIcon>
            )}
        </Wrapper>
    )
}