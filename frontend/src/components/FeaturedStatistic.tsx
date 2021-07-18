import React from 'react';
import style from '../styles/components/featured-statistic.css';

type FeaturedStatisticProps = {
    prefix?: string
    value: any
    label?: string
    suffix?: string
}

function FeaturedStatistic(props: FeaturedStatisticProps) {
    return (
        <div className={style['featured-statistic']}>
            <div className={style.content}>
                <div className={style.value}>
                    <span>{ props.prefix }</span>
                    <span>{ props.value }</span>
                    <span>{ props.suffix }</span>
                </div>
                <span className={style.label}>{ props.label }</span>
            </div>
        </div>
    );
}

export default FeaturedStatistic;