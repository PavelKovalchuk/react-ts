import * as React from 'react';
import { InjectedProps } from './withCount';

// уникальные свойства компонента
interface OriginProps {
    title: string;
}

/*
 * Объединяем уникальные и внешние свойства, что бы иметь возможность передавать
 * в компонент InjectedProps, которые добавляет withCount
 */
const DisplayCount = (props: OriginProps & InjectedProps) => (
    <div>
        <h4>{props.title}</h4>
        <div>Count: {props.count}</div>
    </div>
);

export default DisplayCount;