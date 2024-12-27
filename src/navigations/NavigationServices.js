// NavigationServices.js
import { createNavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const setTopLevelNavigator = (navigatorRef) => {
  navigationRef.current = navigatorRef;
};

export const navigate = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const replace = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export const resetToScreen = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

export const onPop = (val) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(val));
  }
};
