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
        <div class="row">
          <span>¡Hola, bienvenido!</span>
            <span class="col-12 q-pt-md">Brandon Lozada Cárdenas</span>
            <span class="col-12">Súper administrador</span>
        </div>

      </q-item-label>

      <q-item-label
        header
        class="text-grey-9"
      >
        Mi espacio
      </q-item-label>

      <EssentialLink
        v-for="item in myProfileNavigationMenu"
        :key="item.title"
        v-bind="item"
      />

      <q-separator></q-separator>

      <q-item-label
        header
        class="text-grey-9"
      >
        Módulos
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

const myProfileNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Mi perfil',
    icon: 'person',
    meta: {
      slug: '/my-profile',
    },
    children: [
      {
        title: 'Datos personales',
        icon: 'account_circle',
        meta: {
          slug: '/my-profile',
        }
      },
      {
        title: 'Información laboral',
        icon: 'badge',
        meta: {
          slug: '/my-employee-info',
        }
      },
      {
        title: 'Domicilio',
        icon: 'mdi-home-map-marker',
        meta: {
          slug: '/my-address',
        }
      },
    ]
  },
  {
    title: 'Mis notificaciones',
    icon: 'notifications',
    meta: {
      slug: '/my-notifications',
    }
  },
  {
    title: 'Mis solicitudes',
    icon: 'mdi-format-list-checks',
    meta: {
      slug: '/my-requests',
    }
  }
];

const authNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Gestión de usuarios',
    icon: 'manage_accounts',
    meta: {
      slug: '/user-management',
    }
  },
  {
    title: 'Listado de empleados',
    icon: 'groups',
    meta: {
      slug: '/employee-list',
    }
  },
  {
    title: 'Solicitudes',
    icon: 'mdi-format-list-checks',
    meta: {
      slug: '/requests',
    }
  },
  {
    title: 'Gestión de departamentos | Jefatura',
    icon: 'supervised_user_circle',
    meta: {
      slug: '/department-management',
    }
  },
  {
    title: 'Asistencia por lector de huella',
    icon: 'fingerprint',
    meta: {
      slug: '/fingerprint-attendance',
    }
  },
  {
    title: 'Control de asistencia',
    icon: 'supervisor_account',
    meta: {
      slug: '/attendance-control',
    }
  },
];

const myNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Agregar usuario',
    icon: 'person_add',
    meta: {
      slug: '/forms/user',
    }
  },
  {
    title: 'Solicitud de permiso',
    icon: 'mdi-comment-question-outline',
    meta: {
      slug: '/forms/request-permission',
      // slug: '/permit_application',
    }
  }
];

const especialNavigationMenu: EssentialLinkProps[] = [
  {
    title: 'Atención a sistemas',
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
</script>
