<template>
  <div class="searchUserComponent">
    <form @submit="preventDefault($event)" class="searchUserForm">
      <div class="searchUserInputContainer">
        <svg class="searchIcon" width="18" height="18" viewBox="0 0 18 18" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path fill="black"
                d="M12.5 11H11.71L11.43 10.73C12.63 9.33 13.25 7.42 12.91 5.39C12.44 2.61 10.12 0.39 7.32002 0.05C3.09002 -0.47 -0.469985 3.09 0.0500152 7.32C0.390015 10.12 2.61002 12.44 5.39002 12.91C7.42002 13.25 9.33002 12.63 10.73 11.43L11 11.71V12.5L15.25 16.75C15.66 17.16 16.33 17.16 16.74 16.75C17.15 16.34 17.15 15.67 16.74 15.26L12.5 11ZM6.50002 11C4.01002 11 2.00002 8.99 2.00002 6.5C2.00002 4.01 4.01002 2 6.50002 2C8.99002 2 11 4.01 11 6.5C11 8.99 8.99002 11 6.50002 11Z"/>
        </svg>
        <input class="searchUserInput"
               placeholder="Search"
               type="text"
               @keyup="handleKeyUp"
               v-model="userName">
      </div>
    </form>
    <div v-if="users.length && showUserList && userName !== ''" class="usersListContainer">
      <div v-if="isUsersPending" class="spinner">
        <b-spinner style="width: 3rem; height: 3rem;"></b-spinner>
      </div>
      <ul v-else class="usersList">
        <li v-for="(user) in users" :key="user.id" @click="supplement(user.name)" class="userItem">
          <div class="userImageContainer">
            <img class="userImage" :src="[...albums].find((album) => album.id === user.id).thumbnailUrl">
          </div>
          <div class="userMainWrapper">
            <div class="userNameContainer">{{ user.name }}</div>
            <div class="userUsernameContainer">
              @{{ user.username }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {Albums, Users} from "@/interfaces";

export default Vue.extend({
  name: 'SearchUsers',
  data() {
    return {
      userName: '' as string,
      showUserList: false as boolean,
    }
  },
  watch: {
    userName() {
      this.fetchUsers()
    }
  },
  computed: {
    users(): Users {
      return this.$store.getters['users/getUsers']
    },
    albums(): Albums {
      return this.$store.getters['users/getAlbums']
    },
    isUsersPending(): boolean {
      return this.$store.getters['users/getUsersIsPending']
    }
  },
  methods: {
    preventDefault(event: { preventDefault: () => void; }) {
      event.preventDefault()
    },

    handleKeyUp() {
      this.showUserList = true
    },

    fetchUsers() {
      return this.$store.dispatch('users/getUsers', this.userName);
    },

    cleanUsers() {
      return this.$store.dispatch('users/cleanUsers')
    },

    supplement(name: string) {
      this.userName = name;
      this.showUserList = false;
    }
  }
});


</script>


<style scoped lang="scss">
.searchUserComponent {
  width: 343px;
  height: 278px;
}

.searchUserForm {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 20%;
  background-color: yellow;
}

.searchUserInputContainer {
  position: relative;
  width: 100%;
  height: 100%;
}

.searchIcon {
  position: absolute;
  top: 20px;
  left: 20px;
}


.searchUserInput {
  padding-left: 56px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: #F9F9F9;
  border-top: 0;
  border-right: 0;
  border-bottom: 1px solid black;
  border-left: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #CCC5C4;
  }
}


.usersListContainer {
  position: relative;
  overflow: scroll;
  height: 80%;
  background-color: #fff;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  &::-webkit-scrollbar {
    display: none;
  }
}

.spinner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.usersList {
  padding: 0;
}

.userItem {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px 15px 8px 15px;


  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #F2F2F2;
  }
}

.selected {
  background: #F2F2F2;
}

.userImageContainer {
  width: 40px;
  height: 40px;
  margin-right: 8px;
}

.userImage {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.userMainWrapper {
  display: flex;
  flex-direction: column;

}

.userNameContainer {
  font-size: 14px;
}

.userUsernameContainer {
  font-size: 12px;
  color: #98999A;
  text-align: start;
}

</style>
