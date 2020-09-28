import React, { Component } from "react";
import {
  GiftedChat,
  SystemMessage,
  Send,
  Bubble,
} from "react-native-gifted-chat";
import { connect } from "react-redux";
import {
  View,
  Keyboard,
  Platform,
  PermissionsAndroid,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import I18n from "react-native-i18n";
import moment from "moment";
import { bindActionCreators } from "redux";
import {
  AppText,
  AppSpinner,
  AppView,
  AppInput,
  AppImage,
  responsiveHeight,
  AppIcon,
  AppNavigation,
  moderateScale,
  AppButton,
  responsiveWidth,
  AppScrollView,
} from "../../common";
import { AppHeader } from "../../components";
import styles from "./styles";
import avatar from "../../assets/imgs/avatar.png";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
// import ChatHeader from "./ChatHeader";
import Echo from "laravel-echo";
import Socketio from "socket.io-client";
import { getEcho } from "../../api/IoActions";
import Pusher from "pusher-js/react-native";
import colors from "../../common/defaults/colors";
import FastImage from "react-native-fast-image";
import ChatBottomSheet from "../../components/ChatBottomSheet";
import DocumentPicker from "react-native-document-picker";
import AudioRecord from "react-native-audio-record";
import ImagePicker from "react-native-image-picker";
import Pdf from "react-native-pdf";
import RNFetchBlob from "rn-fetch-blob";
import PDFView from "react-native-view-pdf";
import MapLocation from "../../components/productDetails/MapLocation";

// import PDFView from "react-native-pdf-view";

// import { setThreadId } from "../../redux/actions/chat";
// import { navigateToUSer } from "../../api/utils/Navigation";
// import EmptyDataScreen from "../../components/emptyDataScreen/EmptyDataScreen";

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.chatSocket = null;

    this.chatBottomSheet = React.createRef();
    let options = {
      broadcaster: "pusher",
      key: "myKey",
      wsHost: "ejarly.dev.fudexsb.com",
      wsPort: 6001,
      wssPort: 6001,
      disableStats: true,
      authEndpoint: "http://ejarly.dev.fudexsb.com/broadcasting/auth",

      auth: {
        headers: {
          Authorization: `Bearer ${props.currentUser.token}`,
        },
      },
    };
    let PusherClient = new Pusher(options.key, options);
    console.log("PusherClient", PusherClient);

    PusherClient.connection.bind("error", function(err) {
      log(">>> detected limit error");
    });

    PusherClient.connection.bind("connected", function() {
      console.log("isConnected");
    });
    this.echo = new Echo({
      broadcaster: "pusher",
      client: PusherClient,
      ...options,
    });
    console.log("echoo", this.echo);

    // alert(`Socet Connection: =>${this.echo.connector.socket.connected}`);
  }

  state = {
    messages: [],
    loading: true,
    imgUri: "",
    showImage: false,
    recipient: this.props.user || null,
    isThreadCreated: false,
    threadId: undefined,
    recording: false,
    audioFile: "",
    loaded: false,
  };

  async componentDidMount() {
    this.listenToEchoo(this.props.orderId);
    await this.checkForOldMessage();
    this.initAudioRecord();
  }

  renderPickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        "file",
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
      const formData = new FormData();
      formData.append("file", {
        uri: res.uri,
        type: "file/*",
        name: "images",
      });
      this.sendNewMessage(formData);
    } catch (err) {
      this.chatBottomSheet.current.hide();

      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  renderRecordVoice = async () => {
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: "test.wav", // default 'audio.wav'
    };

    AudioRecord.init(options);

    AudioRecord.start();

    AudioRecord.stop();
    // or to get the wav file path
    audioFile = await AudioRecord.stop();

    AudioRecord.on("data", (data) => {
      // base64-encoded audio data chunks
    });
  };
  initAudioRecord = async () => {
    console.log("dsdsc");

    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "test.wav",
    };

    AudioRecord.init(options);

    AudioRecord.on("data", (data) => {
      // const chunk = Buffer.from(data, "base64");
      console.log("chunk size", data);
      // do something with audio chunk
    });
  };
  start = () => {
    console.log("start record");
    this.setState({ audioFile: "", recording: true, loaded: false });
    AudioRecord.start();
  };
  stop = async () => {
    if (!this.state.recording) return;
    console.log("stop record");
    let audioFile = await AudioRecord.stop();
    console.log("audioFile", audioFile);
    this.setState({ audioFile, recording: false });
  };

  play = () => {
    if (this.state.loaded) {
      AudioPlayer.unpause();
      this.setState({ paused: false });
    } else {
      AudioPlayer.play(this.state.audioFile);
      this.setState({ paused: false, loaded: true });
    }
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        const uri = response.uri;

        this.setState({ showImage: true });

        this.selectImage(uri);
      }
    });
  };

  onChange = (val) => {
    const formData = new FormData();
    formData.append("longitude", val.longitude);
    formData.append("latitude", val.latitude);
    this.sendNewMessage(formData);
  };

  handlePickLocation = () => {
    AppNavigation.push({
      name: "mapScreen",
      passProps: {
        onLocationChangeCallback: (val) => {
          this.onChange(val);
        },
      },
    });
  };
  listenToEchoo = (threadId) => {
    this.echo
      .join(`chat.${this.props.order_id}.${this.props.owner_id}`)
      .here((event) => {
        console.log("here ==>>>", event);
      })
      .listen("MessageSent", (msg) => {
        console.log("chat message^^^^ --->>", msg);
        const { message } = msg;
        const newMessage = {
          _id: Math.random(),
          text: message.message,
          image: message.image,
          file: message.file,
          voice: message.voice,
          location: message.location,
          created_at: moment(message.created_at).format("hh:mm a"),
          user: {
            _id: message.user.id,
            name: message.user.name,
            avatar: message.user.avatar,
          },
        };

        this.setState((previousState) => ({
          messages: GiftedChat.append(previousState.messages, newMessage),
        }));
      });

    console.log("echoo *****", this.echo);
  };



  fetchMessages = async (threadId) => {
    const user_id = this.props.userProfileData.id;
    if (threadId !== undefined) this.listenToEchoo(threadId);
    this.setState({
      loading: true,
      threadId,
    });
    try {
      const response = await axios.get(
        `${API_ENDPOINT}messages/thread/${threadId}`
      );

      const recipient = response.data.data.participants.filter(
        (item) => item.id !== user_id
      );

      // listen to chat

      // this.echo.private(`chat_user_${user_id}`).listen(".new_message", e => {
      //   console.log("chat message --->>", e);
      // });

      // console.log("echo Ecooo ---fetch >>>>", this.echo);

      this.setState(
        {
          loading: false,
          data: response.data.data.participants,
        },
        () => {
          this.setState({
            recipient,
          });
        }
      );
      const msg = response.data.data.messages;
      console.log("msg =?", msg);

      const messagesList = msg.map((msgItem) => {
        if (msgItem.user === null) {
          return {
            _id: msgItem.id,
            text: msgItem.body,
            created_At: msgItem.created_at,
          };
        }
        return {
          _id: msgItem.id,
          text: msgItem.body,
          created_at: moment(msgItem.created_at).format("hh:mm a"),

          user: {
            _id: msgItem.user.id,
            name: msgItem.user.username,
            avatar: msgItem.user.picture,
          },
        };
      });

      this.setState((previousState) => {
        console.log("prevState ==", previousState);
        console.log("state list -=", messagesList);
        console.log("state reverse ==", messagesList.reverse());

        return {
          messages: GiftedChat.append(
            previousState.messages,
            messagesList.reverse()
          ),
        };
      });
    } catch (error) {
      console.log("errie", JSON.parse(JSON.stringify(error)));
      this.setState({
        loading: false,
      });
    }
  };

  addMessageToExistThread = async (body) => {
    console.log("add message to exist thread");

    const message = this.state.textMsg;
    const { order_id, owner_id } = this.props;

    console.log("exist thread", body);

    try {
      const response = await axios.post(
        `${API_ENDPOINT_GATEWAY}messages/${order_id}/${owner_id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response ==>>", response);

      // this.setState(previousState => ({
      //   messages: GiftedChat.append(previousState.messages, messagesList)
      // }));
    } catch (error) {
      console.log("erreerrr", error.response);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isConnect !== nextProps.isConnect && nextProps.isConnect) {
      this.setState({
        loading: true,
      });
    }
  }

  checkForOldMessage = async () => {
    try {
      const { order_id, owner_id } = this.props;
      const res = await axios.get(
        `${API_ENDPOINT_GATEWAY}messages/${order_id}/${owner_id}`
      );

      console.log("res", res);
      if (res.data) {
        const messagesList = res.data.map((msgItem) => {
          if (msgItem.user === null) {
            return {
              _id: msgItem.id,
              text: msgItem.body,
              created_At: msgItem.created_at,
            };
          }
          return {
            _id: msgItem.id,
            text: msgItem.message,
            created_at: moment(msgItem.created_at).format("hh:mm a"),
            image: msgItem.image,
            file: msgItem.file,
            voice: msgItem.voice,
            location: msgItem.location,

            user: {
              _id: msgItem.user.id,
              name: msgItem.user.username,
              avatar: msgItem.user.avatar,
            },
          };
        });

        this.setState((previousState) => {
          console.log("prevState ==", previousState);
          console.log("state list -=", messagesList);
          console.log("state reverse ==", messagesList.reverse());

          return {
            messages: GiftedChat.append(
              previousState.messages,
              messagesList.reverse()
            ),
          };
        });
      }

      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log("error -->>", error);
    }
  };

  renderImage = (currentMsg) => {
    return (
      <AppView
        marginHorizontal={2}
        style={[
          styles.bubleContainer,
          {
            paddingTop: moderateScale(2),
            borderWidth: moderateScale(0.5),
            borderColor:
              currentMsg.user._id === this.props.owner_id ? "#E4E5E5" : "#fff", // props.current user id
            borderRadius: 5,
            backgroundColor:
              currentMsg.user._id === this.props.owner_id ? "#E4E5E5" : "#fff",
          },
        ]}
      >
        <AppImage
          source={{ uri: currentMsg.image }}
          width={35}
          height={30}
          padding={1}
          imageViewer
          data={[{ uri: currentMsg.image }]}
        />

        <AppView height={3} centerY style={styles.timeContainer}>
          <AppText paddingHorizontal={5} size={4} style={styles.imgTimeText}>
            {currentMsg.created_at}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderFile = (currentMsg) => {
    return (
      <AppView
        // onPress={() => {
        //   RNFetchBlob.config({
        //     addAndroidDownloads: {
        //       useDownloadManager: true, // <-- this is the only thing required
        //       // Optional, override notification setting (default to true)
        //       notification: false,
        //       // Optional, but recommended since android DownloadManager will fail when
        //       // the url does not contains a file extension, by default the mime type will be text/plain
        //       mime: "text/plain",
        //       description: "File downloaded by download manager.",
        //     },
        //   })
        //     .fetch("GET", currentMsg.file)
        //     .then((resp) => {
        //       console.log("resp", resp);

        //       // the path of downloaded file
        //       resp.path();
        //     });
        // }}
        marginHorizontal={2}
        style={[
          styles.bubleContainer,
          {
            paddingTop: moderateScale(2),
            borderWidth: moderateScale(0.5),
            borderColor:
              currentMsg.user._id === this.props.owner_id ? "#E4E5E5" : "#fff", // props.current user id
            borderRadius: 5,
            backgroundColor:
              currentMsg.user._id === this.props.owner_id ? "#E4E5E5" : "#fff",
          },
        ]}
      >
        <Pdf
          source={{ uri: currentMsg.file }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link presse: ${uri}`);
          }}
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            height: responsiveHeight(20),
          }}
        />

        <AppView height={3} centerY style={styles.timeContainer}>
          <AppText paddingHorizontal={5} size={4} style={styles.imgTimeText}>
            {currentMsg.created_at}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderLocation = (currentMsg) => {
    console.log("location --->>", currentMsg);
    const currentLocation = {
      latitude: parseFloat(currentMsg.location.latitude),
      longitude: parseFloat(currentMsg.location.longitude),
    };

    return (
      <AppView
        marginHorizontal={2}
        style={[styles.bubleContainer, { alignSelf: "flex-start" }]}
      >
        <View
          style={{
            elevation: 5,

            backgroundColor: colors.primary,
            borderTopStartRadius: 25,
            borderBottomStartRadius: 25,

            borderTopRightRadius: 22,
            paddingHorizontal: 10,
            justifyContent: "center",
            paddingVertical: 5,
            height: 300,
            width: 150,
          }}
        >
          <MapLocation currentLocation={currentLocation} />
        </View>
        <AppText size={4.2} style={styles.timeText}>
          {currentMsg.created_at}
        </AppText>
      </AppView>
    );
  };
  renderBubble = (props) => {
    // this is to if is typing required
    // if (props.currentMessage._id === "typingId") {
    //   return this.renderTyping();
    // }

    const userId = this.props.userData.user.id;
    // console.log("image", props.currentMessage);

    if (props.currentMessage.location !== null) {
      return this.renderLocation(props.currentMessage);
    }
    if (props.currentMessage.file !== null) {
      return this.renderFile(props.currentMessage);
    }
    if (props.currentMessage.image !== null) {
      return this.renderImage(props.currentMessage);
    }
    if (props.currentMessage.user._id !== userId) {
      return (
        <AppView marginHorizontal={2} style={styles.bubleContainer}>
          <View
            style={{
              alignSelf: "flex-start",

              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "white",
              elevation: 5,
              borderTopEndRadius: 25,
              borderBottomEndRadius: 25,
              borderTopLeftRadius: 22,
              maxWidth: responsiveWidth(65),
            }}
          >
            <AppView centerY>
              <AppText bold size={5.5} style={styles.userMsg}>
                {props.currentMessage.text}
              </AppText>
            </AppView>
          </View>
          <AppText
            size={4.2}
            style={[styles.timeText, { alignSelf: "flex-start" }]}
          >
            {props.currentMessage.created_at}
          </AppText>
        </AppView>
      );
    }
    if (props.currentMessage.user._id === userId) {
      return (
        <AppView
          marginHorizontal={2}
          style={[styles.bubleContainer, { alignSelf: "flex-start" }]}
        >
          <View
            style={{
              elevation: 5,

              backgroundColor: colors.primary,
              borderTopStartRadius: 25,
              borderBottomStartRadius: 25,

              borderTopRightRadius: 22,
              paddingHorizontal: 10,
              justifyContent: "center",
              paddingVertical: 5,
            }}
          >
            <AppView centerY stretch>
              <AppText bold size={5.5} style={styles.senderMsg}>
                {props.currentMessage.text}
              </AppText>
            </AppView>
          </View>
          <AppText size={4.2} style={styles.timeText}>
            {props.currentMessage.created_at}
          </AppText>
        </AppView>
      );
    }

    return null;
  };

  sendNewMessage = async (body) => {
    if (this.state.imgUri !== "") {
      this.addMessageToExistThread(body);
    } else {
      this.addMessageToExistThread(body);
      // this.chatSocket.emit("private-chat_user_");
    }
    this.setState({ textMsg: "", imgUri: "" });
  };

  selectImage = (uri) => {
    this.setState({
      imgUri: uri,
    });
  };

  addImage = () => {
    if (this.state.imgLoading) {
      return (
        <AppView width={10} height={5} center>
          <AppSpinner size={8} />
        </AppView>
      );
    }
    return (
      <AppView
        onPress={async () => {
          Keyboard.dismiss();

          let granted = false;

          if (Platform.OS === "ios") {
            granted = true;
          } else {
            granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: "App needs to access your Photos",
                message:
                  "App needs access to your Photos " +
                  "so we can let our app be even more awesome.",
              }
            );
          }

          if (granted) {
            AppNavigation.push({
              name: "photoSelection",
              passProps: {
                action: this.selectImage,
              },
            });

            this.setState({ showImage: true });
          }
        }}
        width={10}
        height={5}
        center
        backgroundColor="transparent"
      >
        <AppIcon type="ant" name="addfile" size={7} color="#8F8F8F" />
      </AppView>
    );
  };

  sendButton = () => {
    if (this.state.msgLoading) return <AppSpinner />;
    return (
      <AppIcon
        flip
        name="send"
        type="material"
        color="primary"
        size={10}
        onPress={() => {
          if (this.state.textMsg) {
            this.messageField.clear();
            if (this.state.textMsg.trim() !== "") {
              const formData = new FormData();
              formData.append("message", this.state.textMsg);

              this.sendNewMessage(formData);
            }
          }
        }}
      />
    );
  };

  renderMsgInput = () => (
    <AppView height={6} stretch flex>
      <View
        style={{
          borderColor: "#CFCFCF",
          borderWidth: 1,
          borderStyle: "solid",
          // borderBottomEndRadius: 25,
          flex: 1,
          alignSelf: "stretch",
          borderRadius: 28,
        }}
      >
        <AppInput
          initialValue={this.state.textMsg}
          noValidation
          height={6}
          style={{
            // width: Dimensions.get("window").width * 0.8,
            backgroundColor: "transparent",
            borderStyle: "solid",
          }}
          // borderRadius={20}
          // borderColor="red"
          // borderWidth={1}
          paddingRight={8}
          returnKeyType="send"
          onChange={(text) => {
            this.setState({ textMsg: text });
          }}
          placeholder={I18n.t("chatwritemsg")}
          placeholderTextColor="grey"
          ref={(el) => {
            this.messageField = el;
          }}
          onSubmitEditing={() => {
            this.messageField.focus();
            const formData = new FormData();
            formData.append("message", this.state.textMsg);
            this.sendNewMessage(formData);
          }}
          rightItems={this.sendButton()}
        />
      </View>
    </AppView>
  );

  renderAddAtach = () => {
    return (
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          borderColor: "#CFCFCF",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 15,
        }}
      >
        {this.state.recording ? (
          <AppView
            flex
            center
            onPress={() => this.chatBottomSheet.current.show()}
          >
            <AppIcon name="play" type="material" color="#CFCFCF" />
          </AppView>
        ) : (
          <AppView
            flex
            center
            onPress={() => this.chatBottomSheet.current.show()}
          >
            <AppIcon name="add" type="material" color="#CFCFCF" />
          </AppView>
        )}
      </View>
    );
  };
  renderRadiusView = (text) => {
    return (
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "#F3F3F3",
          // elevation: 5,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 20,
        }}
      >
        <AppButton
          title={text}
          onPress={() => {
            if (text.trim() !== "") {
              const formData = new FormData();
              formData.append("message", text);

              this.sendNewMessage(formData);
            }
          }}
          transparent
          paddingHorizontal={10}
        />
      </View>
    );
  };
  renderInputToolbar = (props) => {
    if (this.props.sohwInput == false) {
      return <AppView height={0} width={0} />;
    }
    return (
      <AppView stretch flex elevation={2.5}>
        <AppScrollView
          horizontal
          paddingVertical={2}
          paddingLeft={5}
          showsHorizontalScrollIndicator={false}
          stretch
        >
          {this.renderRadiusView("مرحبا بك")}
          {this.renderRadiusView("كم سعر التاجير ؟")}
          {this.renderRadiusView("هل من تفاوض")}
        </AppScrollView>
        <AppView
          row
          stretch
          backgroundColor="#fff"
          paddingLeft={5}
          paddingVertical={5}
          spaceBetween
        >
          {/* {this.addImage()} */}
          {this.renderMsgInput()}
          {this.renderAddAtach()}
        </AppView>
      </AppView>
    );
  };

  renderImageContent = () => (
    <AppView style={styles.overlay}>
      <AppView style={styles.overImage}>
        <AppImage
          source={{ uri: this.state.imgUri }}
          stretch
          flex
          borderRadius={5}
        />
      </AppView>
      <AppView width={30} style={styles.iconSpace} row>
        <TouchableOpacity
          onPress={() => {
            this.setState({ showImage: false }, () => {
              const formData = new FormData();
              formData.append("image", {
                uri: this.state.imgUri,
                type: "image/*",
                name: "images",
              });
              // formData.append("message", "image");
              this.sendNewMessage(formData);
            });
          }}
        >
          <AppView style={styles.overLayIconContainer}>
            <AppIcon
              reverse
              type="ion"
              name="md-send"
              style={styles.overLayIcon}
              size={8}
            />
          </AppView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({ showImage: false, imgUri: "" });
          }}
        >
          <AppView style={styles.overLayIconContainer}>
            <AppIcon
              type="ion"
              name="md-close"
              style={styles.overLayIconTrash}
              size={8}
            />
          </AppView>
        </TouchableOpacity>
      </AppView>
    </AppView>
  );

  renderHeaderLeft = () => (
    <AppView
      onPress={() => AppNavigation.push("searchUsers")}
      width={20}
      backgroundColor="red"
      leftIcon={<AppIcon name="search" type="font-awesome" />}
    />
  );

  onPickImage = async () => {
    Keyboard.dismiss();

    let granted = false;

    if (Platform.OS === "ios") {
      granted = true;
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "App needs to access your Photos",
          message:
            "App needs access to your Photos " +
            "so we can let our app be even more awesome.",
        }
      );
    }

    if (granted) {
      AppNavigation.push({
        name: "photoSelection",
        passProps: {
          action: this.selectImage,
        },
      });

      this.setState({ showImage: true });
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <AppHeader title="محادثه" />
        <GiftedChat
          messages={this.state.messages}
          renderAvatarOnTop
          renderAvatar={(v) => (
            <FastImage
              source={{
                uri: `http://ejarly.dev.fudexsb.com/uploads/${
                  v.currentMessage.user.avatar
                }`,
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
              }}
              resizeMode="cover"
            />
          )}
          // showAvatarForEveryMessage
          showUserAvatar
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          minInputToolbarHeight={responsiveHeight(18)}
          locale={this.props.lang}
          user={{
            _id: this.props.rtl
              ? this.props.userData.user.id
              : this.props.userData.user.id,
          }}
        />
        {this.state.showImage && this.state.imgUri
          ? this.renderImageContent()
          : null}

        {this.state.loading ? (
          <View
            style={{
              zIndex: 3000,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppSpinner />
          </View>
        ) : null}

        <ChatBottomSheet
          ref={this.chatBottomSheet}
          onConfirm={(key) => {
            switch (key) {
              case 1:
                this.onPickImage();

                break;
              case 2:
                this.handleChoosePhoto();
                break;
              // case 3:
              //   this.renderPickFile();

              //   break;
              case 4:
                this.renderPickFile();

                break;
              case 5:
                this.handlePickLocation();
                break;
              default:
                break;
            }
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
  isConnected: state.network.isConnected.currentMessage,
  currentUser: state.auth.currentUser,
  userData: state.auth.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  // setThreadId: bindActionCreators(setThreadId, dispatch)ذ
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);
