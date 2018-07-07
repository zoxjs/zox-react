import * as React from "react";

export type Props = {
    text: any
}

export function MyFuncComponent(props: Props)
{
    return (
        <div className='func-component'>
            <p>This is {props.text}</p>
        </div>
    );
}
