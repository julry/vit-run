import styled from "styled-components";

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


export const RadioInput = ({checked, onChange, children, disabled, ...props}) => {
    return (
        <RadioButtonLabel {...props}>
            <InputRadioButton
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <RadioIconStyled/>
            {children}
        </RadioButtonLabel>
    )
}