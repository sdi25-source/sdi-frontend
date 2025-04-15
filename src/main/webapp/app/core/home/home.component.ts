import type { Ref } from 'vue';
import { type ComputedRef, defineComponent, inject, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type LoginService from '@/account/login.service';

import AdminHome from './admin/AdminHome.vue';
import CommercialHome from './commercial/CommercialHome.vue';
import DMHome from './dm/DMHome.vue';
import type AccountService from '@/account/account.service.ts';

export default defineComponent({
  compatConfig: { MODE: 3 },
  components: {
    AdminHome,
    CommercialHome,
    DMHome,
  },
  setup() {
    const loginService = inject<LoginService>('loginService');
    const accountService = inject<AccountService>('accountService');
    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const username = inject<ComputedRef<string>>('currentUsername');
    const hasAnyAuthorityValues: Ref<any> = ref({});

    const openLogin = () => {
      loginService.openLogin();
    };

    return {
      authenticated,
      username,
      accountService,
      hasAnyAuthorityValues,
      openLogin,
      t$: useI18n().t,
    };
  },
  methods: {
    hasAnyAuthority(authorities: any): boolean {
      this.accountService.hasAnyAuthorityAndCheckAuth(authorities).then(value => {
        if (this.hasAnyAuthorityValues[authorities] !== value) {
          this.hasAnyAuthorityValues = { ...this.hasAnyAuthorityValues, [authorities]: value };
        }
      });
      return this.hasAnyAuthorityValues[authorities] ?? false;
    },
  },
});
