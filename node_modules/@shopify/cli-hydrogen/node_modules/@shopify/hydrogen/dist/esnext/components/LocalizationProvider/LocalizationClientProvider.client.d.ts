import { ReactNode } from 'react';
import { LocalizationContextValue } from './LocalizationContext.client';
export default function LocalizationClientProvider({ localization, children, }: {
    children: ReactNode;
    localization: LocalizationContextValue;
}): JSX.Element;
