import React from 'react';
import { Head } from '../../foundation/Head';
export function DescriptionSeo({ description, }) {
    if (!description) {
        return null;
    }
    return (React.createElement(Head, null,
        React.createElement("meta", { name: "description", content: description }),
        React.createElement("meta", { property: "og:description", content: description })));
}
