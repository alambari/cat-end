import * as Icons from '@ant-design/icons-vue';
import { defineNuxtModule, addComponent, addImportsSources } from 'nuxt/kit'

import { 
  imports as antdImports, 
  components as antdComponents 
} from '../utils/antd'

const name = 'ant-design-vue';
const prefix = 'A';
const iconName = '@ant-design/icons-vue';

type Preset = string | [string, string]

interface Options {
  icons: false | Preset[]
  components: false | Preset[]
  imports: false | Preset[]
}

const defaults: Options = {
  components: antdComponents,
  icons: Object.keys(Icons).filter(v=>/.*(Outlined|Filled|TwoTone)$/.test(v)),
  imports: antdImports
}

const resolveComponents = (config: Options) => {
  const { components, icons } = config;
  const allComponents = components === false ? [] : components;

  allComponents.forEach(component=>{
    if (typeof component === 'string') {
      addComponent({
        export: component,
        name:  `${prefix}${component}`,
        filePath: `${name}/es`
      })
    }else if (Array.isArray(component)){
      addComponent({
        export: component[0],
        name: `${prefix}${component[1]}`,
        filePath: `${name}/es`
      })
    }
  })

  const allIcons = icons === false ? [] : icons;
  allIcons.forEach(icon => {
    if (typeof icon === 'string') {
      addComponent({
        export: icon,
        name: icon,
        filePath: iconName
      })
    } else if (Array.isArray(icon)) {
      addComponent({
        export: icon[0],
        name: icon[1],
        filePath: iconName
      })
    }
  })  
}

const resolveImports = (config: Options) => {
  const { imports } = config
  const allImports = imports ? imports : []
  addImportsSources({
    from: `${name}/es`,
    imports: [...allImports]
  })
}

export default defineNuxtModule<Partial<Options>>({
  meta: {
    name,
    configKey: 'antd'
  },
  defaults,
  hooks: {
    'ready': () => {
    }
  },
  setup(_options, nuxt) {
    const options = _options as Options;


    nuxt.options.build.transpile.push(name, iconName)
    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)
  }
})