import i18n, {Resource} from "i18next";
import { initReactI18next } from "react-i18next";
import {en} from "./locales/en";

const resources = {
    en
} as const;

type Translation = typeof resources["en"]

function buildResources(record: Record<string, Translation>) {
    const resources: Resource = {};
    Object.entries(record).forEach(([key, value]) => {
        resources[key] = {
            translation: value,
        };
    });
    return resources;
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        compatibilityJSON: 'v4',
        resources: buildResources(resources),
        lng: "en",
        fallbackLng: 'en',
        supportedLngs: ['en'],
        interpolation: {
            escapeValue: false
        }
    });

export {i18n};