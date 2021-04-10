import React from 'react';
import { useParams } from 'react-router';

interface ProfileRouteParams {
    nameAndTag?: string
    name?: string
    tag?: string
}
interface ProfileRouteProps {
}

export default function ProfileRoute(props: ProfileRouteProps) {
    let { nameAndTag, name, tag } = useParams<ProfileRouteParams>();
    if (!nameAndTag) {
        nameAndTag = name + '#' + tag;
    }

    return <></>
}