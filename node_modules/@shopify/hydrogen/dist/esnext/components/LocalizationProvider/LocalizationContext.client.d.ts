export interface LocalizationContextValue {
    country: {
        isoCode: string;
    };
    language: {
        isoCode: string;
    };
}
export declare const LocalizationContext: import("react").Context<LocalizationContextValue | null>;
