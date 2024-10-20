import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.input`
    padding: var(--spacing_x2) var(--spacing_x3);
    font-size: var(--font_xs);
    outline: none;
    border: 1px solid var(--color-white);
    color: var(--color-white);
    border-radius: var(--border-radius-lg);
    background: transparent;
    width: 100%;

    &::placeholder {
        color: var(--color-gray);
    }
`;

export const Input = (props) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $ratio={ratio} />
}