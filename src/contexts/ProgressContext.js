import { FTClient } from 'ft-client';
import { isNumber } from 'lodash';
import {createContext, useEffect, useContext, useRef, useState} from 'react'
import {SCREENS, NEXT_SCREENS} from "../constants/screens";
import {screens} from "../constants/screensComponents";
import {getUrlParam} from "../utils/getUrlParam";

const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
    city: '',
    direction: '',
    phone: '',
    sex: '',
    seenRules: false,
    isEmployee: false,
    weekQuestions: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    week1Points: 0,
    week2Points: 0,
    week3Points: 0,
    week4Points: 0,
    week5Points: 0,
};

const getCurrentWeek = () => {
    const today = new Date();

    if (today < new Date(2024, 10, 4)) return 1;
    if (today < new Date(2024, 10, 11)) return 2;
    if (today < new Date(2024, 10, 18)) return 3;
    if (today < new Date(2024, 10, 25)) return 4;
    if (today < new Date(2024, 11, 2)) return 5;

    return 6;
}

export const CURRENT_WEEK = getCurrentWeek();

const INITIAL_STATE = {
    screen: SCREENS.LOGIN,
    points: 0,
    weekPoints: 0,
    user: INITIAL_USER,
    passedWeeks: [],
    answeredWeeks: [],
}

const ProgressContext = createContext(INITIAL_STATE);

const API_LINK = 'https://games-admin.fut.ru/api/';

export function ProgressProvider(props) {
    const {children} = props
    // const [currentScreen, setCurrentScreen] = useState(INITIAL_STATE.screen);
    const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    const [points, setPoints] = useState(INITIAL_STATE.points);
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [currentWeekPoints, setCurrentWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [gamePoints, setGamePoints] = useState(0);
    const [questionsAmount, setQuestionsAmount] = useState(0);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [answeredWeeks, setAnsweredWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [currentWeek, setCurrentWeek] = useState(CURRENT_WEEK);
    const screen = screens[currentScreen];
    const client = useRef();

    const getDbCurrentWeek = async () => {
        const { week } = await client.current.loadProjectState();
        if (week && !isNaN(+week)) {
            // setCurrentWeek(+week);
            setCurrentWeek(6);
        }
    }

    useEffect(() => {
        client.current = new FTClient(
            API_LINK,
            'runner-vkusno-i-tochka'
        )
        try {
            getDbCurrentWeek();
        } catch (e) {
            console.log(e);
        }
    }, []);

    const next = (customScreen) => {
        const nextScreen = customScreen ?? NEXT_SCREENS[currentScreen]

        if (!nextScreen) {
            return
        }

        setCurrentScreen(nextScreen)
    }

    const setUserInfo = (user) => {
        setUser(prev => ({...prev, ...user}));
    }

    const endGame = async (level, newId) => {
        if (passedWeeks.includes(level)) {
            setGamePoints(0);
            return { isAlreadyPassedError: true }
        }

        const displayedPoints = gamePoints > 10 ? 10 : gamePoints;
        const weekQuestions = {...user.weekQuestions, [level]: questionsAmount};
        const scoreTotal = points + displayedPoints;
        const data = {
            passedWeeks: [...passedWeeks, level].join(','),
            [`scoreWeek${level}`]: weekPoints + displayedPoints,
            scoreTotal,
            weekQuestions: Object.values(weekQuestions).join(','),
        };

        const updateResult = await updateUser(data, newId);
        if (updateResult?.isError) return updateResult;

        setUserInfo({[`scoreWeek${level}`]: weekPoints + displayedPoints, weekQuestions});
        
        setPassedWeeks(prev=> prev.includes(level) ? prev : [...prev, level]);
        setPoints(scoreTotal);

        if (level === currentWeek) {
            setWeekPoints(prev => prev + displayedPoints);
            setCurrentWeekPoints(prev => prev + displayedPoints);
        }

        setGamePoints(0);
    };

    const endQuestions = async (level, questionPoints, newId) => {
        if (answeredWeeks.includes(level)) {
            setQuestionsAmount(0);
            return { isAlreadyPassedError: true }
        }

        const displayedPoints = questionPoints > 10 ? 10 : questionPoints;
        const scoreTotal = points + displayedPoints;

        const data = {
            [`scoreWeek${level}`]: (user[`scoreWeek${level}`] ?? 0) + displayedPoints,
            answeredWeeks: (answeredWeeks.includes(level) ? answeredWeeks : [...answeredWeeks, level]).join(','),
            scoreTotal,
        };

        const updateResult = await updateUser(data, newId);
        if (updateResult?.isError) return updateResult;

        setAnsweredWeeks(prev => prev.includes(level) ? prev : [...prev, level]);
        setUserInfo({[`scoreWeek${level}`]: (user[`scoreWeek${level}`] ?? 0) + displayedPoints});
        setPoints(scoreTotal);

        if (level === currentWeek) {
            setWeekPoints((user[`scoreWeek${level}`] ?? 0) + displayedPoints);
            setCurrentWeekPoints(prev => prev + displayedPoints);
        }

        setQuestionsAmount(0);
    };

    const updateUser = async (changed, newId) => {
        const { recordId, weekQuestions, ...restUser } = user;

        const updateId = recordId ?? newId;

        const data = {
            ...restUser,
            scoreTotal: points,
            [`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`]: (currentWeekPoints > 20 ? 20 : currentWeekPoints), 
            passedWeeks: passedWeeks.join(','),
            answeredWeeks: answeredWeeks.join(','),
            weekQuestions: Object.values(weekQuestions).join(','),
            ...changed,
        };

        if (data.scoreTotal > (10 + 20 * currentWeek)) {
            data.scoreTotal = (10 + 20 * currentWeek);
        }

        if (data[`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`] > 20) {
            data[`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`] = 20;
        }

        if (!updateId) return {...data, isError: true, isIdError: true};

        try {
            const result = await client.current.updateRecord(updateId, data);

            return result;
        } catch (e) {
            console.log(e);

            return {...data, isError: true};
        }
    }

    const getUserInfo = async (email, isRetry) => {
       try {
            const record = await client?.current.findRecord('email', email);
            if (!record) return {isError: true}; 
            const {data, id} = record;
            if (isRetry) return id ? {id} : {isError: true};
            let userInfo = {};
            const weekQuestions = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

            if (isNumber(+data.collectedQuestions)) {
                weekQuestions[1] = data.collectedQuestions;
            }

            if (data.weekQuestions?.length > 0) {
                const questions = data.weekQuestions.replace(' ', '').split(',');
                questions.forEach((q, ind) => weekQuestions[ind + 1] = +(q.trim()));
            }

            userInfo = {
                recordId: id,
                id: data.id,
                name: data.name,
                lastname: data.lastname,
                email,
                city: data.city,
                sex: data.sex,
                phone: data.phone,
                fieldOfStudy: data.fieldOfStudy,
                university: data.university,
                refID: data.refID,
                weekQuestions,
                seenRules: data.seenRules,
                scoreWeek1: data.scoreWeek1, 
                scoreWeek2: data.scoreWeek2,  
                scoreWeek3: data.scoreWeek3, 
                scoreWeek4: data.scoreWeek4, 
                scoreWeek5: data.scoreWeek5, 
            };

            setUser(userInfo);
            const passed = data?.passedWeeks?.length > 0 ? data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            const answered = data?.answeredWeeks?.length > 0 ? data.answeredWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            
            for (let i = 1; i < 6; i++) {
                if (data[`scoreWeek${i}`] > 10 && !answered.includes(i)) {
                    answered.push(i);
                }
            }

            const wPoints = data?.[`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`] ?? 0;
            const tPoints = data?.scoreTotal > (10 + 20 * currentWeek) ? (10 + 20 * currentWeek) : (data.scoreTotal ?? 0);

            setPassedWeeks(passed);
            setAnsweredWeeks(answered.sort((a, b) => a - b));
            setPoints(tPoints);
            setWeekPoints(wPoints > 20 ? 20 : wPoints);
            setCurrentWeekPoints(wPoints > 20 ? 20 : wPoints);

            return userInfo;
       } catch (e) {
            console.log(e);
            return {isError: true}
       }
    }

    const state = {
        screen,
        currentScreen,
        points,
        next,
        setUserInfo, 
        user,
        weekPoints,
        setGamePoints,
        gamePoints,
        passedWeeks,
        setPassedWeeks,
        endGame,
        updateUser,
        getUserInfo,
        currentWeek,
        currentWeekPoints, 
        setCurrentWeekPoints,
        questionsAmount, 
        setQuestionsAmount,
        endQuestions,
        answeredWeeks
    }

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
