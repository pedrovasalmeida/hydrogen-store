import { useMemo } from 'react';
import { LocalizationContext, } from '../../components/LocalizationProvider/LocalizationContext.client';
import { useEnvContext } from '../../foundation/ssr-interop';
export function useLocalization() {
    const localization = useEnvContext((req) => req.ctx.localization, LocalizationContext);
    if (localization == null) {
        throw new Error('No Localization Context available');
    }
    const localizationValue = useMemo(() => ({
        ...localization,
        locale: localization.language.isoCode + '-' + localization.country.isoCode,
    }), [localization]);
    return localizationValue;
}
