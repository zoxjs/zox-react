import * as React from "react";
import {PageController} from "zox/lib/Controller";
import {Route} from "zox/lib/Plugins/PluginManagers/RoutePluginManager";
import {PureRenderableList} from "zox/lib/Renderable/Content/PureRenderableList";
import {ReactRenderable} from "../../ReactRenderable";
import {MyComponent} from "../MyComponent";
import {MyFuncComponent} from "../MyFuncComponent";

@Route({
    route: '/'
})
export class Home extends PageController
{
    page(request)
    {
        const classRenderable = this.container.create(
            ReactRenderable,
            <MyComponent text='My Component' />
        );

        const functionalRenderable = this.container.create(
            ReactRenderable,
            <MyFuncComponent text='My Func Component' />
        );

        const list = new PureRenderableList([classRenderable, functionalRenderable]);
        list.type = 'page';
        return list;
    }
}
