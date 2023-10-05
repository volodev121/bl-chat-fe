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
        title: 'Answer',
        content: "Great, let's get started!",
        role: 'user',
        element: null,
        completed: true,
        default: true,
      },
      {
        key: 'someRandomUniqString2',
        title: 'Company Size',
        content: "So, we would first like to know the size of your company, please tell us something about it.",
        role: 'bot',
        element: null,
        completed: true,
        default: false,
      },
      {
        key: 'someRandomUniqString2',
        title: 'Answer',
        content: "We currently have 10 employees.",
        role: 'user',
        element: null,
        completed: true,
        default: true,
      },
      {
        key: 'someRandomUniqString2',
        title: 'Company Area',
        content: "Great, based on your answer I figured that it makes sense to ask you a bit about the content your company works with. Please select one from the drop down I prepared for you.",
        role: 'bot',
        element: null,
        completed: true,
        default: false,
      },
      {
        key: 'someRandomUniqString3',
        title: 'Area of work',
        content: "test test",
        role: 'bot',
        completed: true,
        default: false,
        element: {
            type: "radiogroup",
            choices: [
              {
                text: "Information Technology", 
                value: "yes",
              },
              {
                text: "Agriculture",
                value: "no",
              },
              {
                text: "Something else",
                value: "something else",
              }
            ],
          },
      },
]