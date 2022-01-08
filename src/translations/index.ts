import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
    en: {
        translation: {
            "home": {
                "hero1": {
                    "line1": "What if we stopped",
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
                    "buttonIncentive": "Small click = big shift",
                    "how": "How it works ?",
                }
            },
            "layout": {

                "footer": {
                    "license": "This project is open source",
                    "librariesCredit": {
                        1: "developped with passion with awesome libraries like ",
                        2: "with respect for personal data (no cookies) and in an eco-design and accessibility approach  🌱",
                    },
                    "newsletter": {
                        "title": "Newsletter",
                        "placeholder": "Your email",
                        "subscribe": "Subscribe"
                    }
                },
                "head": {
                    "cta": {
                        "label": "Get in"
                    }
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
                    "success" : {
                        0: "🦄 Welcome home comrade",
                        1: "🤗 Finally, you are back {{user.firstname}} !",
                        2: "👋 Hello {{user.firstname}}",
                        3: "😀 It's good to see you again {{user.firstname}}",
                    },
                    "error" : {
                        0: "👮‍♀️{{error}} No it doesn't work",
                        1: "😓 {{error}} Ouch. A password issue ?",
                        2: "🥴 {{error}} It does not go through...",
                        3: "☝️{{error}} Please reset your password",
                        4: "🤷 {{error}} What boring are these password stories...",
                    }
                },
                "authentication.needed": {
                    "title": "Authentication needed to access {{from}}",
                    "subtitle": "Of course it's you but there is a procedure  🛂",
                }
            },
            "logout": {
                "title": "Logout",
                "toast": "Good bye !"
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
                        "label": "Borrow this equipment to {{user.firstname}}"
                    },
                    "modal": {
                        "title": "Borrow this equipment to {{user.firstname}}",
                        "body": "<>" +
                            "The platform does not yet integrate an online reservation module.<br/>Contact simply {{user.firstname}} " +
                            "on {{user.email}} or give him a call or a text message {{user.phoneNumber}}." +
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
                    "buttonIncentive": "Petit clic = grand déclic",
                    "how": "Comment ça marche ?",
                }
            },
            "layout": {
                "footer": {
                    "license": "Projet disponible librement (open source)",
                    "librariesCredit": {
                        1: "développé avec passion avec des technologies incroyables comme ",
                        2: "et dans le respect des données personnelles (aucun cookie) et dans une démarche d'éco-conception et d'accessibilité 🌱",
                    },
                    "newsletter": {
                        "title": "Newsletter",
                        "placeholder": "Ton email",
                        "subscribe": "S'abonner"
                    }
                },
                "head": {
                    "cta": {
                        "label": "Participer"
                    }
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
                        0: "🦄 Bienvenue à la maison camarade",
                        1: "🤗 Enfin, te revoilà {{user.firstname}} !",
                        2: "👋 Bonjour {{user.firstname}}",
                        3: "😀 C'est bon de te revoir {{user.firstname}}",
                    },
                    "error" : {
                        0: "👮‍♀️{{error}} Non, ça ne fonctionne pas",
                        1: "😓 {{error}} Aïe. Un problème de mot de passe ?",
                        2: "🥴 {{error}} Ça ne passe pas...",
                        3: "☝️{{error}} N'hésite pas à réinitialiser ton mot de passe",
                        4: "🤷 {{error}} C'est vrai que c'est ennuyeux ces histoires de mot de passe...",
                    }
                },
                "authentication.needed": {
                    "title": "Identification requise 🛂",
                    "subtitle": "Bien sûr c'est toi, on le sait, c'est une simple procédure",
                }
            },
            "logout": {
                "title": "Déconnexion",
                "toast": "😿 À bientôt !"
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
                        "label": "Emprunter ce matériel à {{user.firstname}}"
                    },
                    "modal": {
                        "title": "Plus qu'un tout petit mail vous sépare",
                        "body": `
Ça va venir mais hélas, la plateforme n'intègre pas encore de module de réservation en ligne.\\
Mais n'hésite pas à contacter simplement **{{user.firstname}}** par email **{{user.email}}** ou en lui passant un coup de fil ou SMS au {{user.phoneNumber}}.`,
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