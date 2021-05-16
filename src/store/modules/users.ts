import { Albums, RootState, User, Users, UsersState} from '@/interfaces';
import {ActionContext} from 'vuex';
import axios from "axios";

export default {
    namespaced: true,
    state: {
        users: [],
        usersIsPending: false,
        albums: [],
        albumsIsPending: false,
    },

    getters: {
        getUsers: (state: { users: Users; }):Users => state.users,
        getAlbums: (state: { albums: Albums; }):Albums => state.albums,
        getUsersIsPending: (state: { usersIsPending: boolean }):boolean => state.usersIsPending,
        getAlbumsIsPending: (state: { albumsIsPending: boolean }):boolean => state.albumsIsPending,
    },

    mutations: {
        setUsers(state: UsersState, payload: Users):void {
            state.users = payload;
        },
        setAlbums(state: UsersState, payload: Albums):void {
            state.albums = payload;
        },
        setUsersIsPending(state: UsersState, isPending: boolean):void {
            state.usersIsPending = isPending;
        },
        setAlbumsIsPending(state: UsersState, isPending: boolean):void {
            state.albumsIsPending = isPending;
        }

    },

    actions: {
        getUsers({commit}: ActionContext<UsersState, RootState>, search: string):Promise<void> {
            commit('setUsersIsPending', true);
            return axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
                const searchUsers = response.data.filter((user: User) => {
                    return user.name.toLowerCase().includes(search.toLowerCase());
                })
                commit('setUsersIsPending', false);
                return commit('setUsers', searchUsers)
            })
        },

        getAlbums({commit}: ActionContext<UsersState, RootState>):Promise<void> {
            commit('setAlbumsIsPending', true);
            return axios.get('https://jsonplaceholder.typicode.com/photos').then((response) => {
                commit('setAlbumsIsPending', false);
                return commit('setAlbums', response.data)
            })
        },

        cleanUsers({commit}: ActionContext<UsersState, RootState>):void {
            return commit('setUsers', []);
        }
    }
}