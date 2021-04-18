

require('@babel/polyfill');

const _vue = _interopRequireDefault(require('vue'));

const _moment = _interopRequireDefault(require('moment'));

const _nprogress = _interopRequireDefault(require('nprogress'));

require('nprogress/nprogress.css');

require('@/styles/index.scss');

const _App = _interopRequireDefault(require('./App.vue'));

const _router = _interopRequireDefault(require('./router'));

const _store = _interopRequireDefault(require('./store'));

const _api = _interopRequireDefault(require('./api'));

const consts = _interopRequireWildcard(require('./utils/consts'));

require('./utils/compatible-ie');

const _i18n = _interopRequireDefault(require('./i18n'));

const _mock = _interopRequireDefault(require('./mock'));

require('./plugins/vuetify');

require('./plugins/echarts');

require('./components/svg-icons');

const _util = require('./utils/util');

const _VBasicCard = _interopRequireDefault(require('./components/VBasicCard.vue'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== 'function') return null; const cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== 'object' && typeof obj !== 'function') { return { default: obj }; } const cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } const newObj = {}; const hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (const key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { const desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue.default.component('v-basic-card', _VBasicCard.default);

_nprogress.default.configure({
  template: '<div class="bar" role="bar" style="background:#1DE2C3;"><div class="peg"></div></div>\n  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
  showSpinner: false,
}); // vconsole


try {
  if (Object.values((0, _util.parseURL)(window.location.href).params).includes('vdebug')) {
    Promise.resolve().then(() => _interopRequireWildcard(require('./utils/vconsole'))).then(() => {});
  }
} catch (err) {
  console.error('>>>vconsole', err);
}

_mock.default.bootstrap();

_vue.default.router = _router.default;
_vue.default.store = _store.default;
_vue.default.prototype.$api = _api.default;
_vue.default.prototype.$consts = consts;
_vue.default.prototype.$moment = _moment.default;

_vue.default.filter('formatDate', function (v) {
  const isUTC = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const dateFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'YYYY-MM-DD HH:mm:ss';

  if (v) {
    return isUTC ? _moment.default.utc(v).local().format(dateFormat) : _moment.default.utc(v).format(dateFormat);
  }

  return '';
});

const supportedLangs = ['en'];
const userLocale = navigator.language || navigator.userLanguage;

_vue.default.router.beforeEach((to, from, next) => {
  _nprogress.default.start();

  const token = _store.default.getters.token;

  if (to.path === '/login') {
    _store.default.dispatch('logout');

    next();

    _nprogress.default.done();
  } else if (!token) {
    next('/login?redirect='.concat(to.fullPath));

    _nprogress.default.done();
  } else {
    const me = _store.default.getters.me;

    if (!me || !me.name) {
      _store.default.dispatch('readMe', {
        token,
      }).then(() => {
        next();
      }).catch(() => {
        next('/login');
      });
    } else {
      next();
    }
  }
});

_vue.default.router.beforeEach((to, from, next) => {
  const locale = to.query.locale;

  if (locale) {
    /* eslint-disable no-param-reassign */
    delete to.query.locale;

    if (supportedLangs.includes(locale)) {
      _i18n.default.locale = locale;
      localStorage.setItem('VUE-ADMIN-VUETIFY_LANGUAGE', locale);
    }
  }

  next();
});

_vue.default.router.afterEach(() => {
  _nprogress.default.done();
});

_i18n.default.locale = localStorage.getItem('VUE-ADMIN-VUETIFY_LANGUAGE') || (supportedLangs.includes(userLocale) ? userLocale : 'en');

_vue.default.prototype.$locale.use(_i18n.default.locale);

_vue.default.config.productionTip = false;
new _vue.default({
  router: _router.default,
  store: _store.default,
  i18n: _i18n.default,
  render: function render(h) {
    return h(_App.default);
  },
}).$mount('#app');
