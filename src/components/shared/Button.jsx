import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.button`
    border: none;
    outline: none;
    background: ${({$color}) => 'var(--color-' + $color + ')'};
    color: ${({$color}) => $color === 'white' ? 'var(--color-green)' : 'var(--color-' + $color + '-text)'};
    font-size: var(--font_md); 
    padding: var(--spacing_x3) var(--spacing_x8);
    border-radius: calc(var(--spacing_x8) * 2);
    text-transform: uppercase;
    cursor: pointer;
    flex-shrink: 0;

    &:disabled {
        opacity: 0.5;
    }
`;

export const SmallButton = styled(Wrapper)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 42}px;
    height: ${({$ratio}) => $ratio * 42}px;
    padding: 0;
    border-radius: 50%;
    & svg {
        width: ${({$ratio}) => $ratio * 20}px;
        height: ${({$ratio}) => $ratio * 20}px;
    }

    & + & {
        margin-left: var(--spacing_x4);
    }
`;


export const Button = ({color = 'orange', ...props}) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $color={color} $ratio={ratio} />
}

export const IconButton = ({color = 'red', ...props}) => {
    const ratio = useSizeRatio();

    return <SmallButton {...props} $color={color} $ratio={ratio} />
}

export const BackButton = styled(IconButton)`
    width: auto;
    padding: 0 var(--spacing_x2);
`;

export const CurButton = styled(Button)`
    padding: var(--spacing_x3);
    display: flex;
    align-items: center;
    font-weight: 700;

    & svg {
        width: ${({$ratio}) => $ratio * 20}px;
        height: ${({$ratio}) => $ratio * 20}px;
        margin-right: ${({$ratio}) => $ratio * 6}px;
    }
`;