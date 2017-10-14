import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Events from 'react-native-simple-events';

export const showSnackBar = (data = {}) => {
    let {
        message = "Your custom message", textColor = '#FFF',
        position = "bottom", confirmText = "OK", buttonColor = '#03a9f4',
        duration = 4000, animationTime = 250, backgroundColor = "#323232",
        onConfirm = () => {}, ...otherProps
    } = data;

    Events.trigger('showSnackBar', {
        message,
        textColor,      // message text color
        position,  // enum(top/bottom).
        confirmText, // button text.
        buttonColor, // default button text color
        duration,// (in ms), duartion for which snackbar is visible.
        animationTime, // time duration in which snackbar will complete its open/close animation.
        backgroundColor, //background color for snackbar
        onConfirm,    //  perform some task here on snackbar button press.
        ...otherProps
    });
};

export default class SnackBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Had a snack at snackBar.',
            confirmText: null,
            onConfirm: null,
            position: 'bottom',
            show: false,
            duration: 5000,
            animationTime: 250,
            height: 48,
            textColor: '#FFF',
            buttonColor: '#03a9f4',
            backgroundColor: '#323232',

            top: new Animated.Value(-48),
            bottom: new Animated.Value(-48)
        };
    }

    componentWillMount() {
        let {id = null} = this.props;
        Events.on('showSnackBar', id ? id : '123456789', this.onRequest);
    }

    componentWillUnmount() {
        let {id = null} = this.props;
        Events.remove('showSnackBar', id ? id : '123456789');
    }

    onRequest = (options) => {
        let {message, confirmText, onConfirm, position = 'bottom', height = 48, duration = 4000, animationTime = 250, show = true, ...otherOptions} = options;

        if (message) {
            this.setState({
                message, confirmText,
                onConfirm, position,
                height, duration,
                show, ...otherOptions,
                top: new Animated.Value(-1 * height),
                bottom: new Animated.Value(-1 * height)
            }, () => {
                position === 'top' && Animated.sequence([
                    Animated.timing(this.state.top, {toValue: 0, duration: animationTime}),
                    Animated.delay(duration),
                    Animated.timing(this.state.top, {toValue: -1 * height, duration: animationTime}),
                ]).start();

                position === 'bottom' && Animated.sequence([
                    Animated.timing(this.state.bottom, {toValue: 0, duration: animationTime}),
                    Animated.delay(duration),
                    Animated.timing(this.state.bottom, {toValue: -1 * height, duration: animationTime}),
                ]).start();

                setTimeout(() => {
                    this.setState({show: false});
                }, duration + 500);
            });
        }
    };

    hideSnackBar = () => {
        let {top, bottom, position, height, animationTime} = this.state;
        position === 'top' && Animated.sequence([
            Animated.timing(this.state.top, {toValue: -1 * height, duration: animationTime}),
        ]).start();

        position === 'bottom' && Animated.sequence([
            Animated.timing(this.state.bottom, {toValue: -1 * height, duration: animationTime}),
        ]).start();
    };

    render() {
        let {
            height, show,
            message, confirmText,
            position, top, bottom,
            textColor, buttonColor, backgroundColor,
            onConfirm = () => {
            }
        } = this.state;

        let snackbarStyle = [{
            position: 'absolute', flexDirection: 'row',
            minHeight: height, maxHeight: 80,
            backgroundColor: backgroundColor,
            left: 0, right: 0,
            paddingHorizontal: 24,
            shadowRadius: 2, shadowColor: 'black',
            shadowOffset: {height: 3, width: 1},
            shadowOpacity: 0.4, elevation: 24,
        },
            position === 'top' && {top: top},
            position === 'bottom' && {bottom: bottom}
        ];
        let buttonTextStyle = [{color: buttonColor, fontFamily: "Roboto-Medium", textAlign: 'left', fontSize: 14}];
        let messageTextStyle = [{color: textColor, fontFamily: "Roboto-Regular", fontSize: 14}];

        if (show) {
            return (
                <Animated.View style={snackbarStyle}>
                    <View style={[{flex: 10, paddingVertical: 14, justifyContent: 'center'}]}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={messageTextStyle}>
                            {message}
                        </Text>
                    </View>
                    {
                        confirmText &&
                        <View style={[{flex: 2, paddingLeft: 24}]}>
                            <TouchableOpacity activeOpacity={0.7}
                                              onPress={() => {
                                                  onConfirm && onConfirm();
                                                  this.hideSnackBar();
                                              }} style={{flex: 1}}>
                                <View style={[{
                                    flex: 1, alignItems: 'center', justifyContent: 'center'
                                }]}>
                                    <Text style={buttonTextStyle}>
                                        {confirmText.toUpperCase()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </Animated.View>
            )
        } else {
            return (<View/>);
        }
    }
}