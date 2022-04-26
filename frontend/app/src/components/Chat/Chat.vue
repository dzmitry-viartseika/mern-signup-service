<template>
  <div class="app-chat">
    <div
      class="app-chat-status"
    >
      <div
        v-if="messageCount"
        class="app-chat-status__number"
      >
        <span>{{ messageCount }}</span>
      </div>
      <div
        @click.prevent="toggleStatus()"
      >
        <transition
          name="fade-content"
          mode="out-in"
        >
          <div
            v-if="statusChat"
            :key="'first'"
          >
            <svgicon
              name="ChatClose"
              width="16"
              height="16"
            />
          </div>
          <div
            v-else
            :key="'second'"
          >
            <svgicon
              name="Chat"
              width="16"
              height="16"
            />
          </div>
        </transition>
      </div>
      <transition name="fade-content">
        <div
          v-if="statusChat"
          class="app-chat-window"
        >
          <!--          @mouseenter="checkUnreadMessage"-->
          <div class="app-chat-window__header">
            <div
              class="app-chat-window__order"
            >
              Онлайн чат
            </div>
          </div>
          <VuePerfectScrollbar
            ref="chatScroll"
            class="app-chat-window__body"
          >
            <!--            @ps-scroll-y="checkUnreadMessage"-->
            <div
              class="message__list"
            >
              <!--              :class="{'message__list_empty': !messagesList.length}"-->
              <div
                v-if="!messagesList.length"
                class="message__list-placeholder"
              >
                Сообщений пока нет
              </div>
              <template v-if="messagesList.length">
                <div
                  v-for="(item, i) in messagesList"
                  :key="i"
                >
                  <div
                    v-if="showChatDateRow(item.date, i)"
                    class="message__row message__row_center"
                  >
                    <div
                      class="message-item message-item_date"
                    >
                      <span>
                        <template
                          v-if="showTodayText(item.date)"
                        >
                          {{ 'Today' }},
                        </template>
                        {{ messageDate(item.date) }}
                      </span>
                    </div>
                  </div>
                  <div
                    :ref="'messageRow'"
                    class="message__row"
                    :class="{
                      'message__row_end': $store.getters.user._id === item.senderId}"
                  >
                    <div
                      :id="item.id"
                      class="message-item"
                      :class="{'message-item_me': $store.getters.user._id === item.senderId}"
                    >
                      <!--                      :ref="!item.isRead.includes(userInfo._id) && userInfo._id !== item.senderId ? 'unread' : 'read'"-->
                      <transition name="fade-content">
                        <ChatMessage
                          :item="item"
                        />
                      </transition>
                      <transition name="fade-content">
                        <div
                          v-if="isTyping && i === messagesList.length - 1"
                          class="message-item__text"
                        >
                          {{ isTyping }} is typing
                        </div>
                      </transition>
                      <div class="message-item__time">
                        <span>{{ item.date }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </VuePerfectScrollbar>
          <div
            ref="downPage"
            class="app-chat-window__footer"
          >
            <form
              class="app-chat-window__form"
              @submit.prevent="message ? sendMessage($event) : false"
            >
              <text-input
                :value.sync="message"
                input-type="text"
                :autofocus="true"
                :placeholder-text="'Введите ваше сообщение'"
              />
              <button
                type="submit"
                class="app__btn app__btn--primary"
                :class="{'app__btn--disabled': !message}"
                @click.prevent="message ? sendMessage($event) : false"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ChatMessage from '@/components/Chat/ChatMessage.vue';
import TextareaTemplate from '@/components/Elements/TextareaTemplate.vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import TextInput from '@/components/Elements/TextInput.vue';
import moment from 'moment';
import '@/assets/icons/Chat';
import '@/assets/icons/ChatClose';
import io from 'socket.io-client';
const chatNewMessageSound = require('@/assets/audio/Chat/chat-message-sound.mp3');

const socket = io.connect('http://localhost:5000');

@Component({
  components: {
    ChatMessage,
    TextareaTemplate,
    VuePerfectScrollbar,
    TextInput,
  },
})
export default class Chat extends Vue {
  @Prop({ type: Boolean })
  openChat: boolean;

  message: string = '';

  socketInstance: any;

  messagesList: any[] = [];

  isTyping: boolean | string = '';

  created() {
    socket.on('message', (data) => {
      this.messagesList.push(data.message);
      const { showNotify } = this.$store.getters.user;
      if (showNotify) {
        this.$toasted.show(`${data.notification}`, {
          theme: 'bubble',
          position: 'top-right',
          duration: 3000,
        });
      }
    });

    socket.on('stopTyping', () => {
      this.isTyping = false;
    });

    socket.on('typing', (data) => {
      this.isTyping = data;
    });

    socket.on('leave', (data) => {
      this.messagesList = data;
    });
  }

  get statusChat(): boolean {
    return this.openChat;
  }

  set statusChat(data: string): void {
    this.$emit('update:openChat', data);
  }

  get language(): string {
    return this.$i18n.locale;
  }

  get getNewMessageSound(): string {
    return chatNewMessageSound;
  }

  playSoundIn() {
    const sound = new Audio(this.getNewMessageSound);
    sound.addEventListener('canplaythrough', () => {
      sound.play();
    });
  }

  showTodayText(date) {
    const currentDate = moment(new Date()).format('DD MMM YY');
    return moment(currentDate).isSame(moment(date).format('DD MMM YY'));
  }

  messageDate(date): any {
    const format = this.language === 'ru' ? 'DD MMMM' : 'MMM, DD';
    return moment(date).locale(this.language).format(format);
  }

  showChatDateRow(date, i) {
    if (i === 0) {
      return true;
    }
    const prevMessage = this.messagesList[i - 1];
    const prevMessageDate = moment(prevMessage.date).format('DD MMM YY');
    return !moment(moment(date).format('DD MMM YY')).isSame(prevMessageDate);
  }

  toggleStatus(): void {
    this.statusChat = !this.statusChat;
  }

  beforeDestroy() {
    socket.emit('leave', this.$store.getters.user.firstName);
  }

  @Watch('message')
  newMessage(value) {
    value ? socket.emit('typing', this.$store.getters.user.firstName) : socket.emit('stopTyping');
  }

  get messageCount(): number {
    // const unreadMessages = this.messagesList.filter(
    //   (message) => message.senderId !== this.userInfo._id && !message.isRead.includes(this.userInfo._id),
    // );
    // return unreadMessages.length > 99 ? 99 : unreadMessages.length;
    return this.messagesList.length;
  }

  sendMessage() {
    const { isChatSounds } = this.$store.getters.user;
    const message = {
      message: this.message,
      user: this.$store.getters.user.firstName,
      id: new Date().getTime(),
      senderId: this.$store.getters.user.id,
      date: '2022-04-25',
    };
    socket.emit('message', {
      message: {
        message: message.message,
        user: message.user,
        id: message.id,
        date: message.date,
        senderId: message.senderId,
      },
      notification: 'A new message was added',
    });
    if (isChatSounds) {
      this.playSoundIn();
    }
    this.message = '';
    this.isTyping = false;
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.message {

  &-item {

    &__text {
      margin-bottom: 10px;
      color: $color-denim;
      font-size: 12px;
    }
  }

  &__list {
    display: inline-flex;
    flex-direction: column;
    width: 100%;

    &_empty {
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      min-height: 490px;
    }

    &-placeholder {
      padding-top: 30px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-silver-chalice;
      user-select: none;
    }
  }

  &__row {
    width: 100%;

    &_end {
      display: flex;
      justify-content: flex-end;
    }

    &_center {
      display: flex;
      justify-content: center;
    }
  }

  &-item {
    display: inline-flex;
    flex-direction: column;
    margin: 8px 0;

    &-progress {
      height: 4px;
      background: rgba($color-dodger-blue, .08);
      border-radius: $borderRadius;
      transition: all .2s ease-in;
      width: 100%;
      position: relative;
      overflow: hidden;

      &__line {
        background: $color-dodger-blue;
        border-radius: $borderRadius;
        transition: all .2s ease-in;
        position: absolute;
        left: 0;
        top: 0;
        width: 20px;
        height: 100%;
        animation: file-upload 3s linear infinite;
      }
    }

    &__docname {
      transition: all .15s ease-in;
    }

    &__value {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 12px;
      background: $color-alabaster;
      color: $color-black;
      font-size: $font-size-xlg;
      margin-bottom: 3px;
      max-width: 314px;
      line-height: 1.25;
      text-decoration: none;
      transition: background-color .15s ease-in;

      &-wrapper {
        display: flex;
        max-width: 100%;
        align-items: center;
        overflow: hidden;
      }

      &_file {

        &:hover {
          background: $color-gallery;
        }

      }

      i {
        color: $color-dodger-blue;
        position: relative;
        font-size: $font-size-icon-sm;

        &:before {
          margin: 0;
        }
      }
    }

    &__label {
      display: inline-block;
      padding: 2px 4px;
      margin-bottom: 7px;
      background: $color-gallery;
      border-radius: $borderRadius;
      color: $color-silver-chalice;

      &:first-letter {
        text-transform: capitalize;
      }
    }

    &__icon {
      width: 17px;
      min-width: 17px;
      margin-right: 3px;
    }

    &__time {
      font-size: $font-size-md;
      color: $color-silver-chalice;
    }

    &_me {
      align-items: flex-end;

      .message-item__value {
        background: rgba($color-dodger-blue, .08);

        &_file {

          &:hover {
            background: rgba($color-dodger-blue, .12);
          }

        }

      }
    }

    &_date {
      margin-bottom: 4px;
      margin-top: 15px;

      span {
        color: gray;
      }
    }
  }
}

.app-chat {
  position: absolute;
  right: 25px;
  bottom: 25px;
  background: $color-white;
  padding: 20px;

  &-window {
    position: fixed;
    bottom: 95px;
    right: 25px;
    min-width: 395px;
    max-width: 395px;
    min-height: 570px;
    border-radius: $borderRadius;
    background: $color-white;
    box-shadow: 0 0 25px 1px rgba($color-black, .06);
    z-index: 10;

    &_admin {
      min-height: 530px;
    }

    &__header {
      display: flex;
      align-items: center;
      min-height: 57px;
      background: $color-dodger-blue;
      padding: 0 15px;
      justify-content: center;
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
      user-select: none;
    }

    &__footer {
      display: flex;
      align-items: center;
      padding: 0 10px 10px;
      border-top: 1px solid $color-alabaster;
    }

    &__media {
      cursor: pointer;
      position: relative;

      .upload-file {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }

      i {
        color: $color-silver-chalice;
        font-size: 14px;
        transition: color .15s ease-in;
      }

      &:hover {
        i {
          color: $color-dodger-blue;
        }
      }
    }

    &__form {
      display: flex;
      width: 100%;

      .text-field {
        margin-bottom: 0;
        margin-right: 15px;
      }

      button {
        margin-left: auto;
      }
    }

    &__send {
      cursor: pointer;

      i {
        color: $color-dodger-blue;
        font-size: $font-size-dd;
        transition: color .15s ease-in;
      }

      &:hover {
        i {
          color: $color-denim;
        }
      }
    }

    &__order {
      color: $color-white;
      text-align: center;
      font-size: 14px;

      &_capitalize {
        text-transform: capitalize;
      }
    }

    &__body {
      padding: 0 12px 8px 12px;
      max-height: 490px;
      min-height: 490px;
    }
  }

  &-status {
    position: fixed;
    bottom: 25px;
    right: 25px;
    max-width: 40px;
    min-width: 40px;
    height: 40px;
    z-index: 1000;
    border-radius: 50%;
    background: $color-dodger-blue;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color .15s ease-in;
    box-shadow: 0 0 8px rgba($color-black, .04);


    &_disabled {
      background: $color-silver-chalice;
      pointer-events: none;
    }

    svg {
      fill: $color-white;
    }

    &__off {
      font-size: $font-size-dd;
    }

    &__on {
      font-size: $font-size-icon-large;
    }

    &:hover {
      background: $color-denim;
    }

    &__number {
      min-width: 22px;
      max-width: 22px;
      height: 22px;
      border: 2px solid $color-white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: red;
      position: absolute;
      right: -7px;
      top: 1px;

      span {
        font: $font-size-md $font-global-bold;
        color: $color-white;
      }
    }
  }
}

</style>
