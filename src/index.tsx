// импорт react в TS отличается от привычного import React from 'react' из-за особенностей модульной системы в TS
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import withCount from "./hoc/withCount";
import DisplayCount from "./hoc/displayCount";

// необходимо описывать интерфейсы для props и state компонентов
interface IAppProps {
    title: string;
}

const Counter = withCount(DisplayCount);
/*
 * title - свойство напрямую передается компоненту DisplayCount
 * increment - свойство используется в компоненте высшего порядка
 */
const App = () => <Counter title="High Order Component" increment={1} /> ;

// функциональный компонент
// const App = (props: IAppProps) => <h1>{props.title}</h1>;

ReactDOM.render(
    // <App title="Hello, my React!" />,
    App(),
    document.getElementById('root')
);