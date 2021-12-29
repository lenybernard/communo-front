import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: {
            "menu": {
                "home": "Home",
                "material": "Equipment",
                "service": "Service",
            },
            "switch.language": "Switch to french",
            "materials": {
                "index": {
                    "title": "Borrow equipment",
                    "item": {
                        "button": {
                            "label": "See"
                        }
                    }
                },
                "show": {
                    "details": "Details",
                    "features": "Features",
                    "button": {
                        "label": "Borrow this equipment to {{firstname}}"
                    },
                    "modal": {
                        "title": "Borrow this equipment to {{firstname}}",
                        "body": "<>" +
                            "The platform does not yet integrate an online reservation module.<br/>Contact simply {{firstname}} on : {{email}}." +
                            "</>",
                    }
                },
            }
        }
    },
    fr: {
        translation: {
            "menu": {
                "home": "Accueil",
                "material": "Matériel",
                "service": "Service",
            },
            "switch.language": "Passer en anglais",
            "material": {
                "card": {
                    "button": {
                        "label": "Voir"
                    }
                },
                "index": {
                    "title": "Emprunter du matériel",
                },
                "show": {
                    "details": "Détails",
                    "features": "Fonctionnalités",
                    "button": {
                        "label": "Emprunter ce matériel à {{firstname}}"
                    },
                    "modal": {
                        "title": "Emprunter ce matériel à {{firstname}}",
                        "body": `
Ça va venir mais hélas, la plateforme n'intègre pas encore de module de réservation en ligne.\\
Mais n'hésitez pas à contacter simplement **{{firstname}}** par email : {{email}} en l'appelant ou en lui envoyant un petit SMS.`,
                    }
                },
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage

        interpolation: {
            escapeValue: false // react already safes from xss
        },
    });

export default i18n;