import {ParsedQs} from "qs";
import {Session} from "express-session";
import {Request} from "express";

export interface AuthQuery extends ParsedQs {
    redirect: string
    login: string
}

export interface AuthSession extends Session {
    redirect: string
}

export interface LoginSession {
    data: string
    iat: number
    exp: number
}

export interface AuthRequest extends Request {
    session: AuthSession
    sessionID: string
    query: AuthQuery
    user: string
}

export interface PatreonSession extends AuthSession {
    login: LoginSession
}

export interface PatreonRequest extends Request {
    session: PatreonSession
    query: AuthQuery
}

export interface PatreonUser {
    id: string
    about: string | null
    created: Date
    'default-country-code': string | null
    email: string
    'first-name': string
    'last-name': string
    gender: PatreonUserGender
    'image-url': string
    'patron-currency': string | null
    vanity: string
    pledges?: PatreonPledge[]
}

export enum PatreonUserGender {
    MALE,
    FEMALE,
    OTHER
}

export interface PatreonPledge {
    'amount-cents': number
    'created-at': Date
    currency: string
    'declined-since': Date | null
    'patron-pays-fees': boolean
    'pledge-cap-cents': number | null
    id: string
    reward: any
}

export type PatreonTier = 'none' | 'bronze' | 'silver' | 'gold';

const patreonRewards: { tier: PatreonTier, amount: number }[] = [
    { tier: 'bronze', amount: 100 },
    { tier: 'silver', amount: 500 },
    { tier: 'gold', amount: 1000 },
];

export function getPatreonReward(cents: number): PatreonTier {
    return patreonRewards.sort(((a, b) => (a.amount - cents) - (b.amount - cents)))[0].tier;
}