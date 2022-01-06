import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: {
            "home": {
                "hero1": {
                    "line1": "What if we stop",
                    "line2": "thinking solo ?",
                    "description": "Our homes are overflowing with stuff we don't use and yet we keep buying more and more. We all have treasures to offer the world to transform it and do our part in changing society.",
                    "getStarted": "Get started",
                    "learnMore": "How it works ?",
                },
                "hero": {
                    "line1": "All thanks to",
                    "line2": "our good heart",
                    "description": "Dare asking, dare proposing and opening up to the community, you have so much to get.",
                    "getStarted": "Let's Go",
                    "buttonIncentive": "Small click = big change",
                    "who": "Who's behind this ?",
                }
            },
            "login": {
                "title": "Signin",
                "subtitle": "to use the service !",
                "form": {
                    "email": {
                        "label": "Email",
                        "placeholder": "john@community.com",
                        "error": "Email is not valid, please check it. ",
                    },
                    "password": {
                        "label": "Password",
                    },
                    "button": "Let's connect",
                },
                "forgotPassword": "Forgot password ?",
                "toast": {
                    "success" : "C'est bon de te revoir {{firstname}}"
                }
            },
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
                            "The platform does not yet integrate an online reservation module.<br/>Contact simply {{firstname}} " +
                            "on {{email}} or give him a call or a text message {{phoneNumber}}." +
                            "</>",
                    }
                },
            }
        }
    },
    fr: {
        translation: {
            "home": {
                "hero1": {
                    "line1": "Et si on arrêtait de",
                    "line2": "penser solo ?",
                    "description": "Nos maisons débordent de trucs dont on ne se sert pas et pourtant, on continue d'en acheter " +
                        "toujours plus. On a toutes et tous des trésors à offrir au monde pour le transformer et faire notre " +
                        "part dans le changement de la société.",
                    "getStarted": "Commencer",
                    "learnMore": "En savoir plus",
                },
                "hero": {
                    "line1": "Et tout ça, grâce à",
                    "line2": "notre bon cœur",
                    "description": "Osez demander, osez proposer et vous ouvrir à la communauté, vous avez tout à y gagner.",
                    "getStarted": "C'est parti",
                    "buttonIncentive": "Petit clic = grand changement",
                    "who": "Qui est derrière cette plateforme ?",
                }
            },
            "login": {
                "title": "Enfin de retour !",
                "subtitle": "Tu nous a manqué ✌",
                "form": {
                    "email": {
                        "label": "Email",
                        "placeholder": "jean@collectif.fr",
                        "error": "L'email n'est pas valide, merci de le vérifier.",
                    },
                    "password": {
                        "label": "Mot de passe",
                    },
                    "button": "Me connecter",
                },
                "forgotPassword": "Mot de passe oublié ?",
                "toast": {
                    "success" : {
                        0: "Bienvenue à la maison camarade",
                        1: "Enfin, te revoilà {{firstname}} !",
                        2: "Bonjour {{firstname}}",
                        3: "C'est bon de te revoir {{firstname}}",
                    },
                    "error" : {
                        0: "Non, ça ne fonctionne pas.",
                        1: "Aïe. Un problème de mot de passe ?",
                        2: "Ça ne passe pas...",
                        3: "N'hésitez pas à réinitialiser votre mot de passe",
                        4: "C'est vrai que c'est ennuyeux ces histoires de mot de passe...",
                    },
                }
            },
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
                        "title": "Plus qu'un tout petit mail vous sépare",
                        "body": `
Ça va venir mais hélas, la plateforme n'intègre pas encore de module de réservation en ligne.\\
Mais n'hésite pas à contacter simplement **{{firstname}}** par email **{{email}}** ou en lui passant un coup de fil ou SMS au {{phoneNumber}}.`,
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