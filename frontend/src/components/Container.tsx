import React, {PropsWithChildren} from 'react';
import '../styles/components/Container.scss';

interface ContainerProps {
}

export default function Container(props: PropsWithChildren<ContainerProps>) {
    return <div className='container'>{props.children}</div>
}