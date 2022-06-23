import React from 'react';
import { useLocalization } from '../../hooks/useLocalization/useLocalization';
import { Head } from '../../foundation/Head/Head.client';
export function NoIndexPageSeo({ title, titleTemplate, lang, }) {
    const { language: { isoCode: fallBacklang }, } = useLocalization();
    return (React.createElement(React.Fragment, null,
        React.createElement(Head, { defaultTitle: title ?? '', titleTemplate: titleTemplate ?? `%s - ${title}` },
            React.createElement("html", { lang: lang ?? fallBacklang }),
            React.createElement("meta", { name: "robots", content: "noindex" }))));
}
