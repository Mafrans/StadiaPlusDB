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
    let { name, tag } = useParams<ProfileRouteParams>();
    if (!tag) {
        const hash = location.hash.substring(1, 5);
        if (!hash) {
            tag = '0000';
        }
        tag = hash;
    }

    return <div className='container'>{ name }#{ tag }</div>
}