import { apiPost } from './axiosClient';
import { chatEndpoint } from './apiConstants';

const getChat = async (data: any, headers: any): Promise<any> =>{
    return await apiPost(chatEndpoint, data, headers).then((response) => {
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log(error)
        return {
            status: error.status,
            data: error.response
        }
    })
}


// TODO: we will need to pass the expiration time of the token and refresh it in the background for long running sessions!
const apiClient = function(token) {
  return {
    chat: async function(chatHistory: Array<MessageType>) {
      const chat = await getChat(
        { 
          prompts: chatHistory.map(
            (msg) => { 
              return { content: msg.content, role: (msg.role == "user" ? "user" : "assistant")}
            }
          ) 
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      console.log(chat)
      if (chat.status == 200) {
        // this should also have 'context' and 'topics' to use
        return { role: 'bot', type: 'botanswer', content: chat.data.text, raw: chat.data }
      } else {
        return { role: 'bot', type: 'escalateToHuman', content: "I am very sorry, something had to be gone wrong on my end. Shall I try and connect you to a human?", raw: chat.data }
      }
    }
  }
}

export default apiClient;
