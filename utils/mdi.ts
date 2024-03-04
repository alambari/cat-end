import * as Icons from '@mdi/js'

export type MdiSvgString = string

export type MdiIconString = keyof typeof Icons

export type MdiIconCache = Map<MdiIconString, MdiSvgString>

export const cache: MdiIconCache = new Map<MdiIconString, MdiSvgString>()

async function importIcon(value: MdiIconString): Promise<MdiSvgString> {
  if (!value) {
    return ''
  }

  if (cache.has(value)) {
    return cache.get(value) as MdiIconString
  }

  const { [value]: icon } = await import('@mdi/js')
  cache.set(value, icon)

  return icon
}

export default defineComponent({
  name: 'MdiIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    viewBox: {
      type: String
    },
    flip: {
      type: String,
			validator: (value: string) => {
        return ['horizontal', 'vertical', 'both', 'none'].includes(value)
      }
    },
    rotate: {
      type: Number,
      default: 0
    }
  },
  async setup(props) {
    const path = ref<string>('')

    const styles = computed(() => {
      return {
        '--sx': ['both', 'horizontal'].includes(props.flip as string) ? '-1' : '1',
        '--sy': ['both', 'vertical'].includes(props.flip as string) ? '-1' : '1',
        '--r': isNaN(props.rotate) ? props.rotate : props.rotate + 'deg',  
      }
    });

    const sizeValue = computed(() => {
      return props.size || 24
    })

    const viewboxValue = computed(() => {
      return props.viewBox || '0 0 24 24'
    })

    const updateIcon = async () => {
      path.value = await importIcon(props.icon as MdiIconString)
    }

    watch(async() => props.icon, async () => {
      await updateIcon()
    })

    await updateIcon();

    return () => {
      return h('i', {
        class: 'mdi-icon'
      }, [
        h('svg', {
          class: 'mdi-icon__svg',
          width: sizeValue.value,
          height: sizeValue.value,
          viewBox: viewboxValue.value,
          style: {
            ...styles.value,
            transform: 'rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1))',
          }
        }, [
          h('path', {
            d: path.value,
            style: {
              fill: 'currentColor'
            }
          })
        ])
      ])
    }
  },
})