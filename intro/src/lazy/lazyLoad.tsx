import * as React from 'react';

/*
 * В load ожидается функция вида:
 * () => import('path/to/module')
 * Я не нашел готового интерфейса для результата выполнения import(), поэтому для
 * упрощения в итоговом промисе ожидаем только свойство default.
 * Результат экспорта не по умолчанию можно было бы описать так -
 * [key: string]: React.ComponentType
 */
interface LazyLoadProps {
    load: () => Promise<{ default: React.ComponentType }>;
}

// Динамический компонент будем хранить в состоянии
interface LazyLoadState {
    Component: React.ComponentType;
}

class LazyLoad extends React.Component<LazyLoadProps, LazyLoadState> {
    // null будет говорить нам о том, что компонент еще загружается
    state: LazyLoadState = {
        Component: null
    }

    // Вместо async await можно использовать промисы, зависит от ваших предпочтений
    async componentDidMount() {
        const { load } = this.props;

        try {
            // Получаем результат импорта - модуль
            const module = await load();
            // Получаем наш компонент из свойства default
            const Component = module.default;
            // Обновление state вызовет новый рендер
            this.setState({ Component });
        } catch (e) {
            // Обработка ошибок по вкусу
        }
    }

    render() {
        const { Component } = this.state;

        // Тернарный оператор, для вывода заглушки на момент отсутствия компонента.
        // Можно добавить прелоадер, можно скрывать весь компонент LazyLoad
        return (
            <div>
                <h4>Lazy load component</h4>
                {Component ? <Component /> : '...'}
            </div>
        );
    }
}

export default LazyLoad;