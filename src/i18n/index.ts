import type { Locale } from './config';
import en, { type Dictionary, type Rich } from './dictionaries/en';
import id from './dictionaries/id';

const dictionaries: Record<Locale, Dictionary> = { en, id };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

export type { Dictionary, Rich };
