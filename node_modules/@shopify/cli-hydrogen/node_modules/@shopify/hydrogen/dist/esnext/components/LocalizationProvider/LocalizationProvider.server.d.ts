import { ReactNode } from 'react';
export interface LocalizationProviderProps {
    /** A `ReactNode` element. */
    children: ReactNode;
    /**
     * Override the `isoCode` to define the active country
     */
    countryCode?: string;
    /**
     * Override the `languageCode` to define the active language
     */
    languageCode?: string;
}
/**
 * The `LocalizationProvider` component automatically queries the Storefront API's
 * [`localization`](https://shopify.dev/api/storefront/reference/common-objects/queryroot) field
 * for the `isoCode` and `name` of the `country` and keeps this information in a context.
 *
 * Any descendents of this provider can use the `useLocalization` hook.
 */
export declare function LocalizationProvider(props: LocalizationProviderProps): JSX.Element;
