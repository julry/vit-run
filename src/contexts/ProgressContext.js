import { FTClient } from 'ft-client';
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
    collectedQuestions: [],
}

const ProgressContext = createContext(INITIAL_STATE);

const API_LINK = 'https://games-admin.fut.ru/api/';

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreen, setCurrentScreen] = useState(INITIAL_STATE.screen);
    // const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    const [points, setPoints] = useState(INITIAL_STATE.points);
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [currentWeekPoints, setCurrentWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [gamePoints, setGamePoints] = useState(0);
    const [questionsAmount, setQuestionsAmount] = useState(0);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [collectedQuestions, setCollectedQuestions] = useState(INITIAL_STATE.collectedQuestions);
    const [currentWeek, setCurrentWeek] = useState(CURRENT_WEEK);
    const screen = screens[currentScreen];
    const client = useRef();

    const getDbCurrentWeek = async () => {
        const { week } = await client.current.loadProjectState();
        if (week && !isNaN(+week)) {
            setCurrentWeek(+week);
            // setCurrentWeek(2);
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

    const addGamePoint = () => setGamePoints(prev => prev + 1);

    const endGame = (level) => {
        const data = {
            passedWeeks: [...passedWeeks, level].join(','),
            [`scoreWeek${level}`]: weekPoints + gamePoints,
            scoreTotal: points + gamePoints,
            collectedQuestions: (collectedQuestions[level - 1] ? collectedQuestions : [...collectedQuestions, questionsAmount]).join(',')
        };
        
        setCurrentWeekPoints(prev => prev + gamePoints);
        setCollectedQuestions(prev => prev[level - 1] ? prev : [...prev, questionsAmount]);
        setPassedWeeks(prev=> prev.includes(level) ? prev : [...prev, level]);

        if (level === currentWeek) {
            setWeekPoints(prev => prev + gamePoints);
        }

        setPoints(prev => prev + gamePoints);

        setGamePoints(0);
        updateUser(data);
    };

    const endQuestions = (level, questionPoints) => {
        const data = {
            [`scoreWeek${level}`]: weekPoints + questionPoints,
            scoreTotal: points + questionPoints,
            collectedQuestions: collectedQuestions.map((collected, ind) => ind === level - 1 ? 'null' : collected).join(',')
        };
        
        if (level === currentWeek) {
            setWeekPoints(prev => prev + questionPoints);
        }

        setPoints(prev => prev + questionPoints);
        setCollectedQuestions(prev => prev.map((collected, ind) => ind === level - 1 ? undefined : collected));

        setQuestionsAmount(0);
        updateUser(data);
    };

    const updateUser = async (changed) => {
        const { recordId, ...restUser } = user;
        const data = {
            ...restUser,
            scoreTotal: points,
            [`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`]: currentWeekPoints,
            passedWeeks: passedWeeks.join(','),
            collectedQuestions: collectedQuestions.join(','),
            ...changed,
        };

        if (!recordId) return {...data, isEror: true};

        try {
            const result = await client.current.updateRecord(recordId, data);

            return result;
        } catch (e) {
            console.log(e);

            return {...data, isEror: true};
        }
    }

    // const registrateUser = async () => {
    //     const data = {
    //         id: '123421',
    //         // name: 'test',
    //         email: 'dev@dev.ru',
    //         city: 'Москва',
    //         sex: SEX.Female,
    //         // phone: data.phone,
    //         fieldOfStudy: 'dev',
    //         university: 'dev',
    //         refID: 'dev',
    //         seenRules: true,
    //         scoreWeek1: 0, 
    //         scoreWeek2: 0,  
    //         scoreWeek3: 0, 
    //         scoreWeek4: 0, 
    //         scoreWeek5: 0, 
    //         scoreTotal: 0,
    //         passedWeeks: '',
    //         collectedQuestions: '',
    //     };

    //     try {
    //         const record = await client?.current.createRecord(data);
            
    //         return record; 
    //    } catch (e) {
    //         return {isError: true}
    //    }
    // };

    const getUserInfo = async (email) => {
       try {
            const record = await client?.current.findRecord('email', email);
            if (!record) return {isError: true}; 
            const {data, id} = record;
            let userInfo = {};

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
                seenRules: data.seenRules,
                scoreWeek1: data.scoreWeek1, 
                scoreWeek2: data.scoreWeek2,  
                scoreWeek3: data.scoreWeek3, 
                scoreWeek4: data.scoreWeek4, 
                scoreWeek5: data.scoreWeek5, 
            };

            setUser(userInfo);
            const passed = data?.passedWeeks?.length > 0 ? data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            const questions = data?.collectedQuestions?.length > 0 ? data.collectedQuestions.replace(' ', '').split(',').map((l) => (l === 'null' ? undefined : +l.trim())) : [];
            setPassedWeeks(passed);
            setCollectedQuestions(questions);
            setPoints(data?.scoreTotal ?? 0);
            setWeekPoints(data?.[`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`] ?? 0);
            setCurrentWeekPoints(data?.[`scoreWeek${currentWeek > 5 ? 5 : currentWeek}`] ?? 0);

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
        addGamePoint,
        setGamePoints,
        gamePoints,
        setWeekPoints,
        setPoints,
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
        collectedQuestions,
        endQuestions
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
