function creatTimer() {
  const timer = setTimeout(() => {
    try {
      selectFirstSubtitles()
      console.log('选中字符成功')
      clearTimeout(timer)
    } catch (error) {
      console.error(error)
      console.log('选中字幕失败, 正在重新尝试...')
      creatTimer()
    }
  }, 500)
}
creatTimer()

/**
 * 选中第一项字符
 */
function selectFirstSubtitles () {
  document.querySelector('.ytp-settings-button').click()
  const settingsMenuEl = document.querySelector('.ytp-settings-menu')
  settingsMenuEl.querySelectorAll('.ytp-menuitem')[2].click()
  setTimeout(() => {
    settingsMenuEl.querySelectorAll('.ytp-menuitem')[1].click()
    document.querySelector('.html5-main-video').click()
  }, 500);
}
