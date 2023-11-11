import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => {
  return {
    show: {
        transform: 'translateY(0%) !important',
        background: '#000000 !important',
    },
    chatWidget: {
      borderTopLeftRadius: '2em',
      borderTopRightRadius: '2em',

      transition: 'transform 1.2s ease-in-out',
      transform: 'translateY(100%)',
      position: 'fixed',
      left: '10vw',
      bottom: '0 !important',  // changed from top to bottom
      background: '#FFFFFF !important',
      width: '80vw !important',
      height: '90vh !important', 
      zIndex: '400 !important',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      alignContent: 'start',
      paddingBottom: '2em',
      gridGap: '2em',
      gridTemplate: '"header header header  header  header" 70px \
                     ".       list    .     messages .    " 1fr \
                     ".        .      .      input   .    " 5em / \
                      minmax(0px, calc((100vw - 1180px) /2))     4fr     2fr     10fr    minmax(0px, calc((100vw - 1180px) /2))',
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
        background: "#FCFCFF"
      },
    },
    '@font-face': {
      fontFamily: 'Poppins',
      src: "url('https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2')"
    },
    header: {
      borderTopLeftRadius: '2em',
      borderTopRightRadius: '2em',

      width: '100%',
      'background-color': '#FFFFFF',
      //height: '112px',
      display: 'flex',
      'align-items': 'center',
      'border-bottom-style': 'groove',
      'border-color': '#F6F7FC',
      'border-width': 'thin',
      justifyContent: 'space-between',
      padding: '0px 39px',
      gridArea: 'header'
    },
    toolTip: {
      width: '46vw',
      position: 'fixed',
      bottom: '0',
      left: '50%',
      zIndex: '9999 !important',
      transform: 'translateX(-50%)',
      //'border-shadow': '0 2px 5px rgba(0, 0, 0, 0.3)',
      borderRadius: '24px 24px 0 0',
      backgroundColor: '#FFFFFF',
      transition: 'all 250ms ease-out',
      //'box-shadow': '0 2px 5px rgba(0, 0, 0, 0.3)'
    },
    inputStyle: {
      flexGrow: 1,
      width: '43.6vw',
      padding: '5px',
      border: '1px solid',
      outline: 'none',
      borderRadius: '1em',
      borderColor: '#ABABBE',
      backgroundColor: '#efeffb',
      paddingLeft: '16px !important',
      fontFamily: 'poppins !important',
      fontSize: '16px',
      margin: 'auto',
      bottom: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    buttonCircle: {
      width: '2em',
      height: '2em',
      borderRadius: '50%',
      backgroundColor: '#ABABBE',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '10px',
    },
    outlineSend:{
      color: 'white', 
      fontSize: '24px', 
      borderRadius: '24px',
    },
    buttonCollapse: {
      background: '#F6F7FC !important',
      marginLeft: '110em !important',
      borderRadius: '12px !important',
      padding: '8px 22px 8px 22px !important',
    },
    chatWidgetMessageList: {
      width: '100%',
      overflow: 'auto', 
      '&::-webkit-scrollbar': {
        width: 0
      },
      wordWrap: 'break-word',
      gridArea: 'messages',
      // [theme.breakpoints.down('md')]: {
      //   overflow: 'visible',
      // }
    },
    messageOverviewWrapper: {
      paddingTop: 'unset !important',
      gridArea: 'list',
      overflow: 'scroll',
    },
    messageOverview: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      borderRadius: '24px 0 24px 24px',
      fontFamily: 'poppins !important',
      fontWeight: '400 !important',
    },
    messageOverviewState: {
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
      width: 'fit-content',
    },
    chatContent: {
      paddingTop: '0px !important',
      marginLeft: '5em !important'
    },
    logo: {
      paddingTop: '20px',
    },
    toolTipWhite: {
      textAlign: 'left',
      height: '5em',
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
      color: 'black'
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
      gridArea: 'input',
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
      borderRadius: '1em',
      borderColor: '#F2F2F2',  
      paddingLeft: '16px !important',
      fontFamily: 'poppins !important',
      fontSize: '16px',
    },
    messagesList: {
      padding: '10px',
      height: '400px',
      'overflow-y': 'auto',
      // [theme.breakpoints.down('md')]: {
      //   overflowY: 'visible',
      // }
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
  }
});
  
  export default useStyles;
  
