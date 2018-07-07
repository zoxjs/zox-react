import * as React from "react";

export type Props = {
    text: any
}

export type State = {
    count: number
}

export class MyComponent extends React.Component<Props, State>
{
    public state = {
        count: 0
    };

    public render(): React.ReactNode
    {
        return (
            <div className='my-component'>
                <p>This is {this.props.text}</p>
                <p><button onClick={this.buttonClick.bind(this)}>Clicks: {this.state.count}</button></p>
            </div>
        );
    }

    public buttonClick(): void
    {
        ++this.state.count;
        this.setState(this.state);
    }
}
