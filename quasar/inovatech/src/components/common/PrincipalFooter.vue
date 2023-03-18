<template>
  <q-footer class="bg-transparent">

    <div class="footer-contenedor justify-center bg-accent text-grey-9 q-pa-md q-py-xl">
      <div class="max-width-content q-mx-auto">
        <div class="row">

          <div class="col-12 col-sm-4 col-sm-12 col-md-3 col-lg-3 q-pa-sm q-pb-xl">
            <a
              :href="'/'"
              title="Inovatech App."
            >
              <q-img
                style="max-width: 170px; max-height: 80px;"
                height="170"
                width="200"
                fit="contain"
                src="/img/logos/inovatech_logo.png"
                alt="Inovatech App."
              />
            </a>
          </div>

          <div class="col-12 col-sm-4 col-md-2 col-lg-2 q-pa-sm">
            <div class="full-height q-pb-lg text-grey-1">

              <div class="text-subtitle2">COMPAÑIA</div>
              <ul class="q-pl-none" style="list-style-type: none;">
                <template
                  v-for="(item, index) in company"
                  :key="index">
                  <li class="q-px-none">
                    <a class="my-link text-white" :href="item.meta.slug" target="_blank">{{item.title}}</a>
                  </li>
                </template>
              </ul>

            </div>
          </div>

          <div class="col-12 col-sm-4 col-md-2 col-lg-2 q-pa-sm">
            <div class="full-height q-pb-lg text-grey-1">

              <div class="text-subtitle2">ENLACES ÚTILES</div>
              <ul class="q-pl-none" style="list-style-type: none;">
                <template
                  v-for="(item, index) in usefulLinks"
                  :key="index">
                  <li class="q-px-none">
                    <a class="my-link text-white" :href="item.meta.slug" target="_blank">{{item.title}}</a>
                  </li>
                </template>
              </ul>

            </div>
          </div>

          <div class="col-12 col-sm-4 col-md-2 col-lg-2 q-pa-sm">
            <div class="full-height q-pb-lg text-grey-1">

              <div class="text-subtitle2">BLOG</div>
              <ul class="q-pl-none" style="list-style-type: none;">
                <template
                  v-for="(item, index) in blog"
                  :key="index">
                  <li class="q-px-none">
                    <a class="my-link text-white" :href="item.meta.slug" target="_blank">{{item.title}}</a>
                  </li>
                </template>
              </ul>

            </div>
          </div>

            <div class="col-12 col-sm-12 col-md-3 col-lg-3 q-pa-sm">
              <div class="full-height" v-bind:class="$q.screen.lt.sm ? '' : $q.screen.lt.md ? 'text-center' : 'text-right'">

              </div>
            </div>

          <div class="col-12 col-md-12 q-pa-sm text-grey-1">
            <div class="text-subtitle2 text-weight-light text-right">
              México
            </div>
          </div>

          <div class="col-12 col-md-12 q-pa-sm text-grey-1">
            <div class="text-subtitle2 text-weight-light" v-bind:class="$q.screen.lt.sm ? '' : 'text-right'">
              © 2023 - Inovatech App.
            </div>
          </div>

        </div>
      </div>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import {EssentialLinkProps} from 'components/EssentialLink.vue';

const blog: EssentialLinkProps[] = [
  {
    title: 'Noticias',
    meta: {
      slug: '/blozada-blog',
    }
  }
];

const company: EssentialLinkProps[] = [
  {
    title: 'Acerca de',
    meta: {
      slug: '/about-us',
    }
  },
  {
    title: 'Contacto',
    meta: {
      slug: '/contact',
    }
  },
  {
    title: 'Emprendedurismo',
    meta: {
      slug: '/entrepreneurship',
    }
  }
];

const usefulLinks: EssentialLinkProps[] = [
  {
    title: 'Ayuda',
    meta: {
      slug: '/help',
    }
  },
  {
    title: 'Atención al cliente',
    meta: {
      slug: '/contact-support',
    }
  },
  {
    title: 'Configuración',
    meta: {
      slug: '/settings',
    }
  }
];
</script>

<style lang="scss">
  //.q-footer {
  //  z-index: 700;
  //}

</style>
