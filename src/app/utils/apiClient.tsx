import { apiPost, apiPut } from './axiosClient';
import { chatEndpoint, historyEndpoint } from './apiConstants';
import { MessageType } from  './types'

const getChat = async (data: any, headers: any): Promise<any> =>{
    return await apiPost(chatEndpoint, data, headers).then((response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        return {
            status: error.status,
            data: error.response
        }
    })
}

const setHistory = async (data: any, headers: any): Promise<any> =>{
    return await apiPut(historyEndpoint, data, headers).then((response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        return {
            status: error.status,
            data: error.response
        }
    })
}

const chatToHistoryFormat = function(chatHistory: Array<MessageType>) {
  return chatHistory.map((msg) => {
    if (msg.surveyQuestion) {
      switch(msg.role) {
        case "bot":
          if (msg.element) {
            switch(msg.element.type){
              case "radiogroup":
                return({
                  question_type: "radio",
                  role: "bot",
                  action: "question",
                  time: msg.time,
                  question_text: msg.content || msg.title,
                  question_id: msg.key
                })
              case "text":
                return({
                  question_type: "text",
                  role: "bot",
                  action: "question",
                  time: msg.time,
                  question_text: msg.content || msg.title,
                  question_id: msg.key,
                })
              default:
                return({
                  question_type: msg.element.type,
                  role: "bot",
                  action: "question",
                  time: msg.content || msg.time,
                  question_text: msg.title,
                  question_id: msg.key,
                });
            }
          } // a surveyQuestion without an element attached should not exist.
          break;
        case "user":
          switch(msg.element.type){
            case "radiogroup":
              return({
                question_type: "radio",
                role: "user",
                action: "answer",
                time: msg.time,
                question_text: msg.element.title, // we need a reference to the original question to fix this
                question_id: msg.name,
                answer: msg.content,
              });
            case "text":
              return({
                question_type: "text",
                role: "user",
                action: "answer",
                time: msg.time,
                question_text: msg.element.title, // we need a reference to the original question to fix this
                question_id: msg.name,
                answer: msg.content,
              });
            default:
              return({
                question_type: msg.element.type,
                role: "user",
                action: "answer",
                time: msg.time,
                question_text: msg.element.title, // we need a reference to the original question to fix this
                question_id: msg.key,
                answer: msg.content,
              });
          }
          break;
        default:
        // I don't know what to put here
      }  
    } else { // not survey questions
      return({
        question_type: "text",
        role: msg.role,
        action: msg.role == "user" ? "question" : "answer",
        time: "2023-08-22 11:47:21",
        question_id: `${msg.key}`.split('-')[0],
        question_text: msg.role == "user" ? msg.content : "",
        answer: msg.role == "bot" ? msg.content : "", //add rating
      })
    }
  })
}

// TODO: we will need to pass the expiration time of the token and refresh it in the background for long running sessions!
const createApiClint = function(token: any) {
  return {
    chat: async function(chatHistory: Array<MessageType>) {
      const chat = await getChat(
        { 
          prompts: chatHistory.map(
            (msg) => { 
              return { content: msg.content || msg.title , role: (msg.role == "user" ? "user" : "assistant")}
            }
          ) 
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (chat.status == 200) {
        // this should also have 'context' and 'topics' to use
        return { role: 'bot', type: 'botanswer', content: chat.data.text, context: chat.data.context || [], raw: chat.data }
      } else {
        return { role: 'bot', type: 'escalateToHuman', content: "I am very sorry, something had to be gone wrong on my end. Shall I try and connect you to a human?", raw: chat.data }
      }
    },
    updateHistory: async function(chatHistory: Array<MessageType>) {
      const chat = await setHistory(
        chatToHistoryFormat(chatHistory),
        {
          headers: {
            Authorization: token,
          },
        }
      )
    }
  }
}

export default createApiClint;
