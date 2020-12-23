"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = void 0;
const getLogs = async (req, res) => {
    try {
        const { queueName, id } = req.params;
        const { bullBoardQueues } = req.app.locals;
        const { queue } = bullBoardQueues[queueName];
        if (!queue) {
            return res.status(404).send({ error: 'queue not found' });
        }
        const logs = await queue.getLogs(id);
        return res.send(logs);
    }
    catch (e) {
        const body = {
            error: 'queue error',
            details: e.stack,
        };
        return res.status(500).send(body);
    }
};
exports.getLogs = getLogs;
//# sourceMappingURL=getLogs.js.map