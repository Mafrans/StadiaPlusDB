import React, {PropsWithChildren} from 'react';
import style from './styles/components/container.css';

function Container(props: PropsWithChildren<{}>) {
    return (
        <div className={style.container}>{ props.children }</div>
    );
}

export default Container;