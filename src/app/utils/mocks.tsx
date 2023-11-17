import { MessageType, ApiClient } from './types.tsx';

export const mockApiClient: ApiClient = {
  chat: async function() {
    return { role: 'bot', type: 'escalateToHuman', content: "I am very sorry, something had to be gone wrong on my end. Shall I try and connect you to a human?", raw: {} }
  },
  updateHistory: async function() {},
  sendRating: async function() {},
}

export const mockMessagesList: Array<MessageType> = [
    {
      key: 'someRandomUniqString1',
      title: 'Introduction',
      content: "Hey there, I'm Mavens Chatbot, I'm here to answer your questions and find the best suitable CRM for you! I prepared 4 questions for you to answer after which I can suggest you the best CRM.",
      role: 'bot',
      element: null,
      completed: true,
      default: true,
    },
    {
        key: 'someRandomUniqString2',
        title: 'Answer',
        content: "Great, let's get started! Yes",
        role: 'user',
        element: null,
        completed: true,
        default: true,
      },
  
]

export const mockConfig: Config = {
  "question_timeline": {
      "logoPosition": "right",
      "elements": [],
  },
  "cta_button_prompt": "Let’s find a CRM?",
  "widget_headline": "Are you looking for a CRM?",
  "colors": {
      "heading_background_color": "#000000",
      "heading_font_color": "#FFFFFF",
      "cta_color": "#D02DF5",
      "cta_font_color": "#FFFFFF",
      "body_color": "#FFFFFF",
      "font_color": "#000000"
  },
  "terms_of_service_link": "",
  "logo_url": "",
  "icon_url": "",
}
