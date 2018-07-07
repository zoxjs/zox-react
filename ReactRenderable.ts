import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import {$metadata, IRenderable} from "zox/lib/Renderable/Renderable";
import {Dependency} from "zox/lib/ServiceContainer";
import {IConfigService} from "zox/lib/Services/ConfigService";

export type ReactRenderMethod = 'comment' | 'wrap'

export class ReactRenderable implements IRenderable
{
    [$metadata] = {
        libraries: ['react']
    };

    @Dependency
    protected config: IConfigService;

    public type: string = 'react';
    private readonly reactElement: React.ReactElement<any>;
    private readonly method: ReactRenderMethod;

    constructor(reactElement: React.ReactElement<any>, method?: ReactRenderMethod)
    {
        this.reactElement = reactElement;
        this.method = method;
    }

    public toString()
    {
        let name;
        let result;
        if (typeof this.reactElement.type === 'string')
        {
            name = this.reactElement.type;
            result = ReactDOMServer.renderToString(this.reactElement);
        }
        else
        {
            name = this.reactElement.type.name;
            result = ReactDOMServer.renderToString(this.reactElement);
            if (this.method === 'comment')
            {
                const reactInit = JSON.stringify({component: name, props: this.reactElement.props});
                result = `<!--react:${reactInit}-->${result}`;
                // this result must be the only child in the wrapping element
            }
            else
            {
                const props = JSON.stringify(this.reactElement.props);
                result = `<div data-reactinit="${name}" data-props='${props}'>${result}</div>`;
            }
        }
        if (this.config.getGlobalConfig().debug)
        {
            result = `<!-- OUTPUT REACT: ${name} -->${result}<!-- END REACT: ${name} -->`;
        }
        return result;
    }
}
