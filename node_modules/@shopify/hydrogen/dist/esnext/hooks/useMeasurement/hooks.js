import { useMemo } from 'react';
import { useLocalization } from '../useLocalization/useLocalization';
import { getMeasurementAsParts, getMeasurementAsString } from '../../utilities';
export function useMeasurement(measurement, options = {}) {
    const { locale } = useLocalization();
    return useMemo(() => {
        return {
            localizedString: getMeasurementAsString(measurement, locale, options),
            parts: getMeasurementAsParts(measurement, locale, options),
            original: measurement,
        };
    }, [locale, measurement, options]);
}
