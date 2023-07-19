const express = require("express");
const body_parser = require("body-parser");
// const axios = require("axios");
var path = require('path');
const axios = require('axios').default;
require('dotenv').config();
const app = express().use(body_parser.json());
// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;//deepesh

app.listen(process.env.PORT || 5000, () => {
    console.log(`webhook is lisning on port - ${token} - mytoken -${mytoken} `);
});

//to verify the callback url from dashboard side - cloud api side
app.get("/webhook", (req, res) => {
    let mode = req.query["hub.mode"];
    let challange = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];


    if (mode && token) {
        if (mode === "subscribe" && token === mytoken) {
            res.status(200).send(challange);
        } else {
            res.status(403);
        }
    }
});



let msg_id = ""
let conversation_Id = ""
app.post("/webhook", async (req, res) => {
    let body_param = req.body;
    if (body_param.object) {
        if (body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]
        ) {
            let phon_no_id = body_param.entry[0]?.changes[0]?.value?.metadata?.phone_number_id || 108796628660262;
            let from = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.from || 917582873793;
            let msg_body = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.text?.body || "Message By vercel";
            let button_Object = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.button || {};
            msg_id = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id || "Message id not available";
            let reply_button = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.interactive?.action?.button || "title not found"

            // location 
            // let latitude = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.latitude;
            // let longitude = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.longitude;
            // let name = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.name;
            // let address = body_param?.entry[0]?.changes[0]?.value?.messages[0]?.location?.address;

            // statuses
            let status = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status"
            // let status = body_param?.entry[0]?.changes[0]?.value?.statuses ?  body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status"
            // let status = body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status || "not Show any status";
            // let statuses = body_param?.entry[0]?.changes[0]?.statuses[0]|| "not Show any status";
            // let timestamp = body_param?.entry[0]?.statuses[0]?.timestamp || "not Show any timestamp";
            // let expiration_timestamp = body_param?.entry[0]?.statuses[0]?.conversation?.expiration_timestamp || "not Show any expiration_timestamp";
            // let conversation_id = body_param?.entry[0]?.statuses[0]?.conversation?.id || "not Show any conversation_id";
            // let pricing_model = body_param?.entry[0]?.statuses[0]?.pricing?.pricing_model || "not Show any pricing_model";

            let Data_Object

            if (msg_body.toLowerCase() === 'image') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: from,
                    type: "image",
                    image: {
                        link: "https://wallpapers.com/images/featured/2ygv7ssy2k0lxlzu.jpg"
                    }
                }
            } else if (msg_body.toLowerCase() === 'video') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: ` Please visit https://www.youtube.com/watch?v=HY7Px7wWfq4 to inspire your day!`
                    }
                }
            } else if (msg_body.toLowerCase() === 'media') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: ` Please visit https://www.youtube.com/watch?v=HY7Px7wWfq4 to inspire your day!`
                    }
                }
            }
            else if (msg_body.toLowerCase() === 'hello' || msg_body.toLowerCase() === 'hi' || msg_body.toLowerCase() === 'hy') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "welcome_msg",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            "link": "https://media.licdn.com/dms/image/C4D16AQFlb7VmoEy1gg/profile-displaybackgroundimage-shrink_200_800/0/1661438973047?e=2147483647&v=beta&t=dZooszqTCUpEbO58msi2xfKyYrPFm9s_6UZmLANZh0A"
                                        }
                                    }
                                ]
                            },
                            {
                                type: "button",
                                sub_type: "quick_reply",
                                index: "0",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft"
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "quick_reply",
                                index: "1",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft2"
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "quick_reply",
                                index: "2",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft3"
                                    }
                                ]
                            }
                        ]
                    }
                }
            } else if (button_Object.text === 'Web Design') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "web_design_msg",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://miro.medium.com/v2/resize:fit:915/0*4DpFVUP_VfkhzSIL"
                                        }
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "Url",
                                index: 1,
                                parameters: [
                                    {
                                        type: "text",
                                        text: "/"
                                    }
                                ]
                            }
                        ]
                    }
                }
            } else if (button_Object.text === 'Front End Development') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "front_end_development",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20201111215809/How-to-Become-a-Front-End-Developer-in-2020.png"
                                        }
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "Url",
                                index: 1,
                                parameters: [
                                    {
                                        type: "text",
                                        text: "/"
                                    }
                                ]
                            }
                        ]
                    }
                }
            } else if (button_Object.text === 'web Development') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "web_development",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://www.creativeitinstitute.com/images/course/course_1663052056.jpg"
                                        }
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "Url",
                                index: 1,
                                parameters: [
                                    {
                                        type: "text",
                                        text: "/"
                                    }
                                ]
                            }
                        ]
                    }
                }

                // setTimeout(() => {
                    Sec_Objects = {
                        messaging_product: "whatsapp",
                        to: from,
                        type: "template",
                        template: {
                            name: "goto_next_msg",
                            language: {
                                code: "en_us"
                            },
                            components: [
                                {
                                    type: "button",
                                    sub_type: "quick_reply",
                                    index: "0",
                                    parameters: [
                                        {
                                            type: "payload",
                                            payload: "Welcome"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                    axios.post(`https://graph.facebook.com/v16.0/${phon_no_id}/messages?access_token=${token}`, Sec_Objects)
                        .then(function (response) {
                            conversation_Id = response?.data?.messages[0].id
                            // body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id
                            res.sendStatus(200);
                        })
                        .catch(function (error) {
                            console.log("error **", error);
                            res.sendStatus(404);
                        })
                // }, 3000);

            } else if (button_Object.text === 'Next') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "welcome_msg_1",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://miro.medium.com/v2/resize:fit:915/0*4DpFVUP_VfkhzSIL"
                                        }
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "quick_reply",
                                index: "0",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft"
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "quick_reply",
                                index: "1",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft2"
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "quick_reply",
                                index: "2",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft3"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }else if (button_Object.text === 'Digital Marketing') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "digitel_marketing",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://s40424.pcdn.co/in/wp-content/uploads/2023/03/How-to-Learn-Digital-Marketing.jpg.optimal.jpg"
                                        }
                                    }
                                ]
                            }, {
                                type: "button",
                                sub_type: "Url",
                                index: 1,
                                parameters: [
                                    {
                                        type: "text",
                                        text: "/"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }else if (button_Object.text === 'Salesforce Analytics') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "salesforce_analytics",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://assets-global.website-files.com/63483ad423421bd16e7a7ae7/639c39cce38a6d6f95814e1c_einstein-header.png"
                                        }
                                    }
                                ]
                            },{
                                type: "button",
                                sub_type: "quick_reply",
                                index: "0",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft"
                                    }
                                ]
                            },{
                                type: "button",
                                sub_type: "quick_reply",
                                index: "1",
                                parameters: [
                                    {
                                        type: "payload",
                                        payload: "Aurasoft2"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }else if (button_Object.text === 'Mobile App Development') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "mobile_app_development",
                        language: {
                            code: "en_us"
                        },
                        components: [
                            {
                                type: "header",
                                parameters: [
                                    {
                                        type: "image",
                                        image: {
                                            link: "https://assets-global.website-files.com/6410ebf8e483b5bb2c86eb27/6410ebf8e483b5758186fbd8_ABM%20college%20mobile%20app%20dev%20main.jpg"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
            else if (msg_body.toLowerCase() === 'english') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    // text: {
                    //     body: `Welcome To Aurasoft Can I Help You --> Type your preferred Object Ex:-Welcome,English_spoken_pdf,MERN_INFO_LIST,Aurasoft_Review,media,video,image`
                    // },
                    type: "interactive",
                    interactive: {
                        type: "button",
                        body: {
                            text: `Welcome To Aurasoft Can I Help You --> Type your preferred Object Ex:-`
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-123",
                                        title: "Welcome"
                                    }
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-124",
                                        title: "English_spoken_pdf"
                                    }
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "unique-id-125",
                                        title: "MERN_INFO_LIST"
                                    }
                                },
                            ]
                        }
                    }
                }
            } else if (msg_body.toLowerCase() === 'hindi') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `ऑरासॉफ्ट में आपका स्वागत है क्या मैं आपकी मदद कर सकता हूँ `
                    },
                }
            } else if (msg_body.toLowerCase() === 'welcome') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "template",
                    template: {
                        name: "wellcome_msg",
                        language:
                        {
                            code: "en_US"
                        }
                    }
                }
            } else if (msg_body.toLowerCase() === 'english_spoken_pdf') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    type: "document",
                    document: {
                        link: "https://www.englishwale.com/wp-content/uploads/2018/08/Spoken-English-Guru-eBook.pdf",
                        caption: "English Spoken"
                    }
                }
            }
            else if (button_Object.text === 'I will join latters') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `Wellcome i will join Aurasoft`
                    },
                }
            }
            else if (button_Object.text === 'Wants to connect') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `Wellcome i will connect aurasoft `
                    },
                }
            } else if (button_Object.text === 'Stop promotions') {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `Wellcome i will Stop Promotion Aurasoft`
                    },
                }
            }
            //  else if (Object.keys(button_Object).length > 0) {
            //     console.log("hello button")
            //     Data_Object = {
            //         messaging_product: "whatsapp",
            //         to: from,
            //         text: {
            //             body: `Hi.. you have selected, your payload is  ${button_Object.payload} , Hi.. you have selected, your text is  ${button_Object.text} `
            //         }
            //     }
            // }
            else {
                Data_Object = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: `Hi.. I This is Aurasoft, your message is  ${msg_body}`
                    }
                }
            }

            // else if (location && latitude && longitude && name && address) {
            //   Data_Object = {
            //       messaging_product: "whatsapp",
            //       to: from,
            //       type: "location",
            //       location: {
            //           latitude:45.008,
            //           longitude:12.009,
            //           name: indore,
            //           address: indore
            //       }
            //   }
            // }

            console.log("Data_Object", Data_Object);
            axios.post(`https://graph.facebook.com/v16.0/${phon_no_id}/messages?access_token=${token}`, Data_Object)
                .then(function (response) {
                    conversation_Id = response?.data?.messages[0].id
                    // body_param?.entry[0]?.changes[0]?.value?.messages[0]?.id
                    res.sendStatus(200);
                })
                .catch(function (error) {
                    console.log("error **", error);
                    res.sendStatus(404);
                });

        } else {
            res.sendStatus(404);

            // statuses
            let phon_no_id = body_param.entry[0]?.changes[0]?.value?.metadata?.phone_number_id || 108796628660262;
            let status = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.status : "not Show any status";
            let statusId = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.id : "not ID";
            let conversationId = body_param?.entry[0]?.changes[0]?.value?.statuses ? body_param?.entry[0]?.changes[0]?.value?.statuses[0]?.conversation?.id : "not conversation ID";

            if (conversation_Id && statusId && statusId === conversation_Id) {
                console.log("boat send message status **", status);
            }

        }
    }
});

app.get("/", (req, res) => {
    res.status(200).send("hello this is webhook setup");
})
