import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import {
  NoEncryption,
  Rotate90DegreesCcw,
  Translate,
} from "@mui/icons-material";

const useStyles = makeStyles((theme: Theme) => {
  return {
    "@global": {
      body: {
        background: "#FCFCFF",
      },
    },
    show: {
      transform: "translate(-50%, 0%) !important",
      background: "#000000 !important",
    },
    show2: {
      transform: "translate(-50%, 50vw) !important",
    },
    chatWidget: {
      maxWidth: "1280px",
      width: "100% !important",
      maxHeight: "726px",
      height: "100%",
      borderTopLeftRadius: "18px",
      borderTopRightRadius: "18px",
      transition: "transform 1.2s ease-in-out",
      position: "fixed",
      bottom: "0 !important", // changed from top to bottom
      background: "#E2E2F6 !important",
      // transform: "translateY(110%)",
      left: "50%",
      transform: "translate(-50%, 110%)",
      zIndex: "400 !important",
      alignContent: "start",
      paddingBottom: "2em",
      rowGap: "16px",
      gridTemplateColumns: "324px",
      gridTemplate:
        '"header header header  header  header header" 61px \
                     "list       messages    messages     messages messages   . " 1fr \
                     ".        footer      footer      footer   footer   .  " 50px / \
                      minmax(0px, calc((100vw - 60vw) /2))     4fr     2fr     10fr  1fr  minmax(0px, calc((100vw - 96vw) /2))',
      // [theme.breakpoints.down('md')]: {
      //   gridTemplate: '"header" 112px \
      //                   "list" auto\
      //                   "messages" 1fr\
      //                   "input" auto /\
      //                   1fr',
      //   overflowY: 'scroll',
      // }
      "&.show": {},
    },
    floatingChatButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      border: "none",
      background: "none",
      "z-index": 9999,
      "font-size": "20px",
      cursor: "pointer",
    },
    "@font-face": {
      fontFamily: "Poppins",
      src: "url('https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2')",
    },
    header: {
      borderTopLeftRadius: "2em",
      borderTopRightRadius: "2em",
      paddingBottom: "12px",
      width: "100%",
      height: "61px",
      "background-color": "#E2E2F6",
      display: "flex",
      borderBottom: "1px solid #BC32CE",
      justifyContent: "space-between",
      gridArea: "header",
    },
    toolTip: {
      maxWidth: "992px",
      width: "100%",
      height: "80px",
      backgroundImage: "url(/images/collapsed-bg.png)",
      backgroundSize: "cover",
      position: "fixed",
      bottom: "0",
      left: "50%",
      padding: "16px 24px",
      transition: "transform 1.2s ease-in-out",
      zIndex: "9999 !important",
      transform: "translateX(-50%)",
      borderRadius: "18px 18px 0 0",
      backgroundColor: "#5C0271",
      boxShadow: "-4px -4px 40px 0px rgba(140, 40, 200, 0.16)",
      overflow: "hidden",
    },
    tootipBackground: {
      position: "absolute",
      borderRadius: "24px 24px 0 0",
    },
    inputStyle: {
      flexGrow: 1,
      width: "100%",
      padding: "8px 16px !important",
      border: "1px solid #CDCDDF",
      outline: "none",
      borderRadius: "1em",
      backgroundColor: "#F4F4FF",
      fontFamily: "poppins !important",
      fontSize: "16px",
      color: "#7C7C8F !important",
      margin: "auto",
      left: "50%",
      transform: "translateX(-50%)",
    },
    buttonCircle: {
      width: "2em",
      height: "2em",
      borderRadius: "50%",
      backgroundColor: "#000000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    outlineSend: {
      color: "white",
      fontSize: "24px",
      borderRadius: "24px",
    },
    buttonCollapse: {
      background: "#F6F7FC !important",
      marginLeft: "110em !important",
      borderRadius: "12px !important",
      padding: "8px 22px 8px 22px !important",
    },
    borderAnimation: {
      position: "absolute",
      display: "none",
      width: "180px",
      height: "442px",
      transform: "rotate(45deg)",
      flexShrink: "0",
      opacity: "0.4",
      background: "#00F3D6",
      top: "-15em",
      filter: "blur(62px)",
      animation: `$borderAnimation 5000ms`,
    },
    "@keyframes borderAnimation": {
      "0%": {
        left: "0",
        top: "-15em",
      },
      "100%": {
        left: "150%",
        top: "-15em",
      },
    },
    chatWidgetMessageList: {
      width: "100%",
      overflowY: "scroll", // Enables vertical scrolling
      "&::-webkit-scrollbar": {
        display: "none", // For Chrome, Safari, and Opera
      },
      paddingTop: "0px !important",
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For Internet Explorer and Edge
      wordWrap: "break-word",
      gridArea: "messages",
      marginLeft: "32px !important",
      maxWidth: "876px",
      // [theme.breakpoints.down('md')]: {
      //   overflow: 'visible',
      // }
    },
    messageOverviewWrapper: {
      paddingTop: "unset !important",
      gridArea: "list",
      overflowY: "scroll", // Enables vertical scrolling
      "&::-webkit-scrollbar": {
        display: "none", // For Chrome, Safari, and Opera
      },
      scrollbarWidth: "none", // For Firefox
      msOverflowStyle: "none", // For Internet Explorer and Edge
      width: "324px",
    },
    messageOverview: {
      border: "1px solid #E3E3ED", // Changes the border to light grey
      backgroundColor: "#E9E9F8",
      color: "#000000",
      borderRadius: "16px 0 16px 16px",
      fontFamily: "poppins !important",
      fontWeight: "400 !important",
      paddingTop: "0px !important",
      paddingBottom: "0px !important",
    },
    messageOverviewState: {
      fontSize: "12px !important",
      fontFamily: "poppins !important",
      fontWeight: "400 !important",
      paddingLeft: "unset !important",
      lineHeight: "24px !important",
    },
    timeLineStepsContent: {
      fontSize: "12px !important",
    },
    timeLineStepText: {
      fontFamily: "poppins !important",
      fontWeight: "400 !important",
      fontSize: "12px !important",
      marginTop: "8px",
      marginBottom: "8px",
      lineHeight: "24px !important",
    },
    listItemIcon: {
      minWidth: "30px !important",
      paddingTop: "2px",
    },
    listItemContent: {
      // background: "#D8D8ED",
      borderRadius: "12px",
      marginTop: "12px",
      marginLeft: 0,
      fontWeight: "400 important",
    },
    listItemHead: {
      fontFamily: "poppins !important",
      fontSize: "14px !important",
      fontWeight: "500",
      color: "#000000",
      lineHeight: "24px !important",
      width: "708px",
    },
    listItemText: {
      fontFamily: "poppins !important",
      fontSize: "14px !important",
      fontWeight: "400 !important",
    },
    listItemReplyText: {
      fontFamily: "poppins !important",
      fontSize: "14px !important",
      fontWeight: "400 !important",
      lineHeight: "24px !important",
    },
    listItemHeadIcon: {
      height: "auto",
      maxWidth: "708px",
      width: "100%",
      width: "fit-content",
    },
    listItem: {
      paddingLeft: "0px !important",
    },
    chatContent: {
      paddingTop: "0px !important",
      marginLeft: "5em !important",
    },
    logo: {
      paddingTop: "20px",
    },
    toolTipWhite: {
      width: "100%",
      margin: "auto",
      textAlign: "left",
      height: "5em",
      color: "#FFFFFF",
      borderRadius: "24px 24px 0 0",
    },
    toolTipBlack: {
      backgroundColor: "#010101",
      height: "15em",
      color: "#FFFFFF",
      borderRadius: "24px 24px 0 0",
    },
    toolTipText: {
      fontFamily: "poppins !important",
      padding: "0px 22px",
      fontSize: "2em !important",
      fontWeight: "400 !important",
    },
    stepCount: {
      color: "#D02DF5",
    },
    termsConditions: {
      fontFamily: "poppins !important",
      fontSize: "12px !important",
      fontWeight: "500 !important",
      textAlign: "center",
      paddingBottom: "10px",
      color: "black",
    },
    termsConditionsLink: {
      textDecoration: "none",
    },
    feedbackContainer: {
      display: "flex",
      backgroundColor: "white",
      margin: "0%",
      padding: "2px 15px 2px 10px",
      border: "1px solid white",
      marginTop: "10px",
      borderRadius: "0px",
    },
    thumbUp: {
      padding: "4px 12px 4px 8px",
      cursor: "pointer",
    },
    thumbDown: {
      padding: "4px 12px 4px 12px",
      cursor: "pointer",
    },
    modelStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "35%",
      backgroundColor: "white",
      padding: "20px",
      border: "1px solid white",
      borderRadius: "0px",
    },
    headertitle: {
      margin: 0,
      "font-size": "16px",
      "margin-left": "10px",
    },
    buttonGridContainer: {
      justifyContent: "center",
    },
    headerIcon: {
      position: "relative",
    },
    findCrmButton: {
      margin: 0,
      "font-size": "16px",
      "margin-left": "10px",
      top: "7em",
      height: "48px",
      fontFamily: "poppins !important",
      fontWeight: "500 !important",
      borderRadius: "0 !important",
      boxShadow: "none !important",
    },
    footerContainer: {
      outline: "none",
      gridArea: "footer",
      maxWidth: "876px",
      width: "100%",
      height: "48px",
      border: "1px solid transparent",
      zIndex: 1
    },
    footer: {
      display: "flex",
      width: "100%",
      position: "relative",
      height: "100%",
      outline: "none",
      // overflow: 'hidden',
    },
    submitButton: {
      fontFamily: "poppins !important",
      fontWeight: 400,
      "margin-left": "10px",
      border: "none",
      padding: "5px 10px",
      cursor: "pointer",
    },
    footerGrayBorder: {
      border: "1px solid #CDCDDF",
      borderRadius: "16px"
    },
    footerTextBox: {
      "--border-radius": "1rem",
      "--border-size": "0.5rem",
      "--border-bg": "red",
      "--padding": "1rem",
      position: "relative",
      width: "100%",
      height: "100%",
      "flex-grow": 1,
      borderRadius: "1em",
      color: "#000000",
      backgroundColor: "#F4F4FF",
      paddingLeft: "16px !important",
      fontFamily: "poppins !important",
      fontSize: "16px",
      transition: "0.5s",
    },
    messagesList: {
      padding: "10px",
      height: "400px",
      "overflow-y": "auto",
      // [theme.breakpoints.down('md')]: {
      //   overflowY: 'visible',
      // }
    },
    chatMessageUl: {
      padding: "10px",
      margin: 0,
      "list-style": "none",
      "overflow-y": "scroll",
      "overflow-x": "hidden",
      "flex-grow": 1,
      "border-radius": "4px",
    },
    chatMessage: {
      background: "transparent",
      "& > li": {
        position: "relative",
        clear: "both",
        display: "inline-block",
        padding: "14px",
        margin: "0 0 10px 0",
        font: "12px/16px 'Noto Sans', sans-serif",
        "border-radius": "10px",
        "word-wrap": "break-word",
        "max-width": "81%",
        "&:before": {
          position: "absolute",
          top: 0,
          width: "25px",
          height: "25px",
          "border-radius": "25px",
          content: "",
          "background-size": "cover",
        },
        "&:after": {
          position: "absolute",
          top: "10px",
          content: "",
          width: 0,
          height: 0,
          "border-top": "10px solid rgba(25, 147, 147, 0.2)",
        },
        "&.other": {
          animation: "$showChatOdd 0.15s 1 ease-in",
          "-moz-animation": "$showChatOdd 0.15s 1 ease-in",
          "-webkit-animation": "$showChatOdd 0.15s 1 ease-in",
          float: "right",
          // 'margin-right': '45px',
          color: "#000000",
          "background-color": "#e3d2d2",
          "&:before": {
            right: "-45px",
            "background-image": "url(https://github.com/Thatkookooguy.png)",
          },
          "&:after": {
            "border-right": "10px solid transparent",
            right: "-10px",
          },
        },
        "&.self": {
          animation: "$showChatEven 0.15s 1 ease-in",
          "-moz-animation": "$showChatEven 0.15s 1 ease-in",
          "-webkit-animation": "$showChatEven 0.15s 1 ease-in",
          float: "left",
          // 'margin-left': '45px',
          color: "#000000",
          "background-color": "#cdddf7",
          "&:before": {
            left: "-45px",
            "background-image": "url(https://github.com/ortichon.png);",
          },
          "&:after": {
            "border-left": "10px solid transparent",
            left: "-10px",
          },
        },
      },
    },
    chatMessageMessage: {
      margin: "5px 0",
    },
    messageOther: {
      "font-weight": "bold",
    },
    messageSelf: {
      "font-weight": "bold",
    },
    closeButton: {
      left: "11.5em",
      position: "relative",
      top: "5px",
    },
    element: {
      "flex-direction": "row",
      "justify-content": "center",
    },
    radioIconContainer: {
      margin: "4px",
      width: "24px",
      height: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    radioUncheckedIcon: {
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      border: "2px solid #d02df5",
      background: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    radioCheckedIcon: {
      display: "inline-block",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#d02df5",
    }
  };
});

export default useStyles;
