import React, {PropsWithChildren} from 'react';
import * as style from '../styles/components/container.css';
const styles = style.default;

function Container(props: PropsWithChildren<{}>) {
    return (
        <div className={styles.container}>{ props.children }</div>
    );
}

export default Container;