import React from 'react';
import LocalizationClientProvider from './LocalizationClientProvider.client';
import { useShop } from '../../foundation/useShop';
import { useServerRequest } from '../../foundation/ServerRequestProvider';
/**
 * The `LocalizationProvider` component automatically queries the Storefront API's
 * [`localization`](https://shopify.dev/api/storefront/reference/common-objects/queryroot) field
 * for the `isoCode` and `name` of the `country` and keeps this information in a context.
 *
 * Any descendents of this provider can use the `useLocalization` hook.
 */
export function LocalizationProvider(props) {
    const { defaultLanguageCode, defaultCountryCode } = useShop();
    const languageCode = (props.languageCode ?? defaultLanguageCode).toUpperCase();
    const countryCode = (props.countryCode ?? defaultCountryCode).toUpperCase();
    const request = useServerRequest();
    const localization = {
        country: {
            isoCode: countryCode,
        },
        language: {
            isoCode: languageCode,
        },
    };
    request.ctx.localization = localization;
    return (React.createElement(LocalizationClientProvider, { localization: localization }, props.children));
}
