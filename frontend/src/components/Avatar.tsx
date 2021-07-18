import React from 'react';
import Halo from "./Halo";
import style from '../styles/components/avatar.css';

interface ProfilePictureProps {
    url: string
}

export default function Avatar(props: ProfilePictureProps) {
    return <div className={style.avatar}>
        <Halo color={'var(--color-neon-gradient)'}>
            <img src={props.url} alt={'Profile Avatar'} />
        </Halo>
    </div>
}
