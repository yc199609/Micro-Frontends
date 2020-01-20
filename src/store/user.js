import request from '@/utils/request';

const user = {
  status: {
    name: '',
    permissions: [],
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
  },
  actions: {
    GetInfo({ commit }, form) {
      return new Promise((resolve, reject) => {
        try {
          request.get('/api/login', form)
            .then((res) => {
              commit('SET_NAME', res.data.userName);
              localStorage.setItem('userName', res.data.userName);
              const myRouter = res.data.permissions;
              commit('SET_PERMISSIONS', myRouter);
              localStorage.setItem('permissions', JSON.stringify(myRouter));
              resolve(myRouter);
            });
        } catch (err) {
          reject(err);
        }
      });
    },
  },
};

export default user;
