"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
const react_1 = __importStar(require("react"));
const basePath = ((_a = document.head.querySelector('base')) === null || _a === void 0 ? void 0 : _a.getAttribute('href')) || '';
const Logs = ({ queueName, jobId, }) => {
    const [state, setState] = react_1.useState([]);
    react_1.useEffect(() => {
        fetch(`${basePath}/api/queues/${encodeURIComponent(queueName)}/${jobId}/logs`)
            .then((res) => res.json())
            .then((logs) => setState(logs));
    }, [jobId]);
    return (react_1.default.createElement("ul", null, state.map((line, i) => (react_1.default.createElement("li", { key: i },
        react_1.default.createElement("pre", null, line))))));
};
exports.Logs = Logs;
//# sourceMappingURL=Logs.js.map