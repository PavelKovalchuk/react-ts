import * as React from 'react';
import {Component} from "react";

// свойства, которые hoc добавит компоненту
export interface InjectedProps {
    count: number;
}

// свойства, которые нужны только hoc
interface ExternalProps {
    increment: number;
}

// состояние hoc, в этом случае идентично InjectedProps, так как именно его мы будем передавать в компонент
interface State {
    count: number;
}

/**
 * Объявляем функцию, наш компонент высшего порядка, как дженерик,
 * в который мы будем передавать OriginProps - уникальные свойства компонента.
 * Дженерик React.ComponentType - означает ComponentClass или StatelessComponent,
 * то есть компонент, объявленный как класс, или функциональный компонент.
 * Функция ожидает, что интерфейс свойств компонента будет смесью его уникальных свойств,
 * и свойств которые добавит hoc - OriginProps & InjectedProps
 */
function withCount<OriginProps>(Component: React.ComponentType<OriginProps & InjectedProps>) {
    // Интерфейс свойств нового компонента
    type ResultProps = OriginProps & ExternalProps;

    return class extends React.Component<ResultProps, State> {
        /**
         * Имя компонента доступно в свойстве name или displayName,
         * изменяем имя нового компонента, для удобного отображения в React DevTools
         */
        // static displayName = `WithCount(${Component.displayName || Component.name})`;
        static displayName = `WithCount(${Component.displayName})`;

        state: State = {
            count: 0
        }

        increment = () => {
            const { increment } = this.props;
            this.setState((prevState: State) => ({ count: prevState.count + increment }));
        }

        render() {
            // {...this.props} и {...this.state} - стандартная передача всех свойств и состояния.
            return (
                <div>
                    <Component {...this.props} {...this.state} />
                    <button
                        type="button"
                        onClick={this.increment}
                    > + </button>
                </div>
            )
        }
    }
}

export default withCount;