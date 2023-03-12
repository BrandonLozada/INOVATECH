<template>
  <!-- meta | Para los que no contienen hijas y que dirigen a páginas -->
  <q-item
    clickable
    v-ripple
    v-if="!children && !link"
    :to="meta.slug"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <!-- children | Para los que contienen y que se despliegan las páginas hijas -->
  <q-expansion-item
    switch-toggle-side
    v-if="children"
    :label="title"
    default-opened
  >
    <q-item
      v-for="item in children"
      :key="item.id"
      :to="item.meta.slug"
      class="q-pl-xl"
      clickable
      v-ripple
    >
      <q-item-section
        v-if="item.icon"
        avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-expansion-item>

  <!-- link | Los que mandan a referencia externa -->
  <q-item v-if="link"
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  meta?: MetaProps;
  children?: EssentialLinkProps[];
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  icon: '',
});

export interface MetaProps {
  slug: string;
}
</script>
