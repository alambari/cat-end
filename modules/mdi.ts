import { defineNuxtModule, createResolver, addComponent } from 'nuxt/kit'

interface Options {
  cache: false | 'localStorage',
  defaultSize: string | number,
  componentName: string,
}

const defaults: Options = {
  cache: 'localStorage',
  defaultSize: '1em',
  componentName: 'MdiIcon',
}

export default defineNuxtModule<Partial<Options>>({
  meta: {
    name: 'mdi-icon',
    configKey: 'mdi'
  },
  defaults,
  setup(_options, nuxt) {
    const options = _options as Options;

    const resolver = createResolver(import.meta.url)

    addComponent({
      name: options.componentName,
      filePath: resolver.resolve('../utils/mdi')
    })
  }
})