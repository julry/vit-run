import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    z-index: 1000;
    overflow: hidden;
    background: ${({$isDarken}) => $isDarken ? 'rgba(0, 0, 0, 0.8)' : 'transparent'};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Modal = ({isDarken, isShown, isDisabledAnimation, ...props}) => (
    <AnimatePresence>
        {isShown && (
            <Wrapper  
                {...props}
                $isDarken={isDarken}
                initial={{
                    opacity: isDisabledAnimation? 1 : 0,
                }}
                animate={!isDisabledAnimation && {opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            />
        )}
    </AnimatePresence>
)