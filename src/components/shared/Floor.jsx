import { forwardRef } from "react";
import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { FloorDecoration } from "./svg";

const Wrapper = styled.div`
    position: relative;
    background-color: #AB6F3D;
    width: ${({$ratio}) => $ratio * 254}px;
    padding: var(--spacing_x6) ${({$ratio}) => $ratio * 6}px var(--spacing_x5);
    display: flex;
    justify-content: space-between;

    ${({$isOpen}) => $isOpen ? 'cursor: pointer' : ''};
    
    & p {
        text-align: center;
    }
`;

const Decoration = styled(FloorDecoration)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${({$ratio}) => $ratio * 18}px;
    width: ${({$ratio}) => $ratio * 254}px;
`;

const DecorationUpper = styled(Decoration)`
    position: absolute;
    bottom: auto;
    top: 0;
`;

const Side = styled.div`
    position: relative;
    height: ${({$ratio}) => $ratio * 105}px;
    width: ${({$ratio, $isSmall}) => $ratio * ($isSmall ? 6 : 9)}px;
    z-index: 3;
`;

const DownSize = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 124}px;
    left: ${({$ratio}) => $ratio * 6}px;
    right: ${({$ratio}) => $ratio * 6}px;
    z-index: 2;
    background-color: #593517;
    height: ${({$ratio}) => $ratio * 5}px;
`;

const Content = styled.div`
    position: absolute;
    top: var(--spacing_x6);
    left: ${({$ratio}) => $ratio * 9}px;
    right: ${({$ratio}) => $ratio * 6}px;
    height: ${({$ratio}) => $ratio * 99}px;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;

    & svg {
        height: ${({$ratio}) => $ratio * 32}px;
        width: ${({$ratio}) => $ratio * 32}px;
    }
`;

const FloorImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const FloorComponent = ({isOpen, floorPic, floorNum, children, isUpper, ...props}, ref) => {
    const ratio = useSizeRatio();
    return (
        <Wrapper $ratio={ratio} {...props} $isOpen={isOpen} ref={ref}>
            {isUpper && <DecorationUpper $ratio={ratio}/> }
            <Side $ratio={ratio}>
                <svg width="100%" height="100%" viewBox="0 0 9 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 99.9029V0H0V105L9 99.9029Z" fill="#815027"/>
                </svg>
            </Side>
            <Content $ratio={ratio}>
                {isOpen ?
                 <FloorImage src={floorPic} alt={`Этаж${floorNum}`}/> :
                 !children && (
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6665 12V9.33333C10.6665 6.38781 13.0543 4 15.9998 4C18.9454 4 21.3332 6.38781 21.3332 9.33333V12M10.9332 28H21.0665C22.56 28 23.3067 28 23.8771 27.7094C24.3789 27.4537 24.7869 27.0457 25.0425 26.544C25.3332 25.9735 25.3332 25.2268 25.3332 23.7333V16.2667C25.3332 14.7732 25.3332 14.0265 25.0425 13.456C24.7869 12.9543 24.3789 12.5463 23.8771 12.2906C23.3067 12 22.56 12 21.0665 12H10.9332C9.4397 12 8.69296 12 8.12253 12.2906C7.62076 12.5463 7.21282 12.9543 6.95715 13.456C6.6665 14.0265 6.6665 14.7732 6.6665 16.2667V23.7333C6.6665 25.2268 6.6665 25.9735 6.95715 26.544C7.21282 27.0457 7.62076 27.4537 8.12253 27.7094C8.69296 28 9.4397 28 10.9332 28Z" stroke="white" stroke-width="2.66667" stroke-linecap="round"/>
                    </svg>
                 )
                }
                {children}
            </Content>
            <DownSize $ratio={ratio}/>
            <Side $ratio={ratio} $isSmall>
                <svg width="100%" height="100%" viewBox="0 0 6 105" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 99.9029V0H6V105L0 99.9029Z" fill="#815027"/>
                </svg>
            </Side>
            <Decoration $ratio={ratio}/> 
        </Wrapper>
    )
}

export const Floor = forwardRef(FloorComponent);
