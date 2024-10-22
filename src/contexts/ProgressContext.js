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
    cardsSeen: [],
}

const ProgressContext = createContext(INITIAL_STATE);

const API_LINK = 'https://ft-admin-api.sjuksin.ru/';

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    const [points, setPoints] = useState(INITIAL_STATE.points);
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [currentWeekPoints, setCurrentWeekPoints] = useState(INITIAL_STATE.weekPoints);
    //krasnie na igre
    const [gamePoints, setGamePoints] = useState(0);
    //zelenie na igre
    const [questionsAmount, setQuestionsAmount] = useState(0);
    const [cardsSeen, setCardsSeen] = useState(INITIAL_STATE.cardsSeen);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [currentWeek, setCurrentWeek] = useState(CURRENT_WEEK);
    const screen = screens[currentScreen];
    const client = useRef();

    const getDbCurrentWeek = async () => {
        // const { week } = await client.current.loadProjectState();
        // if (week && !isNaN(+week)) {
        //     // setCurrentWeek(+week);
        //     setCurrentWeek(1);
        // }
    }

    useEffect(() => {
        // client.current = new FTClient(
        //     API_LINK,
        //     'alfa'
        // )
        // try {
        //     getDbCurrentWeek();
        // } catch (e) {
        //     console.log(e);
        // }
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

    const endGame = (level, levelPoints) => {
        const data = {
            passedWeeks: [...passedWeeks, level].join(','),
            [`week${level}Points`]: weekPoints + levelPoints,
            points: points + levelPoints,
        };
        
        setCurrentWeekPoints(prev => prev + levelPoints);
        setWeekPoints(prev => prev + levelPoints);
        setPoints(prev => prev = prev + levelPoints);

        setGamePoints(0);
        updateUser(data);
    };

    const updateUser = async (changed) => {
        return user;
        const { recordId } = user;
        const data = {
            ...user,
            points,
            [`week${currentWeek > 5 ? 5 : currentWeek}Points`]: currentWeekPoints,
            passedWeeks: passedWeeks.join(','),
            cardsSeen: cardsSeen.join(','),
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

    const registrateUser = async ({id, university, refId, email, city, direction, phone}) => {
        const data = {
            id,
            university, 
            refId,
            email,
            city,
            sex: '',
            direction,
            phone,
            seenRules: false,
            week1Points: 0,
            week2Points: 0,
            week3Points: 0,
            week4Points: 0,
            week5Points: 0,
            points: 0,
            registerWeek: currentWeek,
            passedWeeks: '',
            cardsSeen: '',
        };

        const userInfo = {
            id,
            university, 
            refId,
            email,
            city,
            sex: '',
            seenRules: false,
            week1Points: 0,
            week2Points: 0,
            week3Points: 0,
            week4Points: 0,
            week5Points: 0,
            points: 0,
            registerWeek: currentWeek,
            passedWeeks: '',
            cardsSeen: '',
            direction,
            phone,
        };

        setUser({...userInfo});
        return user;


       try {
            const record = await client?.current.createRecord(data);
            setUser({...userInfo, recordId: record.id});
            setPoints(INITIAL_STATE.points);
            setWeekPoints(INITIAL_STATE.weekPoints);
            setCurrentWeekPoints(INITIAL_STATE.weekPoints);
            setCardsSeen(INITIAL_STATE.cardsSeen);
            setPassedWeeks(INITIAL_STATE.passedWeeks);
            
            return record; 
       } catch (e) {
            return {isError: true}
       }
    };

    const getUserInfo = async (email) => {
       try {
            const record = await client?.current.findRecord('email', email);
            if (!record) return {isError: true}; 
            const {data, id} = record;
            let userInfo = {};

            userInfo = {
                recordId: id,
                id: data.id,
                // name: data.name,
                email,
                city: data.city,
                sex: data.sex,
                seenRules: data.seenRules,
                registerWeek: data.registerWeek,
                week1Points: data.week1Points, 
                week2Points: data.week2Points,  
                week3Points: data.week3Points, 
                week4Points: data.week4Points, 
                week5Points: data.week5Points, 
                isEmployee: data.isEmployee,
            };

            setUser(userInfo);
            const passed = data?.passedWeeks?.length > 0 ? data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            const cardsSeen = data?.cardsSeen?.length > 0 ? data.cardsSeen.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            setPassedWeeks(passed);
            setCardsSeen(cardsSeen);
            setPoints(data?.points ?? 0);
            setWeekPoints(data?.[`week${currentWeek > 5 ? 5 : currentWeek}Points`] ?? 0);
            setCurrentWeekPoints(data?.[`week${currentWeek > 5 ? 5 : currentWeek}Points`] ?? 0);

            return {userInfo, passed};
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
        setCardsSeen,
        cardsSeen,
        endGame,
        updateUser,
        getUserInfo,
        registrateUser,
        currentWeek,
        currentWeekPoints, 
        setCurrentWeekPoints,
        questionsAmount, 
        setQuestionsAmount
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
