import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles({
    chatWidget: {
      position: 'fixed',
      top: '0 !important',
      background: '#F6F7FC !important',
      width: '100% !important',
      zIndex: '9999 !important',
      height: '100vh',
      alignContent: 'start',
    },
    floatingChatButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      border: 'none',
      background: 'none',
      'z-index': 9999,
      'font-size': '20px',
      cursor: 'pointer',
    },
    '@global':{
      body:{
        background: "#F6F7FC"
      },
    },
    '@font-face': {
      fontFamily: 'Poppins',
      src: "url('https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2')"
    },
    header: {
      width: '100%',
      'background-color': '#FFFFFF',
      height: '112px',
      display: 'flex',
      'align-items': 'center',
      'border-bottom-style': 'groove',
      'border-color': '#F6F7FC',
      'border-width': 'thin',
      padding: '0px 39px',
    },
    toolTip: {
      width: '360px !important',
      position: 'fixed',
      bottom: '50px',
      right: '-4px',
      transition: 'all 250ms ease-out',    
      'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.3)',
      transform: 'translate(-31px, -4.3em)',
      borderRadius: '24px 24px 0 24px',
      backgroundColor: '#FFFFFF',
      zIndex: 1000,
    },
    buttonCollapse: {
      background: '#F6F7FC !important',
      marginLeft: '110em !important',
      borderRadius: '12px !important',
      padding: '8px 22px 8px 22px !important',
    },
    ChatWidgetBody: {
      margin: '2em 3em !important',
    },
    chatWidgetMessageList: {
      width: '100%',
      height: '48em',
      overflow: 'auto', 
      '&::-webkit-scrollbar': {
        width: 0
      }
    },
    timeLineSideNav: {
      backgroundColor: '#FFFFFF',
      paddingTop: 'unset !important',
      color: '#000000',
      borderRadius: '24px 0 24px 24px',
      fontFamily: 'poppins !important',
      fontWeight: '400 !important',
    },
    timeLineSideNavState: {
      fontSize: '12px !important',
      fontFamily: 'poppins !important',
      fontWeight: '400 !important',
      paddingLeft: 'unset !important'
    },
    timeLineStepsContent: {
      fontSize: '12px !important',
    },
    timeLineStepText: {
      fontFamily: 'poppins !important',
      fontWeight: '400 !important',
      fontSize: '12px !important',
      marginTop: '10px',
      marginBottom: '12px',
      margin: 'revert !important'
    },
    listItemIcon: {
      minWidth: '30px !important'
    },
    listItemContent: {
      background: '#FFFFFF',
      marginBottom: '20px',
      borderRadius: '12px',
      margin: '15px',
    },
    listItemHead: {
      fontFamily: 'poppins !important',
      fontSize: '14px !important',
      fontWeight: '500 !important',
      margin: '0px 0px 0px 6px !important',
      color: '#000000',
    },
    listItemText: {
      fontFamily: 'poppins !important',
      fontSize: '14px !important',
      fontWeight: '400 !important',
    },
    listItemReplyText: {
      fontFamily: 'poppins !important',
      fontSize: '14px !important',
      fontWeight: '400 !important',
    },
    listItemHeadIcon: {
      height: 'auto',
      maxWidth: '40em',
    },
    chatContent: {
      paddingTop: '0px !important',
      marginLeft: '5em !important'
    },
    logo: {
      paddingTop: '20px',
    },
    toolTipWhite: {
      textAlign: 'center',
      height: '15em',
      color: '#FFFFFF',
      borderRadius: '24px 24px 0 0',    
    },
    toolTipBlack: {
      backgroundColor: '#010101',
      height: '15em',
      color: '#FFFFFF',
      borderRadius: '24px 24px 0 0',
    },
    toolTipText: {
      fontFamily: 'poppins !important',
      padding: '0px 22px',
      fontSize: '2em !important',
      fontWeight: '400 !important',
    },
    stepCount: {
      color: '#D02DF5'
    },
    termsConditions: {
      fontFamily: 'poppins !important',
      fontSize: '12px !important',
      fontWeight: '500 !important',
      textAlign: 'center',
      paddingBottom: '10px',
    },
    termsConditionsLink: {
      textDecoration: 'none',
    },
    feedbackContainer: {
      display: 'flex',
      backgroundColor: 'white',
      margin: '0%',
      padding: '2px 15px 2px 10px',
      border: '1px solid white',
      marginTop: '10px',
      borderRadius: '16px',
    },
    thumbUp: {
      padding: '4px 12px 4px 8px',
      cursor: 'pointer',
    },
    thumbDown: {
      padding: '4px 12px 4px 12px',
      cursor: 'pointer',
    },
    modelStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '35%',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid white',
      borderRadius: '16px',
    },
    headertitle: {
      margin: 0,
      'font-size': '16px',
      'margin-left': '10px',
    },
    buttonGridContainer: {
      justifyContent: 'center'
    },
    headerIcon: {
      position: 'relative',
    },
    findCrmButton: {
      margin: 0,
      'font-size': '16px',
      'margin-left': '10px',
      'top': '7em',
      height: '48px',
      fontFamily: 'poppins !important',
      fontWeight: '500 !important',
      borderRadius: '0 !important',
      boxShadow: 'none !important'
    },
    footer: {
      display: 'flex',
    },
    submitButton: {
      fontFamily: 'poppins !important',
      fontWeight: 400,
      'margin-left': '10px',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    footerTextBox: {
      'flex-grow': 1,
      padding: '5px',
      border: 'solid',
      borderRadius: '12px',
      borderColor: '#F2F2F2',  
      paddingLeft: '16px !important',
      fontFamily: 'poppins !important',
      fontSize: '16px',
    },
    messagesList: {
      padding: '10px',
      height: '400px',
      'overflow-y': 'auto',
    },
    chatMessageUl: {
      padding: '10px',
      margin: 0,
      'list-style': 'none',
      'overflow-y': 'scroll',
      'overflow-x': 'hidden',
      'flex-grow': 1,
      'border-radius': '4px',
    },
    chatMessage: {
      background: 'transparent',
      '& > li': {
        position: 'relative',
        clear: 'both',
        display: 'inline-block',
        padding: '14px',
        margin: '0 0 10px 0',
        font: "12px/16px 'Noto Sans', sans-serif",
        'border-radius': '10px',
        'word-wrap': 'break-word',
        'max-width': '81%',
        '&:before': {
          position: 'absolute',
          top: 0,
          width: '25px',
          height: '25px',
          'border-radius': '25px',
          content: '',
          'background-size': 'cover',
        },
        '&:after': {
          position: 'absolute',
          top: '10px',
          content: '',
          width: 0,
          height: 0,
          'border-top': '10px solid rgba(25, 147, 147, 0.2)',
        },
        '&.other': {
          animation: '$showChatOdd 0.15s 1 ease-in',
          '-moz-animation': '$showChatOdd 0.15s 1 ease-in',
          '-webkit-animation': '$showChatOdd 0.15s 1 ease-in',
          float: 'right',
          // 'margin-right': '45px',
          color: '#000000',
          'background-color': '#e3d2d2',
          '&:before': {
            right: '-45px',
            'background-image': 'url(https://github.com/Thatkookooguy.png)',
          },
          '&:after': {
            'border-right': '10px solid transparent',
            right: '-10px',
          },
        },
        '&.self': {
          animation: '$showChatEven 0.15s 1 ease-in',
          '-moz-animation': '$showChatEven 0.15s 1 ease-in',
          '-webkit-animation': '$showChatEven 0.15s 1 ease-in',
          float: 'left',
          // 'margin-left': '45px',
          color: '#000000',
          'background-color': '#cdddf7',
          '&:before': {
            left: '-45px',
            'background-image': 'url(https://github.com/ortichon.png);',
          },
          '&:after': {
            'border-left': '10px solid transparent',
            left: '-10px',
          },
        },
      }
    },
    chatMessageMessage: {
      margin: '5px 0',
    },
    messageOther: {
      'font-weight': 'bold',
    },
    messageSelf: {
      'font-weight': 'bold',
    },
    closeButton: {
      left: '11.5em',
      position: 'relative',
      top: '5px',
    },
    element: {
      'flex-direction': 'row',
      'justify-content': 'center',
    }
  });
  
  export default useStyles;
  
