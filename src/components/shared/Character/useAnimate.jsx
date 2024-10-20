import {useCallback, useEffect, useState} from "react";
import throttle from "lodash/throttle";
import female0 from '../../../assets/images/female_start.svg';
import female1 from '../../../assets/images/female_1.svg';
import female2 from '../../../assets/images/female_2.svg';
import female3 from '../../../assets/images/female_3.svg';
import male0 from '../../../assets/images/male_start.svg';
import male1 from '../../../assets/images/male_1.svg';
import male2 from '../../../assets/images/male_2.svg';
import male3 from '../../../assets/images/male_3.svg';
import { SEX } from "../../../constants/sex";
import { useProgress } from "../../../contexts/ProgressContext";

export const STAND_INDEX = 0;
export const FIRST_INDEX = 1;
export const SECOND_INDEX = 2;
export const THIRD_INDEX = 3;

const FEMALE_CHARACTER = [female0, female1, female2, female3];
const MALE_CHARACTER = [male0, male1, male2, male3];

const INDEXES_LOOP = {
    0: 1,
    1: 2,
    2: 3,
    3: 1,
};


const SEX_TO_CHARACTER = {
    [SEX.Female]: FEMALE_CHARACTER,
    [SEX.Male]: MALE_CHARACTER
}

export function useAnimate(isPause) {
    const { user } = useProgress(); 
    const [index, setIndex] = useState(STAND_INDEX);
    const sexSource = SEX_TO_CHARACTER?.[user?.sex ?? SEX.Female] ?? FEMALE_CHARACTER;
    const source = sexSource?.[index];

    const animate = useCallback(
        throttle(() => {
            if (isPause) {
                setIndex(STAND_INDEX);
                return;
            }
            setIndex(prev => prev in INDEXES_LOOP ? INDEXES_LOOP[prev] : FIRST_INDEX);
        }, 300),
        [isPause],
    );

    useEffect(() => {
        animate();

        const timer = setTimeout(() => animate(), 300);

        return () => clearTimeout(timer);
    }, [index, isPause]);

    
    return source;
}