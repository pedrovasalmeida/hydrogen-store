import { log } from '../../../../utilities/log';
export const PerformanceMetricsServerAnalyticsConnector = {
    request() {
        log.warn('PerformanceMetricsServerAnalyticsConnector has been removed - please remove its reference from hydrogen.config.js');
        return Promise.resolve();
    },
};
