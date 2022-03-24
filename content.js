let cacheUrl = window.location.href

creatListenUrlTimer()
handleUrlChange()

function creatListenUrlTimer() {
	setInterval(() => {
		console.log('等待网址发生变化...')
		if (window.location.href !== cacheUrl) {
			cacheUrl = window.location.href
			handleUrlChange()
		}
	}, 500)
}

function handleUrlChange() {
	if (!window.location.pathname.includes('watch')) {
		return
	}

	selectFirstSubtitles()
}

/**
 * 选中第一项字符
 */
async function selectFirstSubtitles() {
	await clickSettingsButton()
  // 点击设置按钮后，会延迟出现菜单栏
  await wait(300)
	clickMenuSubtitles().then(async () => {
    // 点击字幕设置项后，会延迟出现字幕列表，这里的延迟较长
    await wait(500)
    const settingsMenuEl = document.querySelector('.ytp-settings-menu')
    settingsMenuEl.querySelectorAll('.ytp-menuitem')[1].click()
    console.log('选中字幕成功')
    toast('选中字幕成功')
  }).catch((error) => {
    toast(error)
  }).finally(() => {
  	// 关闭设置弹窗
    document.querySelector('.ytp-settings-button').click()
  })
}


/**
 * 点击设置按钮
 */
function clickSettingsButton() {
	return new Promise((resolve) => {
		const timer = setInterval(() => {
			console.log('等待设置按钮加载...')

			const settingsButton = document.querySelector('.ytp-settings-button')

			if (settingsButton) {
				settingsButton.click()
				clearInterval(timer)
				resolve(true)
			}
		}, 500)
	})
}

/**
 * 点击菜单的字幕设置
 */
function clickMenuSubtitles() {
  return new Promise((resolve, reject) => {
    let isSuccess = false
    const settingsMenuEl = document.querySelector('.ytp-settings-menu')
    settingsMenuEl.querySelectorAll('.ytp-menuitem').forEach((item) => {
      if (item?.querySelector('.ytp-menuitem-label span')?.innerHTML === '字幕') {
        item.click()
        isSuccess = true
        resolve(true)
      }
    })
    if (!isSuccess) {
      reject('没有字幕设置项')
    }
  })
}

function wait(delay) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(delay)
		}, delay)
	})
}

function toast(msg, duration) {
	duration = isNaN(duration) ? 3000 : duration
	const messageEl = document.createElement('div')
	messageEl.innerHTML = msg
	messageEl.style.cssText =
		'font-size: .32rem;color: rgb(255, 255, 255);background-color: rgba(0, 0, 0, 0.6);padding: 10px 15px;margin: 0 0 0 -60px;border-radius: 4px;position: fixed;top: 50%;left: 50%;width: 130px;text-align: center;z-index: 99999999'
	document.body.appendChild(messageEl)
  setTimeout(() => {
    document.body.removeChild(messageEl)
  }, duration)
}
