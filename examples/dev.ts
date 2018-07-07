import {bootstrap, startServer} from "zox";

bootstrap({
    config: {
        defaultsPath: 'examples/config',
    },
    scanner: pd => pd.scanDirectory('examples/Plugins'),
}).then(container =>
{
    startServer(container);
    console.log('Started at localhost:8080');
});
