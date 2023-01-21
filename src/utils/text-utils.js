export const caseInsensitiveRegex = value => new RegExp(`${value}`, 'i');

export const escapeRegexCharacters = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
