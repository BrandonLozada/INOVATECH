<template>
  <q-drawer
    :model-value="modelValue"
    v-bind="$attrs"
    side="left"
    overlay
    behavior="mobile"
    show-if-above
  >
    <q-btn
      flat
      dense
      round
      class="q-ma-md fixed-top-right z-max text-grey-9"
      icon="close"
      aria-label="Menú"
      @click="$emit('update:modelValue', !modelValue)"
    />

    <q-list class="text-weight-regular q-mb-xl">
      <q-item-label class="bg-grey-3 q-py-lg"
        header
      >
        Hola Brandon
      </q-item-label>

      <EssentialLink
        v-for="item in authNavigationMenu"
        :key="item.title"
        v-bind="item"
      />

      <q-separator></q-separator>

      <q-item-label
        header
        class="text-grey-9"
      >
        Mis accesos
      </q-item-label>

      <EssentialLink
        v-for="item in myNavigationMenu"
        :key="item.title"
        v-bind="item"
      />

      <q-separator></q-separator>

      <EssentialLink
        v-for="item in especialNavigationMenu"
        :key="item.title"
        v-bind="item"
      />

      <q-separator></q-separator>

    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

export interface NavigationMenuProps {
  modelValue: boolean;
}
withDefaults(defineProps<NavigationMenuProps>(), {
  modelValue: false,
});

const authNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Categorias',
    icon: 'category',
    meta: {
      slug: '/categories',
    }
  },
  {
    title: 'Ofertas',
    icon: 'mdi-sale',
    meta: {
      slug: '/discounts',
    }
  },
  {
    title: 'Recomendaciones',
    icon: 'recommend',
    meta: {
      slug: '/recommendations',
    }
  },
  {
    title: 'Notificaciones',
    icon: 'notifications',
    meta: {
      slug: '/my-notifications',
    }
  },
  {
    title: 'Valoraciones',
    icon: 'stars',
    meta: {
      slug: '/my-valuations',
    }
  }
];

const noAuthNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Categorias',
    icon: 'category',
    meta: {
      slug: '/categories',
    }
  },
  {
    title: 'Ofertas',
    icon: 'mdi-sale',
    meta: {
      slug: '/discounts',
    }
  },
  {
    title: 'Recomendaciones',
    icon: 'recommend',
    meta: {
      slug: '/recommendations',
    }
  }
];

const myNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Favoritos',
    icon: 'favorite',
    meta: {
      slug: '/my-favorites',
    }
  },
  {
    title: 'Guardados',
    icon: 'book',
    meta: {
      slug: '/my-bookmarks',
    }
  },
  {
    title: 'Compras',
    icon: 'shopping_bag',
    meta: {
      slug: '/my-purchases',
    }
  },
  {
    title: 'Lista de deseos',
    icon: 'collections_bookmark',
    meta: {
      slug: '/my-wishlists',
    }
  }
];

const especialNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Atención al cliente',
    icon: 'contact_support',
    meta: {
      slug: '/contact-support',
    }
  },  {
    title: 'Configuración',
    icon: 'settings',
    meta: {
      slug: '/settings',
    }
  },
  {
    title: 'Ayuda',
    icon: 'help',
    meta: {
      slug: '/help',
    }
  }
];

const myProfileNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    icon: 'home',
    meta: {
      slug: '/',
    }
  },
  {
    title: 'Mi perfil',
    icon: 'person',
    meta: {
      slug: '/my-profile',
    },
    children: [
      {
        title: 'Datos personales',
        icon: 'business',
        meta: {
          slug: '/personal-information',
        }
      },
      {
        title: 'Direcciones',
        icon: 'home',
        meta: {
          slug: '/my-addreses',
        }
      },
      {
        title: 'Mis formas de pago',
        icon: 'payments',
        meta: {
          slug: '/my-payments',
        }
      }
    ]
  }
];
</script>
