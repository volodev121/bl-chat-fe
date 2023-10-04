import { MessageType } from './types.tsx';

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
        title: 'Question',
        content: "test123",
        role: 'user',
        element: null,
        completed: true,
        default: true,
      },
      {
        key: 'someRandomUniqString2',
        title: 'Introduction',
        content: "Hey there, I'm Mavens Chatbot, I'm here to answer your questions and find the best suitable CRM for you! I prepared 4 questions for you to answer after which I can suggest you the best CRM.",
        role: 'bot',
        element: null,
        completed: true,
        default: false,
      },
      {
        key: 'someRandomUniqString3',
        title: 'Question4',
        content: "test test",
        role: 'bot',
        completed: true,
        default: false,
        element: {
            type: "radiogroup",
            choices: [
              {
                text: "Yes",
                value: "yes",
              },
              {
                text: "No",
                value: "no",
              },
            ],
          },
      },
]