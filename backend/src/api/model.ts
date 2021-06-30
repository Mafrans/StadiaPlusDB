import {Request} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";

// History

export interface HistoryRequest extends Request {
    params: HistoryParams
    query: HistoryQuery
}

export interface HistoryParams extends ParamsDictionary {
    name: string
    tag: string
}

export interface HistoryQuery extends ParsedQs {
    game: string
    start: string
    count: string
}

// Achievements

export interface AchievementsRequest extends Request {
    params: AchievementsParams
    query: AchievementsQuery
}

export interface AchievementsParams extends ParamsDictionary {
    name: string
    tag: string
}

export interface AchievementsQuery extends ParsedQs {
    game: string
    start: string
    count: string
}

export interface AchievementRarityRequest extends Request {
    params: AchievementRarityParams
}

export interface AchievementRarityParams extends ParamsDictionary {
    game: string
    index: string
}

// Profile
export interface ProfileRequest extends Request {
    params: ProfileParams
}

export interface ProfileParams extends ParamsDictionary {
    name: string
    tag: string
}


// ProfileRedirect
export interface ProfileRedirectRequest extends Request {
    params: ProfileRedirectParams
}

export interface ProfileRedirectParams extends ParamsDictionary {
    name: string
}

export interface ProfileUpdateRequest extends Request {
    body: ProfileUpdateBody
}


// ProfileUpdate
export interface UserProfileData {
    avatar: string
    name: string
}

export interface Game {
    name: string
    id: string
}

export interface Achievement {
    name: string
    description: string
    game: string
    icon: string
    id: number
    value: number
}

export interface ProfileUpdateBody {
    data: {
        profile: UserProfileData
        game: Game
        playTime: number
        achievementCount: number
        achievements: Achievement[]
    }
}