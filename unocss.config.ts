/*
 * @Author: Nic
 * @Date: 2022-06-18 11:40:17
 * @LastEditTime: 2023-02-07 21:29:34
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/unocss.config.ts
 */
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn-hover', 'px-5 py-2 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 dark:border-blue-800 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 ring-blue-600 ring-opacity-40'],
    ['btn-main-hover', 'px-5 py-2 text-sm text-white font-semibold rounded-full border border-blue-200 dark:border-blue-800 bg-blue-600 focus:outline-none focus:ring-2 ring-blue-600 ring-opacity-40'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['btn', 'px-5 py-2 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 dark:border-blue-800 focus:outline-none focus:ring-2 ring-blue-600 ring-opacity-40'],
    ['btn-main', 'px-5 py-2 text-sm text-white font-semibold rounded-full border border-blue-200 dark:border-blue-800 bg-blue-600 focus:outline-none focus:ring-2 ring-blue-600 ring-opacity-40'],
    ['text-main', 'text-lg text-left text-black dark:text-white font-semibold mb-2'],
    ['tag', 'px-5 py-2 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 dark:border-blue-800 bg-white dark:bg-opacity-2'],
    ['tag-main', 'px-5 py-2 text-sm text-white font-semibold rounded-full border border-blue-200 dark:border-blue-800 bg-blue-600'],
    ['text-score', 'text-black dark:text-white font-semibold'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
