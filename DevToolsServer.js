"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xdl_1 = require("@expo/xdl");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
// @ts-ignore
const graphql = __importStar(require("graphql"));
const express_1 = __importDefault(require("express"));
const freeport_async_1 = __importDefault(require("freeport-async"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const crypto_1 = __importDefault(require("crypto"));
const base64url_1 = __importDefault(require("base64url"));
const AsyncIterableRingBuffer_1 = __importDefault(require("./graphql/AsyncIterableRingBuffer"));
const GraphQLSchema_1 = __importDefault(require("./graphql/GraphQLSchema"));
const createContext_1 = __importStar(require("./graphql/createContext"));
const Issues_1 = __importDefault(require("./graphql/Issues"));
const serverStartTimeUTCString = new Date().toUTCString();
function setHeaders(res) {
    // Set the Last-Modified header to server start time because otherwise it
    // becomes Sat, 26 Oct 1985 08:15:00 GMT for files installed from npm.
    res.setHeader('Last-Modified', serverStartTimeUTCString);
}
function generateSecureRandomTokenAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            crypto_1.default.randomBytes(32, (error, buffer) => {
                if (error)
                    reject(error);
                else
                    resolve(base64url_1.default.fromBase64(buffer.toString('base64')));
            });
        });
    });
}
function createAuthenticationContextAsync({ port }) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientAuthenticationToken = yield generateSecureRandomTokenAsync();
        const endpointUrlToken = yield generateSecureRandomTokenAsync();
        const graphQLEndpointPath = `/${endpointUrlToken}/graphql`;
        const hostname = `${devtoolsGraphQLHost()}:${port}`;
        const webSocketGraphQLUrl = `ws://${hostname}${graphQLEndpointPath}`;
        const allowedOrigin = `http://${hostname}`;
        return {
            clientAuthenticationToken,
            graphQLEndpointPath,
            webSocketGraphQLUrl,
            allowedOrigin,
            requestHandler: (request, response) => {
                response.json({ webSocketGraphQLUrl, clientAuthenticationToken });
            },
        };
    });
}
exports.createAuthenticationContextAsync = createAuthenticationContextAsync;
function startAsync(projectDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const port = yield freeport_async_1.default(19002, { hostnames: [null, 'localhost'] });
        const server = express_1.default();
        const authenticationContext = yield createAuthenticationContextAsync({ port });
        server.get('/dev-tools-info', authenticationContext.requestHandler);
        server.use('/_next', express_1.default.static(path_1.default.join(__dirname, '../client/_next'), {
            // All paths in the _next folder include hashes, so they can be cached more aggressively.
            immutable: true,
            maxAge: '1y',
            setHeaders,
        }));
        server.use(express_1.default.static(path_1.default.join(__dirname, '../client'), { setHeaders }));
        const listenHostname = devtoolsHost();
        const httpServer = http_1.default.createServer(server);
        yield new Promise((resolve, reject) => {
            httpServer.once('error', reject);
            httpServer.once('listening', resolve);
            httpServer.listen(port, listenHostname);
        });
        startGraphQLServer(projectDir, httpServer, authenticationContext);
        yield xdl_1.ProjectSettings.setPackagerInfoAsync(projectDir, { devToolsPort: port });
        return `http://${listenHostname}:${port}`;
    });
}
exports.startAsync = startAsync;
function startGraphQLServer(projectDir, httpServer, authenticationContext) {
    const layout = createLayout();
    const issues = new Issues_1.default();
    const messageBuffer = createMessageBuffer(projectDir, issues);
    subscriptions_transport_ws_1.SubscriptionServer.create({
        schema: GraphQLSchema_1.default,
        execute: graphql.execute,
        subscribe: graphql.subscribe,
        onOperation: (operation, params) => (Object.assign(Object.assign({}, params), { context: createContext_1.default({
                projectDir,
                messageBuffer,
                layout,
                issues,
            }) })),
        onConnect: connectionParams => {
            if (!connectionParams.clientAuthenticationToken ||
                connectionParams.clientAuthenticationToken !==
                    authenticationContext.clientAuthenticationToken) {
                throw new Error('Dev Tools API authentication failed.');
            }
            return true;
        },
    }, {
        server: httpServer,
        path: authenticationContext.graphQLEndpointPath,
        verifyClient: info => {
            return info.origin === authenticationContext.allowedOrigin;
        },
    });
}
exports.startGraphQLServer = startGraphQLServer;
function devtoolsHost() {
    if (process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS) {
        return process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS.trim();
    }
    return 'localhost';
}
function devtoolsGraphQLHost() {
    if (process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS && process.env.REACT_NATIVE_PACKAGER_HOSTNAME) {
        return process.env.REACT_NATIVE_PACKAGER_HOSTNAME.trim();
    }
    else if (process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS) {
        return process.env.EXPO_DEVTOOLS_LISTEN_ADDRESS;
    }
    return 'localhost';
}
function createLayout() {
    let layout = {
        selected: null,
        sources: null,
        sourceLastReads: {},
    };
    return {
        get() {
            return layout;
        },
        set(newLayout) {
            layout = Object.assign(Object.assign({}, layout), newLayout);
        },
        setLastRead(sourceId, lastReadCursor) {
            layout.sourceLastReads[sourceId] = lastReadCursor;
        },
    };
}
function createMessageBuffer(projectRoot, issues) {
    const buffer = new AsyncIterableRingBuffer_1.default(10000);
    // eslint-disable-next-line no-new
    new xdl_1.PackagerLogsStream({
        projectRoot,
        updateLogs: updater => {
            const chunks = updater([]);
            chunks.forEach(chunk => {
                if (chunk.issueId) {
                    if (chunk.issueCleared) {
                        issues.clearIssue(chunk.issueId);
                    }
                    else {
                        issues.addIssue(chunk.issueId, chunk);
                    }
                    return;
                }
                buffer.push({
                    type: 'ADDED',
                    sourceId: createContext_1.PROCESS_SOURCE.id,
                    node: chunk,
                });
            });
        },
        onStartBuildBundle: chunk => {
            buffer.push({
                type: 'ADDED',
                sourceId: createContext_1.PROCESS_SOURCE.id,
                node: Object.assign(Object.assign({}, chunk), { progress: 0, duration: 0 }),
            });
        },
        onProgressBuildBundle: (percentage, start, chunk) => {
            buffer.push({
                type: 'UPDATED',
                sourceId: createContext_1.PROCESS_SOURCE.id,
                node: Object.assign(Object.assign({}, chunk), { progress: percentage, 
                    // @ts-ignore
                    duration: new Date() - (start || new Date()) }),
            });
        },
        onFinishBuildBundle: (error, start, end, chunk) => {
            buffer.push({
                type: 'UPDATED',
                sourceId: createContext_1.PROCESS_SOURCE.id,
                node: Object.assign(Object.assign({}, chunk), { error, 
                    // @ts-ignore
                    duration: end - (start || new Date()) }),
            });
        },
    });
    // needed for validation logging to function
    xdl_1.ProjectUtils.attachLoggerStream(projectRoot, {
        stream: {
            write: chunk => {
                if (chunk.tag === 'device') {
                    buffer.push({
                        type: 'ADDED',
                        sourceId: chunk.deviceId,
                        node: chunk,
                    });
                }
            },
        },
        type: 'raw',
    });
    xdl_1.Logger.global.addStream({
        stream: {
            write: chunk => {
                buffer.push({
                    type: 'ADDED',
                    sourceId: createContext_1.PROCESS_SOURCE.id,
                    node: chunk,
                });
            },
        },
        type: 'raw',
    });
    return buffer;
}
//# sourceMappingURL=DevToolsServer.js.map