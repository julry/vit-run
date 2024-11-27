import React, { useRef, useState } from "react";
import styled from "styled-components";
import bg from "../../assets/images/lobbyBg.svg";
import floor0 from "../../assets/images/first-floor.svg";
import logosign from "../../assets/images/logosign.svg";
import decorations from "../../assets/images/decoration.svg";
import plant from "../../assets/images/plant.svg";
import { SCREENS } from "../../constants/screens";
import { weeks } from "../../constants/weeks";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { Button, IconButton, CurButton } from "../shared/Button";
import { Currancy } from "../shared/svg/Currancy";
import { FlexWrapper } from "../shared/FlexWrapper";
import { Floor } from "../shared/Floor";
import { Roof } from "../shared/svg";
import { InfoModal } from "../shared/modals";

const Wrapper = styled(FlexWrapper)`
    overflow: auto;
    background-color: #bfe8ff;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: ${({$ratio}) => $ratio * 175}px;
`;

const Header = styled.div`
    position: fixed;
    top: var(--spacing_x5);
    left: var(--spacing_x5);
    right: var(--spacing_x5);
    display: flex;
    z-index: 22;
`;

const HouseWrapper = styled.div`
    position: relative;
    z-index: 4;
`;

const RoofStyled = styled(Roof)`
    width: ${({$ratio}) => $ratio * 283}px;
    height: ${({$ratio}) => $ratio * 25}px;
    margin-left: ${({$ratio}) => $ratio * -(283 - 254)/2}px;
    z-index: 10;
`;

const FloorStyled = styled(Floor)`
    z-index: ${({$index}) => 2 + $index};
    margin-top: calc(0px - 1.5 * var(--spacing_x1));
    & + & {
        margin-top: calc(0px - var(--spacing_x4));
    }
`;

const CurrencyButton = styled(CurButton)`
    & svg {
        width: ${({$ratio}) => $ratio * 18}px;
        height: ${({$ratio}) => $ratio * 18}px;
    }

    & + & {
        margin-left: var(--spacing_x4);
    }
`;

const ButtonsBlock = styled.div`
    display: flex;
    margin-left: auto;
`;

const InfoSign = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 48}px;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    color: #060606;
    border: 1px solid var(--color-${({$color}) => $color});
    border-radius: var(--spacing_x2);
    font-size:  ${({$ratio}) => $ratio * 11}px;
    padding: ${({$ratio}) => $ratio * 6}px;
    padding-right: ${({$ratio}) => $ratio * 26}px;
`;

const WeekInfoSign = styled(InfoSign)`
    position: static;
    background: #F6F1E5;
    padding-right:  ${({$ratio}) => $ratio * 6}px;
`;

const BulletPoints = styled.ul`
    margin-top: var(--spacing_x2);
    margin-left: var(--spacing_x3);
`;

const FirstFloor = styled.div`
    position: relative;
    z-index: 10;
    width: ${({$ratio}) => $ratio * 274}px;
    height: ${({$ratio}) => $ratio * 134}px;
    background: url(${floor0}) no-repeat 0 0 /cover;
    margin-left: ${({$ratio}) => $ratio * -12}px;

    &::after {
        content: '';
        position: absolute;
        z-index: 4;
        left: 50%;
        transform: translateX(-50%);
        top: ${({$ratio}) => $ratio * -23}px;
        width: ${({$ratio}) => $ratio * 47}px;
        height: ${({$ratio}) => $ratio * 46}px;
        background: url(${logosign}) no-repeat 0 0 /cover;
    }
`;

const Ground = styled.div`
    position: relative;
    width: 100%;
    height:  ${({$ratio}) => $ratio * 107}px;
    margin-top:  ${({$ratio}) => $ratio * -34}px;
    background: #EDE4CA;
    z-index: 2;
    flex-shrink: 0;

    &::before {
        content: '';
        position: absolute;
        top: ${({$ratio}) => $ratio * -69}px;
        left: 0;
        right: 0;
        height: ${({$ratio}) => $ratio * 17}px;
        background: #4D3B0B;
    }
    &::after {
        content: '';
        position: absolute;
        top: ${({$ratio}) => $ratio * -58}px;
        left: 0;
        right: 0;
        height: ${({$ratio}) => $ratio * 58}px;
        background: #D3B360;
    }
`;

const Decoration = styled.div`
    position: absolute;
    z-index: 15;
    left: calc(0px - (100vw - ${({$ratio}) => $ratio * 262}px) / 2);
    bottom: ${({$ratio}) => $ratio * -47}px;
    height: ${({$ratio}) => $ratio * 127}px;
    width: ${({$ratio}) => $ratio * 276}px;
    background: url(${decorations}) no-repeat 0 0 /cover;
    flex-shrink: 0;

    @media screen and (min-width: 450px) {
        left: ${({$ratio}) => $ratio * -53}px
    }
`;

const Plant = styled.div`
    position: absolute;
    z-index: 11;
    bottom: ${({$ratio}) => $ratio * -5}px;
    height: ${({$ratio}) => $ratio * 49}px;
    width: ${({$ratio}) => $ratio * 18}px;
    background: url(${plant}) no-repeat 0 0 /cover;
`;

const PlantLeft = styled(Plant)`
    left: ${({$ratio}) => $ratio * 10}px;
`;

const PlantRight = styled(Plant)`
    right: ${({$ratio}) => $ratio * -10}px;
`;

const VideoBtnWrapper = styled.div`
    position: fixed;
    display: flex;
    align-items: flex-end;
    bottom: var(--spacing_x4);
    right: var(--spacing_x5);
    z-index: 20;
`;

const ProfileWrapper = styled.div`
    position: relative;
    margin-right: var(--spacing_x4);
`;

const VideoBlock = styled(InfoSign)`
    position: static;
    display: flex;
    flex-direction: column;
    background: #F6F1E5;
    align-items: center;
    margin-right: ${({$ratio}) => $ratio * 6}px;
    padding-right: ${({$ratio}) => $ratio * 6}px;

    & p {
        font-size: ${({$ratio}) => $ratio * 14}px;
        margin-bottom: ${({$ratio}) => $ratio * 6}px;
    }

    & button {
        flex-grow: 0;
        font-size: ${({$ratio}) => $ratio * 10}px;
    }
`;

const ProfileBlock = styled(InfoSign)`
    background: white;
    left: auto;
    right:  ${({$ratio}) => $ratio * -10}px;
    padding-right: ${({$ratio}) => $ratio * 6}px;

    & button:last-of-type {
        width: max-content;
        margin-top: var(--spacing_x2);
        font-size: ${({$ratio}) => $ratio * 14}px;
    }
`;

const CloseButton = styled(Button)`
    position: absolute;
    right: var(--spacing_x2);
    top: var(--spacing_small);
    padding: 0;
    width:  ${({$ratio}) => $ratio * 24}px;
    height:  ${({$ratio}) => $ratio * 24}px;
    background: none;
`;

const CloseButtonInfo = styled(CloseButton)`
    top: var(--spacing_x2);
    width:  ${({$ratio}) => $ratio * 18}px;
    height:  ${({$ratio}) => $ratio * 18}px;

    & svg {
        width:  ${({$ratio}) => $ratio * 12}px;
        height:  ${({$ratio}) => $ratio * 12}px;
    }
`;

const WEEK_TO_NEXT_SCREEN = {
    1: SCREENS.PREGAME1,
    2: SCREENS.PREGAME2,
    3: SCREENS.PREGAME3,
    4: SCREENS.PREGAME4,
    5: SCREENS.PREGAME5,
}

const WEEK_TO_QUESTION_SCREEN = {
    1: SCREENS.POST_GAME1,
    2: SCREENS.POST_GAME2,
    3: SCREENS.POST_GAME3,
    4: SCREENS.POST_GAME4,
    5: SCREENS.POST_GAME5,
}

const WEEK_TO_ANSWER_SCREEN = {
    1: SCREENS.ANSWERS1,
    2: SCREENS.ANSWERS2,
    3: SCREENS.ANSWERS3,
    4: SCREENS.ANSWERS4,
    5: SCREENS.ANSWERS5,
}

export const Lobby = () => {
    const ratio = useSizeRatio();
    const [info, setInfo] = useState();
    const [isVideo, setIsVideo] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [nextWeekInfo, setNextWeekInfo] = useState();
    const { passedWeeks, answeredWeeks, next, points, weekPoints, user, currentWeek, updateUser } = useProgress();
    const [isRules, setIsRules] = useState(!user?.seenRules && currentWeek < 6);
    const shownWeek = (passedWeeks[passedWeeks.length - 1] ?? 0) + 1;
    const shownAnswerWeek = (answeredWeeks[answeredWeeks.length - 1] ?? 0) + 1;
    const floorRef = useRef();
    const wrapperRef = useRef();
  
    const handleClickInfo = (e, info) => {
        e.stopPropagation();
        setInfo(info);
        setIsProfile(false);
    }

    const handleClickOutside = () => {
        setInfo();
        setIsVideo(false);
    }

    const handleVideoClick = () => {
        setIsVideo(false);
        reachMetrikaGoal('video');
        window.open('https://vitmarathon.ru/video', '_blank');
    };

    const handleClickVideo = (e) => {
        e.stopPropagation();
        setIsVideo(prev => !prev);
    } 
    
    const handleClickProfile = (e) => {
        e.stopPropagation();
        setIsProfile(prev => !prev);
        setInfo();
    }

    const handleOpenFloor = (week) => {
        if (currentWeek >= 6) {
            next(WEEK_TO_ANSWER_SCREEN[week.week]);

            return;
        }
        if (week.week > shownWeek || week.week > currentWeek || week.week > shownAnswerWeek) {
            setNextWeekInfo(week.week);
            return;
        }

        if (passedWeeks.includes(week.week) && !answeredWeeks.includes(week.week)) {
            next(WEEK_TO_QUESTION_SCREEN[week.week]);

            return;
        }
        
        if (passedWeeks.includes(week.week)) return;

        reachMetrikaGoal(`level-${week.week}`);

        next(WEEK_TO_NEXT_SCREEN[week.week])
    }


    const handleCloseRules = () => {
        if (!user.seenRules) {
            updateUser({seenRules: true});

            if (floorRef?.current) {
                const { x, y } = floorRef.current.getBoundingClientRect();

                wrapperRef.current.scrollTo(x, y);
            }
        }

        setIsRules(false);
    }

    const getIsOpen = (week) => {
        return currentWeek >= 6 || (week <= shownWeek && week <= currentWeek && week <= shownAnswerWeek);
    }

    return (
        <>
        <Wrapper $ratio={ratio} onClick={handleClickOutside} ref={wrapperRef}>
            <Header>
                <CurrencyButton 
                    $ratio={ratio} 
                    color="red" 
                    onClick={(e) => handleClickInfo(e, {color: 'red', text: 'игру', bullets: ['за каждого приглашённого друга в игру — 1 виткоин\n(максимально 10)']})}
                >
                    <Currancy />
                    <p>{points}</p>
                </CurrencyButton>
                <CurrencyButton $ratio={ratio} color="green" onClick={(e) => handleClickInfo(e, {color: 'green', text: 'неделю'})}>
                    <Currancy />
                    <p>{weekPoints}</p>
                </CurrencyButton>
                <ButtonsBlock>
                    <ProfileWrapper>
                        <IconButton onClick={handleClickProfile}>
                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99984 9.33317C9.84079 9.33317 11.3332 7.84079 11.3332 5.99984C11.3332 4.15889 9.84079 2.6665 7.99984 2.6665C6.15889 2.6665 4.6665 4.15889 4.6665 5.99984C4.6665 7.84079 6.15889 9.33317 7.99984 9.33317ZM7.99984 9.33317C5.05432 9.33317 2.6665 11.124 2.6665 13.3332M7.99984 9.33317C10.9454 9.33317 13.3332 11.124 13.3332 13.3332" stroke="white" strokeWidth="1.33333" strokeLinecap="round"/>
                            </svg>
                        </IconButton>

                        {isProfile && (
                            <ProfileBlock  $ratio={ratio} $color="red">
                                <CloseButton onClick={() => setIsProfile(false)} $ratio={ratio}>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13M13 13L1 1.00001" stroke="#F9471E" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </CloseButton>
                                <p><b>Профиль</b></p>
                                <p>{user.name} {user.lastname}</p>
                                <p>ID: {user.id}</p>
                                <p>e-mail: {user.email}</p>
                                <Button onClick={() => window.open('/rating', '_blank')}>ПЕРЕЙТИ К РЕЙТИНГУ</Button>
                            </ProfileBlock>
                        )}
                    </ProfileWrapper>
                    <IconButton onClick={() => setIsRules(true)}>
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99985 11.3332V7.33318M7.99985 5.33318V5.32651M15.3332 7.99985C15.3332 12.0499 12.0499 15.3332 7.99985 15.3332C3.94975 15.3332 0.666504 12.0499 0.666504 7.99985C0.666504 3.94975 3.94975 0.666504 7.99985 0.666504C12.0499 0.666504 15.3332 3.94975 15.3332 7.99985Z" stroke="white" strokeWidth="1.33334" strokeLinecap="round"/>
                        </svg>
                    </IconButton>
                </ButtonsBlock>
                {info && (
                    <InfoSign $ratio={ratio} $color={info.color}>
                        <CloseButtonInfo onClick={() => setIsProfile(false)} $ratio={ratio}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13M13 13L1 1.00001" stroke={`var(--color-${info.color})`} strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </CloseButtonInfo>
                        <p>
                            Здесь суммируются твои результаты за {info.text}.{' '}
                            Виткоины ты можешь получить за
                        </p>
                        <BulletPoints>
                            <li>
                                каждый верный ответ на вопрос теста — 1 виткоин
                            </li>
                            <li>
                                каждый собранный полезный предмет — 1 виткоин
                            </li>
                            {info.bullets?.map(bullet => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </BulletPoints>
                    </InfoSign>
                )}
            </Header>
            <HouseWrapper>
                <RoofStyled $ratio={ratio}/>
                {weeks.map((week) => (
                    <FloorStyled 
                        key={week.id} 
                        ref={week.week === shownWeek ? floorRef : null}
                        onClick={() => handleOpenFloor(week)}
                        $index={week.id} 
                        isOpen={getIsOpen(week.week)} 
                        isUpper={week.isLast}
                        floorNum={week.week}
                        floorPic={week.pic}
                    >
                        {week.week === 2 && currentWeek === 1 && nextWeekInfo !== week.week && (
                            <WeekInfoSign $ratio={ratio} $color="red">
                                <p>Новая локация открывается{'\n'}каждую неделю</p>
                            </WeekInfoSign>
                        )}
                        {nextWeekInfo === week.week && (
                            <WeekInfoSign $ratio={ratio} $color="red">
                                <p>Проходи уровни по порядку</p>
                            </WeekInfoSign>
                        )}
                    </FloorStyled>
                ))}
                <FirstFloor $ratio={ratio}/>
                <PlantLeft $ratio={ratio}/>
                <PlantRight $ratio={ratio}/>
                <Decoration $ratio={ratio} />
            </HouseWrapper>
            <Ground $ratio={ratio} />
            <VideoBtnWrapper>
                {isVideo && (
                        <VideoBlock $ratio={ratio} $color="red">
                            <p>
                                Не забудь посмотреть{'\n'}видео марафона.
                            </p>
                            <Button onClick={handleVideoClick}>Перейти</Button>
                        </VideoBlock>
                )}
                <IconButton $ratio={ratio} onClick={handleClickVideo}>
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10.6667V14M8 14H12M8 14H4M4.13333 10.6667H11.8667C12.6134 10.6667 12.9868 10.6667 13.272 10.5213C13.5229 10.3935 13.7268 10.1895 13.8547 9.93865C14 9.65344 14 9.28007 14 8.53333V4.13333C14 3.3866 14 3.01323 13.8547 2.72801C13.7268 2.47713 13.5229 2.27316 13.272 2.14532C12.9868 2 12.6134 2 11.8667 2H4.13333C3.3866 2 3.01323 2 2.72801 2.14532C2.47713 2.27316 2.27316 2.47713 2.14532 2.72801C2 3.01323 2 3.3866 2 4.13333V8.53333C2 9.28007 2 9.65344 2.14532 9.93865C2.27316 10.1895 2.47713 10.3935 2.72801 10.5213C3.01323 10.6667 3.3866 10.6667 4.13333 10.6667Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round"/>
                    </svg>
                </IconButton>
            </VideoBtnWrapper>
    </Wrapper>
    <InfoModal onClose={handleCloseRules} isShown={isRules}/>
</>
    )
}