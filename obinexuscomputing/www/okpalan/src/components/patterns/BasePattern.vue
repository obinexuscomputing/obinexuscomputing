```vue
<template>
  <component
    :is="patternComponent"
    :class="['pattern-layout', `pattern-layout--${pattern}`]"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { FPattern, TPattern, ZPattern } from './index'

const props = defineProps<{
  pattern: 'f' | 't' | 'z'
  content: {
    header?: string
    main: string
    secondary?: string
    sidebar?: string
    sidebarSecondary?: string
  }
}>()

const patterns = {
  f: new FPattern(),
  t: TPattern,
  z: ZPattern
}

const patternComponent = computed(() => ({
  render() {
    const pattern = patterns[props.pattern]
    return h('div', {
      innerHTML: pattern.render(props.content),
      class: 'pattern-container'
    })
  }
}))
</script>

<style lang="scss">
.pattern-layout {
  --drop-cap-color: #42b983;
  --skeleton-bg: #f0f0f0;
  
  &.pattern-layout--f {
    .f-pattern__header {
      margin-bottom: 2rem;
    }

    .f-pattern__section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
  }

  &.pattern-layout--t {
    .t-pattern__header {
      margin-bottom: 2rem;
      text-align: center;
    }

    .t-pattern__content {
      display: grid;
      gap: 2rem;
    }
  }

  &.pattern-layout--z {
    .z-pattern__content {
      margin-bottom: 2rem;
    }
  }

  .with-drop-cap {
    &:first-letter {
      color: var(--drop-cap-color);
      float: left;
      font-size: 3em;
      line-height: 0.8;
      padding-right: 0.1em;
    }
  }

  .skeleton-text {
    height: 1em;
    background: var(--skeleton-bg);
    margin-bottom: 0.5em;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
  }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

@media (max-width: 768px) {
  .pattern-layout--f {
    .f-pattern__section {
      grid-template-columns: 1fr !important;
    }
  }
}
</style>
```