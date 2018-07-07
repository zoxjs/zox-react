import * as React from "react";
import * as ReactDOM from "react-dom";
import {ComponentClass, Factory} from "react";

export type InitOptions = {
    components: { [name:string]: ComponentClass | Factory<any>}
    globalProps?: { [p:string]: any }
}

export function InitReact(options?: InitOptions): void
{
    if (!options || options.components == null || typeof options.components != 'object' )
    {
        throw new Error('Components argument missing.');
    }

    const reactRootList = document.querySelectorAll('[data-reactroot]');
    for (let i = 0; i < reactRootList.length; ++i)
    {
        const element = reactRootList[i];
        const comment = element.previousSibling;
        if (comment && comment.nodeType === Node.COMMENT_NODE)
        {
            const commentData: string = (comment as any).data;
            if (commentData.indexOf('react:') == 0)
            {
                const dataStr = commentData.substring(6);
                const data = JSON.parse(dataStr);
                const componentClass = options.components[data.component];
                const props = data.props;
                if (options.globalProps)
                {
                    Object.assign(props, options.globalProps);
                }
                const reactElement = React.createElement(componentClass, props);
                ReactDOM.hydrate(reactElement, element.parentElement);
            }
        }
    }

    const reactInitList = document.querySelectorAll('[data-reactinit]');
    for (let i = 0; i < reactInitList.length; ++i)
    {
        const element = reactInitList[i];
        const componentClass = options.components[element.getAttribute('data-reactinit')];
        const props = JSON.parse(element.getAttribute('data-props'));
        if (options.globalProps)
        {
            Object.assign(props, options.globalProps);
        }
        element.removeAttribute('data-reactinit');
        element.removeAttribute('data-props');
        const reactElement = React.createElement(componentClass, props);
        ReactDOM.hydrate(reactElement, element);
    }
}
