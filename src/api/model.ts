import {Request} from "express";
import {ParamsDictionary} from "express-serve-static-core";

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
        achievements: Achievement[]
    }
}