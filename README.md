# react-native-snackbar

Snackbars are used for displaying a brief message to the user, along with an optional action. 
They animate up from the bottom of the screen and then disappear shortly afterward.
This repo provides snackbar that can appear from bottom or top as per requirements.

It is a simple React-native library, works for both Android and IOS.

You have to Just import it and use it.
Its has dependency on react-native-simple-events.
It is a minimalist implementation of snackbar. It is small and fast. 

![Alt text](./images/top.png?raw=true "Optional Title")
![Alt text](./images/bottom.png?raw=true "Optional Title")

## Installation

```
npm install @prince8verma/react-native-snackbar --save
```

### Implementation
```
import Snackbar from '@prince8verma/react-native-snackbar';

<View style={{flxe:1}}>
    {/*...........Root App code.......*/}
    <SnackBar id={"Root_App"}/>
</View>
```

```
import {showSnackBar} from '@prince8verma/react-native-snackbar';


showSnackBar({
            message: "Your custom message",
            textColor: '#FFF',      // message text color
            position: 'top',  // enum(top/bottom).
            confirmText: 'OK', // button text.
            buttonColor: '#03a9f4', // default button text color
            duration: 4000,   // (in ms), duartion for which snackbar is visible.
            animationTime: 250, // time duration in which snackbar will complete its open/close animation.
            backgroundColor:"#323232", //background color for snackbar
            onConfirm: () => {},    //  perform some task here on snackbar button press.
  });
```



The option to support:

|property|type|default|description|
|--------|----|-------|-----------|
|message|String|'Had a snack at snackBar.'|Message shown in snackbar.|
|textColor|color string|"#FFF"|message text color|
|position|enum("top"/"bottom")|"bottom"|position of snackbar|
|confirmText| "String"| "OK" | button text.|
|buttonColor| color string| "#03a9f4" |default button text color|
|duration|Int| 5000 | time in ms, duartion for which snackbar is visible|
|animationTime|Int| 250 | time in ms, duration in which snackbar will complete its open/close animation.|
|backgroundColor| color string| "#323232" |background color for snackbar|
|onConfirm| function |undefined |perform some task here on snackbar button press.|


