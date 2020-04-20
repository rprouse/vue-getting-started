<template>
  <div>Hello {{ hero.firstName }}</div>
</template>

<script>
export default {
  name: 'HeroDetail',
  props: {
    hero: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>
