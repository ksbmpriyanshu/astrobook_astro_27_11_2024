export const onNotificationActions = ({
  navigation,
  payload,
  type,
}) => {
    console.log(payload)
  switch (type) {
    case 'Call Request': {
      navigation.navigate('incomingCall', {
        callID: payload?.callID,
        userName: payload.customerName,
        userID: payload.user_id,
        
      });
      break; 
    }default:{
        return
    }
  }
};
