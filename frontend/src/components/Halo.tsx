import React, {PropsWithChildren} from 'react';
import style from '../styles/components/halo.css';

type HaloProps = {
    color?: string
}

function Halo(props: PropsWithChildren<HaloProps>) {
    return (
        <div className={style.halo}>
            <div className={style.content}>{props.children}</div>
            <div className={style.shadow} style={{ background: props.color ?? 'var(--color-white)' }} />
        </div>
    );
}
export default Halo;