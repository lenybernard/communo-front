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
                    "title": "Authentication needed 🛂",
                    "subtitle": "Of course it's you but there is a procedure",
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
            "meta": {
                "title": {
                    "suffix": "< Communo"
                }
            },
            "modal": {
                "close": "Close"
            },
            "material": {
                "card": {
                    "button": {
                        "label": "See"
                    }
                },
                "index": {
                    "title": "Borrow equipment",
                    "itemsFound": "{{count}} item found",
                    "itemsFound_plural": "{{count}} items found"
                },
                "show": {
                    "booking": {
                        "choosePeriod": {
                            "title" : "Check availability",
                            "startDate": "Start date",
                            "endDate": "End date"
                        },
                        "summary": {
                            "introduction": "Ok, so here is a little summary before validating your request with {{owner.firstname}} :",
                            "price": "It would cost in the end {{price}}€",
                            "periodItem": {
                                "price": "{{price}}€",
                                "range": {
                                    "label": "from {{startDate}} to {{endDate}}",
                                },
                                "singleDay": {
                                    "label": "{{day}}",
                                }
                            },
                            "button": {
                                "validate": "Let's go ?",
                                "validated": "Oh yeah !",
                            }
                        },
                        "validate": {
                            "success": {
                                "title": "OK ! The request has been made",
                                "body": "An email has been sent to {{user.firstname}}, he should contact you shortly.<br/>" +
                                    "If you don't get an answer from him, don't hesitate to give a call or a text message " +
                                    "to remind him/her about your request.",
                            },
                            "error" : "Oups, there seems to be a problem with the reservation. Try again"
                        }
                    },
                    "details": "Details",
                    "features": "Features",
                    "pricing": {
                        "free": {
                            0: "Free 😇",
                            1: "Free 🎁",
                            2: "Free 🤗",
                            3: "Free 😘",
                            4: "Free 🤯",
                            5: "Free ✌️",
                            6: "Free 🎅",
                            7: "Free 💝",
                            8: "Free 🎀",
                            9: "Free 🎉",
                        },
                        "price": "{{amount}}€/{{period}}",
                        "period": {
                            0.5: "halfday",
                            1: "day",
                            2: "week-end",
                            7: "week",
                            31: "month",
                        },
                    },
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
            },
            "switch.language": "Switch to french",
            "user": {
                "card": {
                    "sharedItemsNumber": "{{count}} items",
                    "ratingsNumber": "{{count}} evalutations",
                    "contact": "Contact"
                }
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
            "meta": {
                "title": {
                    "suffix": "< Communo"
                }
            },
            "modal": {
                "close": "Fermer"
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
                    "itemsFound": "{{count}} résultat",
                    "itemsFound_plural": "{{count}} résultats"
                },
                "show": {
                    "booking": {
                        "choosePeriod": {
                            "title" : "Vérifiez la dispo",
                            "startDate": "Début",
                            "endDate": "Fin"
                        },
                        "summary": {
                            "introduction": "Ok, alors voici un petit récapitulatif avant de valider ta demande auprès de {{owner.firstname}} :",
                            "price": "Au total, cela coûterait {{price}}€",
                            "periodItem": {
                                "price": "{{price}}€",
                                "range": {
                                    "label": "du {{startDate}} au {{endDate}}",
                                },
                                "singleDay": {
                                    "label": "le {{day}}",
                                }
                            },
                            "button": {
                                "validate": "C'est parti ?",
                                "validated": "Oh yeah !",
                            }
                        },
                        "validate": {
                            "success": {
                                "title": "Parfait !",
                                "body": "Un mail a été envoyé à {{user.firstname}}, il devrait te recontacter prochainement.<br/>" +
                                    "Si tu n'obtiens pas de réponse de sa part, n'hésite pas à l'appeler ou à lui envoyer un petit SMS" +
                                    "pour le lui notifier ou rappeler ({{user.phoneNumberObject}}).",
                            },
                            "error" : "Oups, il semble y avoir un problème au niveau de la réservation. N'hésite pas à réessayer"
                        }
                    },
                    "details": "Détails",
                    "features": "Fonctionnalités",
                    "pricing": {
                        "free": {
                            0: "Gratuit 😇",
                            1: "Gratuit 🎁",
                            2: "Gratuit pas cher 🤗",
                            3: "Gratuit 😘",
                            4: "Nada! 🤯",
                            5: "Gratuit ✌️",
                            6: "0$ 🎅",
                            7: "Gratuit 💝",
                            8: "Cadeau 🎀",
                            9: "Gratuit 🎉",
                        },
                        "price": "{{amount}}€/{{period}}",
                        "period": {
                            0.5: "demi-journée",
                            1: "jour",
                            2: "week-end",
                            7: "semaine",
                            31: "mois",
                        }
                    },
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
            },
            "user": {
                "card": {
                    "sharedItemsNumber": "{{count}} annonces",
                    "ratingsNumber": "{{count}} évalutations",
                    "contact": "Contacter"
                }
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