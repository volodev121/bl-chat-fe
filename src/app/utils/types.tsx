export interface QuestionTimelineElementsProp {
  name: string;
  title: string;
  type: string;
  completed: boolean;
  choices: Array<QuestionTimelineElementsChoicesProp>;
}

export interface ColorsProp {
  body_color: string;
  cta_color: string;
  cta_font_color: string;
  font_color: string;
  heading_background_color: string;
  heading_font_color: string;
}

export interface Config {
  colors: ColorsProp;
  cta_button_prompt: string;
  logo_url: string;
  icon_url: string;
  terms_of_service_link: string;
  widget_headline: string;
  question_timeline: QuestionTimelineProp | undefined;
}

export interface QuestionTimelineProp {
  logoPosition: string;
  elements: Array<QuestionTimelineRadiogroupElement >;
}

export interface QuestionTimelineElementsChoicesProp {
  text: string;
  value: string;
}
interface QuestionTimelineRadiogroupElement {
  type: "radiogroup";
  name: string;
  title: string;
  choices: Array<QuestionTimelineElementsProp>;
}

export interface HistoryData {
  question_type: string;
  role: string;
  action: string;
  time: string;
  question_text: string;
  question_id: string;
  answer: string;
}

export interface ElementData {
  type?: string;
  choices: Array<ElementDataValue>;
  // name: string;
  // completed?: boolean;
}

export interface ElementDataValue {
  text: string;
  value: string;
}

export interface MessageType {
  title?: string;
  type?: string;
  content: string;
  role: string;
  key?: string;
  element?: ElementData | null;
  completed?: boolean;
  name?: string;
  default?: boolean;
  customInput?: boolean;
  surveyQuestion?: boolean;
}

interface MessagesListProps {
  messages: Array<MessageType>;
  setMessage: (message: MessageType) => void;
}

